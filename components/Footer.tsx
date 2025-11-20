
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-blue-400">Codekita</h3>
            <p className="text-gray-400 mt-1">Mewujudkan Visi Digital Anda</p>
          </div>
          <div className="flex space-x-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                  <span className="sr-only">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; 2025 Codekita. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
