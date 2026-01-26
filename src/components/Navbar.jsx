import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, PhoneCallIcon, MessageCircleCode } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'service', label: 'Services', path: '/service' },
    { id: 'programs', label: 'Programs', path: '/programs' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'shop', label: 'Shop', path: '/shop' },
  ];

  const handleNavClick = (path) => {
    if (path === 'store') {
      alert('Shop coming soon!');
    } else if (path === 'consultation') {
      navigate('/consultation');
    } else if (path) {
      navigate(path);
    }
    setMobileMenuOpen(false);
  };

  // Load cart items count
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('shop-cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
          setCartItems(totalItems);
        } catch (err) {
          console.error('Error parsing cart:', err);
          setCartItems(0);
        }
      } else {
        setCartItems(0);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for custom cart update events (since storage event only works across tabs)
    const handleCartUpdate = () => {
      updateCartCount();
    };

    // Listen for storage events (changes from other tabs)
    window.addEventListener('storage', handleCartUpdate);
    
    // Listen for custom events (changes from same tab)
    window.addEventListener('cart-updated', handleCartUpdate);
    
    // Poll for changes (fallback)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#e5eae56a] border-b border-gray-200 w-full">
      <div className="w-full mx-auto px-5 sm:px-[0%] lg:px-[5%] backdrop-blur-lg">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('/')}
          >
            <img 
              src='https://ucarecdn.com/6d8418de-73c8-4653-a42c-fe4faad98376/-/preview/569x438/' 
              alt="SpedEveryday logo" 
              className="w-[90px]" 
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => handleNavClick(item.path)}
                className={`font-medium ${
                  location.pathname === item.path
                    ? 'text-[#6FAF9E]'
                    : 'text-[#1F2A44] hover:text-[#6FAF9E]'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="relative p-2 text-[#1F2A44] hover:text-[#6FAF9E]"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D6B25E] rounded-full border-2 border-white text-[10px] flex items-center justify-center text-white font-bold">
                  {cartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/consultation')}
              className="bg-[#1F2A44] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#6FAF9E] transition shadow-lg"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="relative p-2 text-[#1F2A44] hover:text-[#6FAF9E]"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D6B25E] rounded-full border-2 border-white text-[10px] flex items-center justify-center text-white font-bold">
                  {cartItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#1F2A44] p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE MENU */}
      <div className={`fixed top-0 right-0 h-full w-[65%] max-w-sm backdrop-blur-xl z-50 shadow-2xl transition-transform duration-500 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 text-white">
          <div className="flex justify-end mb-10">
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-3.5 rounded-lg text-lg font-medium transition ${
                  location.pathname === item.path
                    ? 'bg-white text-[#6FAF9E]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-8">
            <button
              onClick={() => handleNavClick('store')}
              className="hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-br-sm hover:rounded-tr-3xl duration-300 hover:shadow-lg text-[13px] lg:text-[17px] w-full flex items-center justify-center gap-2 bg-white/20 text-white py-3.5 rounded-tl-3xl rounded-br-3xl font-semibold hover:border-2 hover:text-brand-navy transition"
            >
              <PhoneCallIcon className="w-5 h-5" />
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('/consultation')}
              className="hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-tr-3xl duration-300 hover:shadow-lg text-[13px] gap-2 lg:text-[17px] flex justify-center items-center w-full bg-white text-[#6FAF9E] py-3.5 rounded-tr-3xl rounded-bl-3xl font-semibold shadow-xl hover:bg-brand-sage hover:text-white transition"
            >
              <MessageCircleCode className="w-5 h-5"/>
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;