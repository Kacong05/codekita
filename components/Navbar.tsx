
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';

interface NavbarProps {
  onServicesClick: () => void;
  onContactClick: () => void;
  onOrderClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onServicesClick, onContactClick, onOrderClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Layanan', action: onServicesClick },
    { label: 'Kontak', action: onContactClick },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-500">
          codekita
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderClick}
            className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            Pesan Sekarang
          </motion.button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-blue-500 text-lg"
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onOrderClick();
                  setIsOpen(false);
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 w-full max-w-xs"
              >
                Pesan Sekarang
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
