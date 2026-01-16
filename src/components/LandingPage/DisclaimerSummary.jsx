import React from 'react';
import { ShieldAlert, ArrowRight, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DisclaimerSummary = () => {
  const navigate = useNavigate();

  return (
    <section className="py-2 bg-brand-bg" data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 md:p-10 border border-brand-navy/10 shadow-soft">
          <div className="flex items-start lg:gap-6 gap-3 mb-6">
            <div className="flex-shrink-0 lg:w-14 w-10 h-10 lg:h-14 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="lg:text-2xl sm:text-xl text-[20px] font-bold text-brand-navy mb-3">Important Disclaimer</h3>
           <p className="text-brand-navy/70 leading-relaxed mb-4 text-[13px] lg:text-[17px]">
 SpedEveryday provides educational support and parent coaching for families navigating autism. Our functional guidance complements professional medical care. 
WE DO NOT OFFER MEDICAL DIAGNOSIS, TREATMENT OR EMERGENCY MEDICAL SERVICES.
</p>
              
              {/* Quick Points */}
     
              

              {/* Read More Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-brand-navy/10">
                <p className="text-[13px] lg:text-[15px] text-brand-navy/60">
                  For complete legal details, terms, and policies
                </p>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="text-[15px] lg:text-[20px] inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-sage transition-colors duration-300 shadow-soft whitespace-nowrap"
                >
                  Read Full Disclaimer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSummary;