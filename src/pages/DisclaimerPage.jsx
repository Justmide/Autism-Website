import React, { useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, Users, Stethoscope, 
  FileText, Heart, Award, Phone, Home, ArrowLeft,
  XCircle, CheckCircle, Mail, MessageCircle, 
  ShoppingBag, Clock, Shield, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const DisclaimerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  const disclaimerSections = [
    {
      title: 'Nature of Services',
      icon: <ShieldCheck className="w-6 h-6" />,
      content: [
        'SpedEveryday provides educational support, parent coaching, and functional guidance services. We are not a medical, diagnostic, or clinical treatment facility. Our services are designed to complement, not replace, professional medical evaluation, therapy, or clinical treatment.',
        'All assessments, screenings, and functional profiles provided by SpedEveryday are educational in nature and should not be considered medical diagnoses. For formal autism diagnosis and medical treatment, please consult with licensed healthcare professionals, including pediatricians, psychologists, or psychiatrists.'
      ]
    },
    {
      title: 'Professional Boundaries',
      icon: <ShieldAlert className="w-6 h-6" />,
      content: [
        'Our team consists of trained educators, parent coaches, and autism support specialists. We work within our scope of practice and maintain clear professional boundaries.'
      ],
      dontProvide: [
        'Medical diagnoses or clinical assessments',
        'Prescription of medications or medical treatments',
        'Psychotherapy or mental health counseling',
        'Emergency medical or crisis intervention services'
      ]
    },
    {
      title: 'Collaborative Approach',
      icon: <Users className="w-6 h-6" />,
      content: [
        'We believe in a collaborative, team-based approach to supporting children with autism. We encourage families to work with a multidisciplinary team that may include:',
        'We are happy to coordinate with your child\'s healthcare team and share educational recommendations when appropriate and with your consent.'
      ],
      teamIncludes: [
        'Pediatricians and medical doctors',
        'Licensed therapists (speech, occupational, physical)',
        'Psychologists and behavioral specialists',
        'Special education teachers and school staff'
      ]
    },
    {
      title: 'Evidence-Based Practices',
      icon: <FileText className="w-6 h-6" />,
      content: [
        'All strategies, techniques, and recommendations provided by SpedEveryday are based on current research and evidence-based practices in autism education and support. We continuously update our knowledge and methods to reflect the latest developments in the field. However, individual results may vary, and we cannot guarantee specific outcomes.'
      ]
    },
    {
      title: 'Confidentiality & Privacy',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'We take your family\'s privacy seriously. All information shared with SpedEveryday is kept confidential and used solely for the purpose of providing services to your family. We do not share your information with third parties without your explicit consent, except as required by law.',
        'Our WhatsApp support community is a private, moderated space. We expect all members to respect confidentiality and maintain a supportive, respectful environment.'
      ]
    },
    {
      title: 'Refund & Cancellation Policy',
      icon: <Award className="w-6 h-6" />,
      content: [
        'We want you to be satisfied with our services. Our refund and cancellation policies are as follows:'
      ],
      policies: [
        {
          title: 'Individual Sessions',
          description: 'Cancellations must be made at least 24 hours in advance for a full refund or rescheduling.',
          icon: <Clock className="w-4 h-4" />
        },
        {
          title: '6-Week Program',
          description: 'Refunds available within the first week if you are not satisfied. After week one, no refunds, but you may transfer your enrollment to a future cohort.',
          icon: <Users className="w-4 h-4" />
        },
        {
          title: 'WhatsApp Community',
          description: 'Monthly subscription can be cancelled anytime. No refunds for partial months.',
          icon: <MessageCircle className="w-4 h-4" />
        },
        {
          title: 'Store Products',
          description: 'Returns accepted within 14 days of delivery for unused items in original packaging.',
          icon: <ShoppingBag className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: <AlertCircle className="w-6 h-6" />,
      content: [
        'While we strive to provide the highest quality services, SpedEveryday and its staff are not liable for any outcomes resulting from the implementation of strategies or recommendations provided. Parents and caregivers are responsible for making informed decisions about their child\'s care and should consult with appropriate healthcare professionals before making significant changes to their child\'s treatment or education plan.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" data-aos="fade-right" data-aos-duration="1000">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-sage transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Previous Page
        </button>

        {/* Hero Section */}
        <div className="text-center mb-12" data-aos="fade-left" data-aos-duration="1000">
          <div className="w-20 h-20 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-brand-sage" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Legal Disclaimer & Ethics
          </h1>
          <p className="text-xl text-brand-navy/70 max-w-3xl mx-auto">
            Our commitment to transparency, ethics, and professional standards
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-12 max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Emergency Notice</h3>
              <p className="text-red-700/80">
                If you or your child are experiencing a medical emergency, please contact emergency services immediately or go to the nearest emergency room. SpedEveryday does not provide emergency medical services.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Sections */}
        <div className="space-y-8 max-w-4xl mx-auto" data-aos="fade-down" data-aos-duration="1000">
          {disclaimerSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft border border-brand-navy/5"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-navy mb-4">
                    {section.title}
                  </h2>
                  
                  {/* Content Paragraphs */}
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-brand-navy/70 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}

                  {/* "Don't Provide" List */}
                  {section.dontProvide && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-brand-navy mb-3">We do not provide:</h4>
                      <ul className="space-y-2">
                        {section.dontProvide.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-brand-navy/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Team Includes List */}
                  {section.teamIncludes && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-brand-navy mb-3">We collaborate with:</h4>
                      <ul className="space-y-2">
                        {section.teamIncludes.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-brand-navy/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Policies */}
                  {section.policies && (
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      {section.policies.map((policy, pIndex) => (
                        <div key={pIndex} className="bg-brand-bg rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-brand-sage/20 rounded-lg flex items-center justify-center text-brand-sage">
                              {policy.icon}
                            </div>
                            <h4 className="font-semibold text-brand-navy">{policy.title}</h4>
                          </div>
                          <p className="text-sm text-brand-navy/70">{policy.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-brand-navy to-brand-sage rounded-3xl p-8 md:p-12 text-white max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg opacity-90 mb-8">
              If you have questions about our services, policies, or this disclaimer, please don't hesitate to reach out. We're here to help and provide clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')} // Update this to your contact route
                className="bg-white text-brand-navy px-8 py-3 rounded-full font-semibold hover:bg-brand-bg transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Support
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Return to Home
              </button>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-sm text-brand-navy/60">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;