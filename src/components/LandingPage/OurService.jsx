import React, { useEffect } from 'react';
import { Users, ClipboardCheck, MessageCircle, School, HeartHandshake, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurService = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const services = [
    {
      id: 1,
      icon: <Users className="w-6 h-6" />,
      title: 'Parent Coaching',
      description: 'One-on-one guidance for managing behaviors and fostering development.',
      bgColor: 'bg-brand-navy',
      textColor: 'text-brand-gold',
      delay: 100
    },
    {
      id: 2,
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Autism Screening',
      description: 'Professional screening and functional profile assessments.',
      bgColor: 'bg-brand-navy',
      textColor: 'text-brand-gold',
      delay: 200
    },
    {
      id: 3,
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp Community',
      description: 'Daily support and guidance for parent community.',
      bgColor: 'bg-[#25D366]',
      textColor: 'text-white',
      delay: 300
    },
    {
      id: 4,
      icon: <School className="w-6 h-6" />,
      title: 'School Training',
      description: 'Professional development for teachers and school staff.',
      bgColor: 'bg-brand-navy',
      textColor: 'text-brand-gold',
      delay: 400
    }
  ];

  const additionalServices = [
    {
      id: 5,
      icon: <HeartHandshake className="w-6 h-6" />,
      title: 'Family Support',
      description: 'Supporting the entire family unit in understanding and managing autism.',
      bgColor: 'bg-brand-sage',
      textColor: 'text-white',
      delay: 100
    },
    {
      id: 6,
      icon: <Users className="w-6 h-6" />,
      title: 'Support Groups',
      description: 'Weekly support groups for parents and caregivers.',
      bgColor: 'bg-brand-navy',
      textColor: 'text-brand-gold',
      delay: 200
    },
    {
      id: 7,
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Progress Monitoring',
      description: 'Regular assessments and progress tracking for your child.',
      bgColor: 'bg-brand-sage',
      textColor: 'text-white',
      delay: 300
    },
    {
      id: 8,
      icon: <School className="w-6 h-6" />,
      title: 'School Advocacy',
      description: 'Support with IEP development and school meetings.',
      bgColor: 'bg-brand-navy',
      textColor: 'text-brand-gold',
      delay: 400
    }
  ];

  return (
    <>
      <div className='py-16 pb-20 bg-white z-0'>
        {/* topic */}
        <div className='mt-5' data-aos="fade-up">
          <p className='font-heading text-4xl md:text-5xl font-bold text-center text-brand-navy'>Our Services</p>
        </div>

        {/* sub text */}
        <div className='mt-6' data-aos="fade-up" data-aos-delay="100">
          <p className='font-sans g:text-lg text-[15px] text-center mt-4 text-brand-navy/70 max-w-3xl mx-auto px-4'>
            Comprehensive support designed to meet your family where you are.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.delay}
                className="group cursor-pointer"
              >
                <div className="bg-brand-bg rounded-2xl p-8 hover:shadow-card transition-all duration-300 h-full flex flex-col"
                     style={{ minHeight: '280px' }}>
                  <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center ${service.textColor} mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-sage transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center text-brand-sage font-semibold mt-auto">
                    <span className="group-hover:mr-2 transition-all">Learn more</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[50px]">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="font-heading text-xl md:text-3xl font-bold text-brand-navy">
              Additional Support Services
            </h2>
            <p className="font-sans lg:text-lg text-[15px] text-brand-navy/70 mt-4 max-w-2xl mx-auto">
              Extended services to provide comprehensive support throughout your journey
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                data-aos="zoom-in"
                data-aos-delay={service.delay}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-8 border border-brand-navy/10 hover:border-brand-sage/30 hover:shadow-card transition-all duration-300 h-full flex flex-col"
                     style={{ minHeight: '240px' }}>
                  <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center ${service.textColor} mb-5`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-sage transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}

      </div>
    </>
  );
};

export default OurService;