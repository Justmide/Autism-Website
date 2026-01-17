import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Service = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const brandColors = {
    bg: '#F7F8F6',
    navy: '#1F2A44',
    sage: '#6FAF9E',
    gold: '#D6B25E',
    white: '#FFFFFF'
  };

  const services = [
    {
      id: 1,
      category: 'A. Parent Coaching & Education',
      title: 'CORE OFFER',
      icon: '👨‍👩‍👧‍👦',
      color: 'navy',
      items: [
        {
          type: '1:1 Autism Parent Coaching',
          subtitle: 'Virtual – Zoom Sessions',
          description: 'Individualized guidance for home and school',
          for: 'Parents who want individualized guidance for home and school',
          includes: [
            'Understanding the child\'s autism profile',
            'Behavior support strategies',
            'Communication & social skills support',
            'School advocacy guidance',
            'Home routine & structure support'
          ],
          pricing: [
            { label: 'Single session (60 mins)', price: '$85' },
            { label: '4-session package', price: '$300', popular: true },
            { label: '8-session package', price: '$560' }
          ]
        },
        {
          type: 'Group Parent Coaching',
          subtitle: 'Small Group – 6–10 parents',
          description: 'Shared learning + peer support',
          pricing: [
            { label: 'Per session', price: '$35' },
            { label: '6-session bundle', price: '$180', popular: true }
          ]
        }
      ]
    },
    {
      id: 2,
      category: 'B. Autism Screening & Functional Profile',
      title: 'NON-DIAGNOSTIC',
      icon: '📊',
      color: 'sage',
      disclaimer: '⚠️ Market clearly as Screening & Support Profile – NOT diagnosis',
      items: [
        {
          type: 'Autism Screening & Support Profile',
          includes: [
            'Intake interview',
            'Screening tools (parent questionnaires)',
            'Functional strengths & needs profile',
            'Behavior and learning recommendations',
            'Written summary report (parent-friendly)'
          ],
          deliverable: 'Autism Support & Functional Needs Profile',
          pricing: [
            { label: 'Screening + report', price: '$250' },
            { label: 'Add-on follow-up coaching (2 sessions)', price: '$380 total', popular: true }
          ]
        }
      ]
    },
    {
      id: 3,
      category: 'C. WhatsApp Parent Support Community',
      title: 'RECURRING INCOME',
      icon: '💬',
      color: 'gold',
      items: [
        {
          type: 'Monthly Autism Parent Support Group',
          includes: [
            'Weekly structured discussions',
            'Live Q&A sessions (2x/month)',
            'Behavior & communication strategies',
            'Emotional support & accountability'
          ],
          pricing: [
            { label: 'Monthly', price: '$35/month' },
            { label: 'Quarterly', price: '$90/quarter', popular: true },
            { label: 'Annual', price: '$300/year' }
          ]
        }
      ]
    },
    {
      id: 4,
      category: 'D. School & Teacher Training',
      title: 'HIGH VALUE',
      icon: '🏫',
      color: 'navy',
      items: [
        {
          type: 'Autism Awareness & Classroom Support Training',
          audience: 'Private schools, faith-based schools, caregivers',
          topics: [
            'Understanding autism',
            'Managing behaviors',
            'Visual supports & routines',
            'Sensory needs',
            'Inclusion strategies'
          ],
          pricing: [
            { label: '2-hour virtual training', price: '$500' },
            { label: 'Full-day training', price: '$1,000', popular: true },
            { label: 'Ongoing consulting', price: '$2,500–$5,000/year' }
          ]
        }
      ]
    }
  ];

  const getColorStyle = (color) => {
    switch (color) {
      case 'navy': return { backgroundColor: brandColors.navy, color: brandColors.white };
      case 'sage': return { backgroundColor: brandColors.sage, color: brandColors.white };
      case 'gold': return { backgroundColor: brandColors.gold, color: brandColors.navy };
      default: return { backgroundColor: brandColors.navy, color: brandColors.white };
    }
  };

  const getBorderColor = (color) => {
    switch (color) {
      case 'navy': return brandColors.navy;
      case 'sage': return brandColors.sage;
      case 'gold': return brandColors.gold;
      default: return brandColors.navy;
    }
  };

  const getTextColor = (color) => {
    switch (color) {
      case 'navy': return brandColors.navy;
      case 'sage': return brandColors.sage;
      case 'gold': return brandColors.gold;
      default: return brandColors.navy;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: brandColors.bg }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-aos="fade-down">
        <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: brandColors.navy }}>
            Autism Support Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional support programs for parents, educators, and schools
          </p>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-12 ">
          {services.map((service, index) => (
            <div key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
              {/* Service Category Header */}
              <div className="flex items-center gap-4 mb-8 ">
                <div className="text-3xl">{service.icon}</div>
                <div>
                  <div className="flex items-start gap-3 lg:flex flex-col">
                    <h2 className="lg:text-2xl md:text-xl md:text-[17px] text-[14px] font-bold" style={{ color: brandColors.navy }}>
                      {service.category}
                    </h2>
                    <span 
                      className="lg:text-sm text-[12px] font-semibold px-2 py-1 rounded-full"
                      style={getColorStyle(service.color)}
                    >
                      {service.title}
                    </span>
                  </div>
                  {service.disclaimer && (
                    <p className="text-sm mt-2 font-medium" style={{ color: brandColors.gold }}>
                      {service.disclaimer}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Items */}
              <div className="space-y-8 ">
                {service.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden "
                    data-aos="zoom-in"
                    data-aos-delay={itemIndex * 50}
                  >
                    <div className="p-6">
                      {/* Item Header */}
                      <div className="mb-6">
                        <h3 className="lg:text-xl text-[15px] font-bold mb-2" style={{ color: brandColors.navy }}>
                          {item.type}
                        </h3>
                        {item.subtitle && (
                          <p className="text-gray-600 mb-3 lg:text-lg text-[13px]">{item.subtitle}</p>
                        )}
                        {item.description && (
                          <p className="text-gray-700 lg:text-lg text-[13px]">{item.description}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Details */}
                        <div>
                          {item.for && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3 lg:text-xl text-[15px]" style={{ color: brandColors.navy }}>Who it's for</h4>
                              <p className="text-gray-700 lg:text-lg text-[13px]">{item.for}</p>
                            </div>
                          )}

                          {item.audience && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3 lg:text-xl text-[15px]" style={{ color: brandColors.navy }}>Audience</h4>
                              <p className="text-gray-700 lg:text-lg text-[13px]">{item.audience}</p>
                            </div>
                          )}

                          {item.includes && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3 lg:text-xl text-[15px]" style={{ color: brandColors.navy }}>Includes</h4>
                              <ul className="space-y-2">
                                {item.includes.map((include, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="mr-2" style={{ color: getTextColor(service.color) }}>•</span>
                                    <span className="text-gray-700 lg:text-lg text-[14px]">{include}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {item.topics && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3" style={{ color: brandColors.navy }}>Topics</h4>
                              <ul className="space-y-2">
                                {item.topics.map((topic, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="mr-2" style={{ color: getTextColor(service.color) }}>•</span>
                                    <span className="text-gray-700">{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {item.deliverable && (
                            <div className="p-4 rounded-lg" style={{ backgroundColor: `${getTextColor(service.color)}10` }}>
                              <h4 className="font-semibold mb-2" style={{ color: getTextColor(service.color) }}>Deliverable</h4>
                              <p className="font-medium" style={{ color: brandColors.navy }}>{item.deliverable}</p>
                            </div>
                          )}
                        </div>

                        {/* Right Column - Pricing */}
                        <div>
                          <div className="sticky top-16">
                            <div className="mb-4">
                              <h4 className="font-semibold text-lg mb-4" style={{ color: brandColors.navy }}>Pricing</h4>
                              <div className="space-y-3">
                                {item.pricing.map((price, priceIndex) => (
                                  <div 
                                    key={priceIndex}
                                    className={`p-4 rounded-lg border ${price.popular ? 'border-2' : 'border'} transition-all duration-300 hover:shadow-md cursor-pointer`}
                                    style={{ 
                                      borderColor: price.popular ? getBorderColor(service.color) : '#E5E7EB',
                                      backgroundColor: price.popular ? `${getTextColor(service.color)}05` : 'white'
                                    }}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="font-medium text-gray-800">{price.label}</div>
                                      <div className="text-right">
                                        <div className="lg:text-xl text-[14px] font-bold" style={{ color: brandColors.navy }}>
                                          {price.price}
                                        </div>
                                        {price.popular && (
                                          <div className="text-xs font-semibold mt-1" style={{ color: getTextColor(service.color) }}>
                                            MOST POPULAR
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button
                              className="w-full py-3 px-6 rounded-lg font-semibold bg-brand-navy text-white hover:bg-white hover:text-brand-navy hover:border-2 hover:border-brand-navy hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-tr-3xl transition-all duration-300 hover:shadow-lg"
                            >
                              Get Started
                            </button>

                            <div className="mt-4 text-center">
                              <button className="text-sm font-medium hover:underline" style={{ color: getTextColor(service.color) }}>
                                Schedule a consultation →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="lg:pt-12">
        <div className="text-white bg-gradient-to-r from-brand-navy to-brand-sage max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-[90%] lg:w-[60%] lg:py-7 rounded-3xl mb-10" data-aos="fade-up">
          <h2 className="lg:text-2xl text-xl pt-3 font-heading mb-4">
            Need help choosing the right program?
          </h2>
          <p className="text-gray-200 mb-8 lg:text-xl text-[15px]">
            Schedule a free 20-minute consultation with our specialists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pb-10">
            <button 
                 className="hover:rounded-tl-3xl hover:rounded-tr-3xl hover:shadow-lg bg-white text-brand-navy px-8 py-3 rounded-tl-3xl rounded-br-3xl font-semibold hover:bg-brand-navy hover:text-white hover:border-2 transition-colors duration-300 shadow-lg"
            >
              Book Free Consultation
            </button>
            <button 
                      className="hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-tr-3xl hover:shadow-lg bg-transparent border-2 border-white text-white px-6 py-3 rounded-tr-3xl rounded-bl-3xl font-semibold hover:border-2 transition-colors duration-300"
            
            >
              Download Program Guide
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
  
    </div>
  );
};

export default Service;