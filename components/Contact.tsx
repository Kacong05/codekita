import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';
import WhatsappIcon from './icons/WhatsappIcon';
import InstagramIcon from './icons/InstagramIcon';

const Contact: React.FC = () => {

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kontak</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Hubungi kami terlebih dahulu sebelum melakukan pemesanan.</p>
        </motion.div>
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
            <div className="space-y-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                <WhatsappIcon className="w-6 h-6 text-green-500" />
                <span>WhatsApp</span>
              </a>
              {SOCIAL_LINKS.filter(s => s.name === 'Instagram').map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                  <InstagramIcon className="w-6 h-6 text-pink-500" />
                  <span>Instagram</span>
                </a>
              ))}
              <div className="text-gray-700">Email: codekita.site@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
