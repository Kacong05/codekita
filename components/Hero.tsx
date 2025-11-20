
import React from 'react';
import { motion } from 'framer-motion';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface HeroProps {
  onServicesClick: () => void;
  onOrderClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onServicesClick, onOrderClick }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
          alt="Teknologi abstrak"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow"
        >
          Bangun <span className="text-blue-400">Website Impianmu</span> Bersama codekita
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8"
        >
          Kami mengubah ide brilian Anda menjadi kenyataan digital dengan desain yang menawan dan fungsionalitas yang tak tertandingi.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderClick}
            className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Pesan Sekarang
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onServicesClick}
            className="bg-white text-blue-500 px-8 py-4 rounded-full font-bold text-lg shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
          >
            Lihat Layanan
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
