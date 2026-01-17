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

  
    </>
  );
};

export default LandingPage;
