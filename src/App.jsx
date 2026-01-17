import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DisclaimerPage from "./pages/DisclaimerPage";
import Services from "./pages/Services";
import Programs from "./pages/Programs";
import AutismLoader from "./components/Loader/AutismLoader";
import { ArrowUp } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loader on EVERY location change
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reinitialize AOS after loading
      setTimeout(() => AOS.refresh(), 100);
    }, 800); // Shorter time for navigation

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger on pathname change

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show loader
  if (isLoading) {
    return <AutismLoader />;
  }

  return (
    <div className="App relative min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/service" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 z-40 p-3 rounded-full bg-brand-navy text-white shadow-lg transition-all duration-300 hover:bg-brand-sage transform hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Progress Indicator */}
    
    </div>
  );
}

export default App;