
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormData as OrderFormData } from '../types';
import { SERVICES, WHATSAPP_NUMBER } from '../constants';
import UploadCloudIcon from './icons/UploadCloudIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XIcon from './icons/XIcon';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    service: SERVICES[0].id,
    description: '',
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const uploadReferenceFile = async (file: File): Promise<string | null> => {
    const fetchWithTimeout = async (url: string, init: RequestInit, ms: number) => {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), ms);
      try {
        const res = await fetch(url, { ...init, signal: controller.signal });
        return res;
      } finally {
        clearTimeout(t);
      }
    };

    const tryCloudinary = async () => {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
      if (!cloudName || !uploadPreset) return null;
      const body = new FormData();
      body.append('file', file);
      body.append('upload_preset', uploadPreset);
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const res = await fetchWithTimeout(url, { method: 'POST', body }, 6000);
      if (!res.ok) return null;
      const data = await res.json();
      return data?.secure_url || data?.url || null;
    };

    const tryFileIo = async () => {
      const body = new FormData();
      body.append('file', file);
      const res = await fetchWithTimeout('https://file.io', { method: 'POST', body }, 6000);
      if (!res.ok) return null;
      const data = await res.json();
      if (data && (data.link || data.url)) return data.link || data.url;
      return null;
    };

    const tryTmpFiles = async () => {
      const body = new FormData();
      body.append('file', file);
      const res = await fetchWithTimeout('https://tmpfiles.org/api/v1/upload', { method: 'POST', body }, 6000);
      if (!res.ok) return null;
      const data = await res.json();
      const url = data?.data?.url || data?.data?.src;
      return url || null;
    };

    try {
      const tasks: Array<() => Promise<string | null>> = [tryFileIo, tryTmpFiles, tryCloudinary];
      const settled = await Promise.allSettled(tasks.map((fn) => fn()));
      for (const s of settled) {
        if (s.status === 'fulfilled' && s.value) return s.value;
      }
      return null;
    } catch {
      return null;
    }
  };

  const openWhatsAppFallback = (number: string, text: string) => {
    const encoded = encodeURIComponent(text);
    const candidates = [
      `whatsapp://send?phone=${number}&text=${encoded}`,
      `intent://send/?phone=${number}&text=${encoded}#Intent;scheme=whatsapp;package=com.whatsapp;end`,
      `https://api.whatsapp.com/send?phone=${number}&text=${encoded}&app_absent=0`,
      `https://wa.me/${number}?text=${encoded}`
    ];
    const tryOpen = (i: number) => {
      if (i >= candidates.length) return;
      const url = candidates[i];
      window.location.href = url;
      setTimeout(() => {
        if (document.visibilityState === 'hidden') return;
        tryOpen(i + 1);
      }, 1200);
    };
    tryOpen(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Custom validation for empty fields
    const missing: string[] = [];
    if (!formData.fullName.trim()) missing.push('Nama Lengkap');
    if (!formData.email.trim()) missing.push('Email');
    if (!formData.description.trim()) missing.push('Deskripsi');

    if (missing.length > 0) {
      setErrorMessage(`Mohon isi: ${missing.join(', ')}`);
      // auto hide after 5s
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    setIsSubmitting(true);

    let fileLine = 'File referensi: tidak ada';
    if (formData.file) {
      const uploadedLink = await uploadReferenceFile(formData.file);
      if (uploadedLink) {
        fileLine = `File referensi: ${uploadedLink}`;
      } else {
        const failedName = formData.file.name || 'berkas';
        fileLine = `File referensi: ${failedName} (gagal diupload, kirim manual via WhatsApp)`;
      }
    }

    // Compose WhatsApp order message
    const selectedService = SERVICES.find((s) => s.id === formData.service)?.title || formData.service;
    const message = [
      'Order Codekita',
      '',
      `Nama: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Layanan: ${selectedService}`,
      `Deskripsi: ${formData.description}`,
      fileLine,
      '',
      '— dikirim dari website codekita'
    ].join('\n');

    openWhatsAppFallback(WHATSAPP_NUMBER, message);

    // Reset form
    setFormData({ fullName: '', email: '', service: SERVICES[0].id, description: '' });
    setFileName(null);
    setIsSubmitting(false);
  };

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mulai Proyek Anda</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Ceritakan kebutuhan Anda dan kami akan segera menghubungi Anda kembali.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Jenis Layanan</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white">
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kebutuhan</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File Referensi (Opsional)</label>
                <label htmlFor="fileUpload" className="relative flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <UploadCloudIcon className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">{fileName || 'Tarik & lepas file atau klik untuk memilih'}</span>
                  </span>
                  <input id="fileUpload" name="fileUpload" type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </label>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Kirim Pesanan'}
              </motion.button>
            </form>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-black/40" onClick={() => setErrorMessage(null)} />
              <div className="relative bg-white p-6 rounded-lg shadow-2xl border border-red-200 flex items-start space-x-4 w-[90%] max-w-md">
                <XIcon className="w-8 h-8 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Formulir belum lengkap</h4>
                  <p className="text-gray-600">{errorMessage}</p>
                </div>
                <button onClick={() => setErrorMessage(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-5 right-5 bg-white p-6 rounded-lg shadow-2xl border border-gray-200 flex items-start space-x-4 max-w-sm"
            >
              <CheckCircleIcon className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Pesanan Terkirim!</h4>
                <p className="text-gray-600">Terima kasih! Kami akan segera menghubungi Anda.</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <XIcon className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OrderForm;
