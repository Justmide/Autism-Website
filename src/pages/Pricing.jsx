import React, { useEffect } from 'react';
import { 
  Users, 
  ClipboardCheck, 
  GraduationCap, 
  MessageCircle, 
  Check, 
  CreditCard, 
  Smartphone, 
  Globe,
  Shield,
  Star,
  Calendar,
  FileText,
  Clock,
  UsersRound,
  HeartHandshake
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pricing = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const pricingPlans = [
    {
      id: 1,
      title: "Autism Parent Coaching",
      description: "Individual coaching sessions",
      icon: <Users className="w-7 h-7" />,
      options: [
        { label: "Single session (60 min)", price: "$85" },
        { label: "4 sessions", price: "$300", savings: "Save $40" },
        { label: "8 sessions", price: "$560", savings: "Save $120", popular: true }
      ],
      features: [
        "Personalized strategies",
        "Behavior management techniques",
        "Weekly action plans",
        "Email support"
      ],
      buttonText: "Book Coaching",
      buttonColor: "bg-brand-sage hover:bg-brand-sage/90",
      iconColor: "bg-brand-sage/20 text-brand-sage"
    },
    {
      id: 2,
      title: "Autism Screening & Profile",
      description: "Professional assessment",
      icon: <ClipboardCheck className="w-7 h-7" />,
      options: [
        { label: "Screening + report", price: "$250" },
        { label: "Screening + 2 coaching sessions", price: "$380", savings: "Save $70", popular: true }
      ],
      features: [
        "Comprehensive assessment",
        "Detailed written report",
        "Developmental profile",
        "Recommendations guide"
      ],
      buttonText: "Schedule Assessment",
      buttonColor: "bg-brand-navy hover:bg-brand-sage",
      iconColor: "bg-brand-navy/10 text-brand-navy"
    },
    {
      id: 3,
      title: "6-Week Parent Program",
      description: "Complete training course",
      icon: <GraduationCap className="w-7 h-7" />,
      options: [
        { label: "Early bird", price: "$180", originalPrice: "$250", savings: "Save $70", popular: true },
        { label: "Regular", price: "$250" }
      ],
      features: [
        "6 weeks of live training",
        "All course materials",
        "Certificate of completion",
        "Lifetime access to updates"
      ],
      buttonText: "Enroll Now",
      buttonColor: "bg-brand-gold hover:bg-brand-gold/90",
      iconColor: "bg-brand-gold/20 text-brand-gold"
    },
    {
      id: 4,
      title: "Parent Support Group",
      description: "WhatsApp community access",
      icon: <MessageCircle className="w-7 h-7" />,
      options: [
        { label: "Monthly", price: "$35" },
        { label: "Quarterly", price: "$90", savings: "Save $15" },
        { label: "Annual", price: "$300", savings: "Save $120", popular: true }
      ],
      features: [
        "Daily expert guidance",
        "Weekly Q&A sessions",
        "Peer support network",
        "Resource library"
      ],
      buttonText: "Join Group",
      buttonColor: "bg-[#25D366] hover:bg-[#20BA5A]",
      iconColor: "bg-[#25D366]/20 text-[#25D366]"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      title: "Card Payment",
      description: "Visa, Mastercard, Amex",
      icon: <CreditCard className="w-7 h-7" />,
      color: "text-brand-sage"
    },
    {
      id: 2,
      title: "Mobile Money",
      description: "Quick & secure",
      icon: <Smartphone className="w-7 h-7" />,
      color: "text-brand-gold"
    },
    {
      id: 3,
      title: "Bank Transfer",
      description: "Direct deposit",
      icon: <Globe className="w-7 h-7" />,
      color: "text-brand-navy"
    }
  ];

  const handleSelectPlan = (planId, optionIndex) => {
    console.log(`Selected plan ${planId}, option ${optionIndex}`);
    // Add your booking logic here
  };

  return (
    <section id="pricing" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm mb-6">
            <Shield className="w-4 h-4 text-brand-sage" />
            <span className="font-heading font-semibold text-brand-navy">Clear, Simple Pricing</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mb-4">
            Invest in Your Child's Growth
          </h1>
          <p className="lg:text-lg text-[15px] text-brand-navy/70 max-w-2xl mx-auto font-sans">
            Professional autism support with transparent pricing. Choose what works best for your family.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl p-6 border border-brand-navy/10 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`${plan.iconColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-navy lg:text-lg text-[15px]">{plan.title}</h3>
                  <p className="text-sm text-brand-navy/60 font-sans">{plan.description}</p>
                </div>
              </div>

              {/* Pricing Options */}
              <div className="space-y-4 mb-6">
                {plan.options.map((option, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      option.popular 
                        ? 'border-brand-sage bg-brand-sage/5' 
                        : 'border-brand-navy/10 hover:border-brand-sage/50'
                    }`}
                    onClick={() => handleSelectPlan(plan.id, idx)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-heading font-semibold text-brand-navy">{option.label}</div>
                        {option.savings && (
                          <div className="text-xs text-brand-sage font-medium mt-1">{option.savings}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-heading font-bold text-brand-navy text-xl">{option.price}</div>
                        {option.originalPrice && (
                          <div className="text-sm text-brand-navy/40 line-through">{option.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    {option.popular && (
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-brand-sage">
                        <Star className="w-3 h-3" />
                        Most Popular Choice
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-brand-navy text-sm mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                      <span className="text-brand-navy/70 font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={() => handleSelectPlan(plan.id, 0)}
                className={`${plan.buttonColor} w-full text-white py-3 rounded-xl font-heading font-semibold transition-colors duration-200`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div 
          className="bg-white rounded-2xl p-8 border border-brand-navy/10"
          data-aos="fade-up"
        >
          <h2 className="font-heading text-xl font-bold text-brand-navy text-center mb-8">
            Flexible Payment Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {paymentMethods.map((method) => (
              <div key={method.id} className="text-center">
                <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className={method.color}>
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-brand-navy mb-2">{method.title}</h3>
                <p className="text-brand-navy/70 text-sm font-sans">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div 
          className="mt-16 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="inline-flex items-center gap-3 bg-brand-sage/10 px-6 py-3 rounded-full mb-6">
            <HeartHandshake className="w-5 h-5 text-brand-sage" />
            <span className="font-heading font-semibold text-brand-navy">Need help choosing?</span>
          </div>
          <h3 className="font-heading text-2xl font-bold text-brand-navy mb-6">
            Schedule a 20 minute Consultation
          </h3>
          <p className="text-brand-navy/70 lg:text-lg text-[15px] mb-8 max-w-xl mx-auto font-sans">
            Let's discuss your child's needs and find the perfect support option together.
          </p>
          <button 
                        className="hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-tr-3xl hover:shadow-lg bg-transparent border-2 border-brand-navy text-brand-navy px-6 py-3 rounded-tr-3xl rounded-bl-3xl font-semibold hover:border-2 transition-colors duration-300"
            
            >
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;