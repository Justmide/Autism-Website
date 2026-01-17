import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import HeroSection from '../components/LandingPage/HeroSection';
import OurService from '../components/LandingPage/OurService';
import AboutUs from '../components/LandingPage/AboutUs';
import ReadyToGetStarted from '../components/LandingPage/ReadyToGetStarted';
import DisclaimerSummary from '../components/LandingPage/DisclaimerSummary';

const LandingPage = () => {
  return (
    <>
      <section id="home">
        <div className='bg-[#e5eae56a] py-4'>
          <HeroSection />
        </div>
      </section>

      <section id="services">
        <div className='bg-white'>
          <OurService />
        </div>
      </section>

      <section id="about">
        <div>
          <AboutUs />
        </div>
      </section>

      <section id="get-started">
        <div>
          <ReadyToGetStarted />
        </div>
      </section>

      <section id="disclaimer">
        <div className=''>
          <DisclaimerSummary />
        </div>
      </section>

      {/* Jump to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed left-6 bottom-6 z-50 p-3 rounded-full bg-brand-navy text-white shadow-lg transition-all duration-300 hover:bg-brand-sage transform hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

     
      {/* Progress Indicator (Optional) */}
      {/* <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
        <div 
          className="h-full bg-brand-sage transition-all duration-300"
          style={{
            width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`
          }}
        />
      </div> */}
    </>
  );
};

export default LandingPage;
