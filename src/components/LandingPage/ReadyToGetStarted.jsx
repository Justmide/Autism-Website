import React from 'react'
import { useNavigate } from 'react-router-dom';

const ReadyToGetStarted = () => {
  const navigate = useNavigate();
  return (
   <>
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div 
            className="bg-gradient-to-r from-brand-navy to-brand-sage rounded-3xl p-8 md:p-12 text-white text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="font-sans text-[15px] lg:text-[20px] mb-8 opacity-90">
                Book a consultation today and take the first step towards personalized autism support for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/consultation')}
                  className="bg-white text-brand-navy px-8 py-3 rounded-tl-3xl rounded-br-3xl font-semibold hover:bg-brand-navy hover:text-white hover:border-2 transition-colors duration-300 shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Book Consultation
                </button>
                <button 
                  onClick={() => navigate('/service')}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-tr-3xl rounded-bl-3xl font-semibold hover:border-2 hover:border-brand-navy transition-colors duration-300"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { number: '500+', label: 'Families Supported', delay: 100 },
              { number: '98%', label: 'Satisfaction Rate', delay: 200 },
              { number: '24/7', label: 'Support Available', delay: 300 },
              { number: '50+', label: 'Expert Sessions', delay: 400 }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={stat.delay}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-sage mb-2">
                  {stat.number}
                </div>
                <div className="font-sans text-brand-navy/70 text-sm md:text-base mb-20">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
   </>
  )
}

export default ReadyToGetStarted