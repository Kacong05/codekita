
import { Service } from './types';
import { Code, Brush, Server } from 'lucide-react'; // Placeholder, actual icons are custom SVGs
import WebDevIcon from './components/icons/WebDevIcon';
import UiUxIcon from './components/icons/UiUxIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import WhatsappIcon from './components/icons/WhatsappIcon';
// Removed LinkedIn as requested; keep only Instagram and WhatsApp
export const WHATSAPP_NUMBER = '6285708779638';

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Kami membangun website modern, cepat, dan SEO-friendly sesuai kebutuhan bisnis Anda.',
    price: 'Mulai dari Rp 500.000',
    icon: WebDevIcon,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Desain antarmuka yang intuitif dan menarik untuk meningkatkan pengalaman pengguna.',
    price: 'Mulai dari Rp 200.000',
    icon: UiUxIcon,
  },
];

export const NAV_LINKS = [
    { name: 'Layanan', target: 'services' },
    { name: 'Pesan', target: 'order' },
];

export const SOCIAL_LINKS = [
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/codekita_?igsh=N3Jtb3dtODVhMW43' },
    // WhatsApp requires country code; converted 0857... to 62857...
    { name: 'WhatsApp', icon: WhatsappIcon, url: `https://wa.me/${WHATSAPP_NUMBER}` },
];
