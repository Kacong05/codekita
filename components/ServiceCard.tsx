
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ServiceCardProps {
  service: Service;
  onOrderClick: (service: Service) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOrderClick }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="bg-blue-100 text-blue-500 rounded-lg w-14 h-14 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
      <p className="font-semibold text-gray-800 mb-6">{service.price}</p>
      <button
        onClick={() => onOrderClick(service)}
        className="mt-auto bg-white text-blue-500 font-semibold py-3 px-6 rounded-full border-2 border-blue-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 group flex items-center justify-center gap-2"
      >
        Pesan Layanan Ini
        <ChevronRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default ServiceCard;
