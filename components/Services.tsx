
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import ServiceCard from './ServiceCard';
import { Service } from '../types';

interface ServicesProps {
  onOrderClick: (service: Service) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Services: React.FC<ServicesProps> = ({ onOrderClick }) => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Layanan Profesional Kami</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Solusi lengkap untuk kebutuhan digital Anda, dari ide hingga peluncuran.</p>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-center"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} onOrderClick={onOrderClick} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
