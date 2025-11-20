
import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar 
        onServicesClick={() => scrollTo(servicesRef)} 
        onContactClick={() => scrollTo(contactRef)} 
        onOrderClick={() => scrollTo(orderRef)} 
      />
      <main>
        <Hero 
          onServicesClick={() => scrollTo(servicesRef)} 
          onOrderClick={() => scrollTo(orderRef)} 
        />
        <div ref={servicesRef}>
          <Services onOrderClick={(service) => scrollTo(orderRef)} />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <div ref={orderRef}>
          <OrderForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
