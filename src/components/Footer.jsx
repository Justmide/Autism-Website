import React from 'react';
import { HeartHandshake, Mail, Phone } from 'lucide-react';
import logo from "../assets/logo-Photoroom.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex md:justify-start justify-center items-center gap-3">
            <div className="rounded-lg flex items-center justify-center text-gray-900">
             <img src={logo} alt="logo" className="w-12 sm:w-16 md:w-[90px]" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">SpedEveryday</h3>
              <p className="text-gray-400 text-sm">Autism Support & Education</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="flex flex-wrap gap-4 md:justify-start justify-center">
              <a href="mailto:hello@spedeveryday.com" className="flex items-center gap-2 text-sm hover:text-brand-sage transition-colors">
                <Mail className="w-4 h-4" />
                hello@spedeveryday.com
              </a>
              <a href="tel:+2348001234567" className="flex items-center gap-2 text-sm hover:text-brand-sage transition-colors">
                <Phone className="w-4 h-4" />
                +1 (800) 123-4567
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SpedEveryday
            </p>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {['Privacy', 'Terms', 'Disclaimer', 'Contact'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;