import React, { useState } from 'react';
import { 
  Send, 
  Loader2, 
  User, 
  Baby, 
  ClipboardCheck,
  MessageCircle,
  GraduationCap,
  Users,
  Shield,
  Mail,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ClientIntakeForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // Section 1: Parent Information
    parentName: '',
    email: '',
    phone: '',
    country: '',
    timezone: '',
    
    // Section 2: Child Information
    childName: '',
    childAge: '',
    childGender: '',
    childCountry: '',
    primaryLanguage: '',
    
    // Section 3: Current Concerns
    concerns: [],
    otherConcerns: '',
    
    // Section 4: Current Status
    diagnosis: '',
    diagnosisDetails: '',
    
    // Section 5: Services Requested with PRICES
    services: {
      parentCoaching: { selected: false, option: 'single', price: 85 },
      screening: { selected: false, option: 'basic', price: 250 },
      sixWeekProgram: { selected: false, option: 'early', price: 180 },
      whatsappGroup: { selected: false, option: 'monthly', price: 35 }
    },
    
    // Section 6: Consent
    consent: false
  });

  // Service Options with Prices
  const serviceOptions = {
    parentCoaching: [
      { id: 'single', label: 'Single session (60 min)', price: 85 },
      { id: '4sessions', label: '4 sessions', price: 300 },
      { id: '8sessions', label: '8 sessions', price: 560 }
    ],
    screening: [
      { id: 'basic', label: 'Screening + report', price: 250 },
      { id: 'plus', label: 'Screening + 2 coaching sessions', price: 380 }
    ],
    sixWeekProgram: [
      { id: 'early', label: 'Early bird', price: 180, original: 250 },
      { id: 'regular', label: 'Regular', price: 250 }
    ],
    whatsappGroup: [
      { id: 'monthly', label: 'Monthly', price: 35 },
      { id: 'quarterly', label: 'Quarterly', price: 90 },
      { id: 'annual', label: 'Annual', price: 300 }
    ]
  };

  const serviceTitles = {
    parentCoaching: '1:1 Parent Coaching',
    screening: 'Autism Screening & Functional Profile',
    sixWeekProgram: '6-Week Parent Program',
    whatsappGroup: 'WhatsApp Parent Support Group'
  };

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    Object.values(formData.services).forEach(service => {
      if (service.selected) {
        total += service.price;
      }
    });
    return total;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (serviceId, selected) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceId]: {
          ...prev.services[serviceId],
          selected
        }
      }
    }));
  };

  const handleServiceOptionChange = (serviceId, optionId) => {
    const selectedOption = serviceOptions[serviceId].find(opt => opt.id === optionId);
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceId]: {
          ...prev.services[serviceId],
          option: optionId,
          price: selectedOption.price
        }
      }
    }));
  };

  const handleConcernChange = (concern) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const sendEmailsViaResend = async () => {
    const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;
    
    // Get selected services with prices
    const selectedServices = Object.entries(formData.services)
      .filter(([_, service]) => service.selected)
      .map(([id, service]) => {
        const option = serviceOptions[id].find(opt => opt.id === service.option);
        return {
          title: serviceTitles[id],
          option: option.label,
          price: `$${service.price}`
        };
      });

    // 1. EMAIL TO CLIENT (Service Confirmation)
    const clientEmail = {
      from: 'SpedEveryday <onboarding@resend.dev>',
      to: [formData.email],
      subject: 'Your Selected Services - SpedEveryday Autism Support',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #6FAF9E; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">SpedEveryday Autism Support</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Service Confirmation</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Dear ${formData.parentName},</p>
            
            <p>Thank you for completing our intake form. Here are the services you've selected:</p>
            
            <div style="margin: 25px 0; background: white; border-radius: 8px; padding: 20px; border-left: 4px solid #6FAF9E;">
              <h3 style="color: #1F2A44; margin-top: 0;">Selected Services:</h3>
              ${selectedServices.map(service => `
                <div style="margin: 15px 0; padding: 10px; background: #F7F8F6; border-radius: 6px;">
                  <div style="font-weight: bold; color: #1F2A44;">${service.title}</div>
                  <div style="color: #666; font-size: 14px;">${service.option}</div>
                  <div style="color: #6FAF9E; font-weight: bold; font-size: 18px; margin-top: 5px;">${service.price}</div>
                </div>
              `).join('')}
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee; font-size: 20px; font-weight: bold; color: #1F2A44;">
                Total Amount: $${calculateTotal()}
              </div>
            </div>
            
            <p><strong>Next Step:</strong> You will now be redirected to our secure payment page to complete your booking.</p>
            
            <p>After payment, you'll receive:</p>
            <ul style="color: #666;">
              <li>Access to your selected programs</li>
              <li>Scheduling link for sessions</li>
              <li>Welcome materials</li>
            </ul>
            
            <p>If you have any questions, reply to this email or contact us at support@spedeveryday.com</p>
            
            <p>Warm regards,<br>
            <strong>The SpedEveryday Team</strong></p>
          </div>
        </div>
      `
    };

    // 2. EMAIL TO ADMIN (Full Details)
    const adminEmail = {
      from: 'SpedEveryday <onboarding@resend.dev>',
      to: ['admin@spedeveryday.com'], // Change to your admin email
      subject: `NEW CLIENT INTAKE: ${formData.parentName}`,
      text: `
        NEW CLIENT INTAKE FORM SUBMITTED
        =================================
        
        PARENT INFORMATION:
        -------------------
        Name: ${formData.parentName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Country: ${formData.country}
        Time Zone: ${formData.timezone}
        
        CHILD INFORMATION:
        ------------------
        Child's Name: ${formData.childName}
        Age: ${formData.childAge}
        Gender: ${formData.childGender}
        Country: ${formData.childCountry}
        Primary Language: ${formData.primaryLanguage}
        
        CONCERNS:
        ---------
        ${formData.concerns.join(', ')}
        Additional: ${formData.otherConcerns || 'None'}
        
        DIAGNOSIS STATUS:
        -----------------
        Formal Diagnosis: ${formData.diagnosis}
        Details: ${formData.diagnosisDetails || 'Not provided'}
        
        SERVICES SELECTED (TOTAL: $${calculateTotal()}):
        ----------------------------------------------
        ${selectedServices.map(s => `• ${s.title} - ${s.option} - ${s.price}`).join('\n')}
        
        SUBMITTED: ${new Date().toLocaleString()}
      `
    };

    try {
      // Send client email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientEmail),
      });

      // Send admin email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminEmail),
      });

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please agree to the terms to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send emails via Resend
      const emailSuccess = await sendEmailsViaResend();
      
      if (!emailSuccess) {
        throw new Error('Failed to send emails');
      }

      // Prepare data for payment page
      const paymentData = {
        amount: calculateTotal(),
        services: Object.entries(formData.services)
          .filter(([_, service]) => service.selected)
          .map(([id, service]) => ({
            title: serviceTitles[id],
            option: serviceOptions[id].find(opt => opt.id === service.option).label,
            price: service.price
          })),
        clientEmail: formData.email,
        clientName: formData.parentName,
        childName: formData.childName,
        formData: formData
      };

      // Store in localStorage for payment page
      localStorage.setItem('spedeveryday_intake', JSON.stringify(paymentData));
      
      // Redirect IMMEDIATELY to payment page
      window.location.href = `/payment?amount=${calculateTotal()}&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.parentName)}`;

    } catch (err) {
      setError('Failed to submit form. Please try again or contact us directly at support@spedeveryday.com');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Parent Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Parent/Guardian Full Name *
                </label>
                <input
                  type="text"
                  name="parentName"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Phone Number (WhatsApp preferred) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Country of Residence *
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="e.g., United States"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Time Zone *
                </label>
                <select
                  name="timezone"
                  required
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                >
                  <option value="">Select your time zone</option>
                  <option value="EST">EST (Eastern Time)</option>
                  <option value="CST">CST (Central Time)</option>
                  <option value="MST">MST (Mountain Time)</option>
                  <option value="PST">PST (Pacific Time)</option>
                  <option value="GMT">GMT (London)</option>
                  <option value="CET">CET (Central Europe)</option>
                  <option value="WAT">WAT (West Africa)</option>
                  <option value="IST">IST (India)</option>
                  <option value="AEST">AEST (Australia)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <Baby className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Child Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Child's First Name *
                </label>
                <input
                  type="text"
                  name="childName"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="Child's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Age *
                </label>
                <input
                  type="text"
                  name="childAge"
                  required
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="e.g., 4 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Gender *
                </label>
                <select
                  name="childGender"
                  required
                  value={formData.childGender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Country where child lives *
                </label>
                <input
                  type="text"
                  name="childCountry"
                  required
                  value={formData.childCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="e.g., United States"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Primary language spoken at home *
                </label>
                <input
                  type="text"
                  name="primaryLanguage"
                  required
                  value={formData.primaryLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="e.g., English, Spanish, French"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Current Concerns
              </h2>
            </div>

            <p className="text-brand-navy/70 mb-6">
              Please check all that apply to your child: *
            </p>

            <div className="space-y-4">
              {[
                'Communication / Speech',
                'Behavior (meltdowns, aggression, withdrawal)',
                'Social skills',
                'Sensory challenges',
                'Learning difficulties',
                'Daily living skills',
                'School support concerns'
              ].map((concern) => (
                <label key={concern} className="flex items-center gap-3 p-3 hover:bg-brand-bg rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.concerns.includes(concern)}
                    onChange={() => handleConcernChange(concern)}
                    className="w-5 h-5 text-brand-sage rounded border-brand-navy/30 focus:ring-brand-sage/20"
                  />
                  <span className="text-brand-navy">{concern}</span>
                </label>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-brand-navy mb-2">
                Other concerns not listed above
              </label>
              <textarea
                name="otherConcerns"
                value={formData.otherConcerns}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                placeholder="Please describe any other concerns..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Current Status
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-4">
                Has your child received a formal autism diagnosis? *
              </label>
              <div className="space-y-3">
                {['Yes', 'No', 'Unsure'].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 hover:bg-brand-bg rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="diagnosis"
                      value={option.toLowerCase()}
                      checked={formData.diagnosis === option.toLowerCase()}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-brand-sage focus:ring-brand-sage/20"
                    />
                    <span className="text-brand-navy">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.diagnosis === 'yes' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  If yes, where and by whom? (optional)
                </label>
                <textarea
                  name="diagnosisDetails"
                  value={formData.diagnosisDetails}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-brand-navy/20 rounded-xl focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition"
                  placeholder="e.g., Diagnosed by Dr. Smith at XYZ Hospital in 2023"
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Services Requested
              </h2>
            </div>

            <p className="text-brand-navy/70 mb-6">
              Select the service(s) you want to book: *
            </p>

            <div className="space-y-6">
              {Object.entries(serviceTitles).map(([id, title]) => (
                <div key={id} className="border border-brand-navy/10 rounded-xl p-6 hover:border-brand-sage transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-sage/10 rounded-lg flex items-center justify-center">
                        {id === 'parentCoaching' && <Users className="w-6 h-6 text-brand-sage" />}
                        {id === 'screening' && <ClipboardCheck className="w-6 h-6 text-brand-sage" />}
                        {id === 'sixWeekProgram' && <GraduationCap className="w-6 h-6 text-brand-sage" />}
                        {id === 'whatsappGroup' && <MessageCircle className="w-6 h-6 text-brand-sage" />}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-brand-navy text-lg">{title}</h3>
                        <div className="text-sm text-brand-navy/60">
                          {formData.services[id].selected && serviceOptions[id].find(opt => opt.id === formData.services[id].option)?.label}
                        </div>
                      </div>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services[id].selected}
                        onChange={(e) => handleServiceChange(id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-brand-sage after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  
                  {formData.services[id].selected && (
                    <div className="mt-4 p-4 bg-brand-bg rounded-lg">
                      <h4 className="font-medium text-brand-navy mb-3">Select option:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {serviceOptions[id].map((option) => (
                          <label 
                            key={option.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              formData.services[id].option === option.id
                                ? 'border-brand-sage bg-white shadow-sm'
                                : 'border-brand-navy/10 hover:border-brand-sage/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${id}_option`}
                              checked={formData.services[id].option === option.id}
                              onChange={() => handleServiceOptionChange(id, option.id)}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="font-medium text-brand-navy">{option.label}</div>
                              <div className="font-heading font-bold text-brand-sage text-xl mt-2">
                                ${option.price}
                              </div>
                              {option.original && (
                                <div className="text-sm text-brand-navy/40 line-through">
                                  ${option.original}
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-6 bg-brand-navy/5 rounded-xl border border-brand-navy/10">
              <h3 className="font-heading font-bold text-brand-navy mb-4">Order Summary</h3>
              <div className="space-y-3">
                {Object.entries(formData.services)
                  .filter(([_, service]) => service.selected)
                  .map(([id, service]) => {
                    const option = serviceOptions[id].find(opt => opt.id === service.option);
                    return (
                      <div key={id} className="flex justify-between items-center py-3 border-b border-brand-navy/10">
                        <div>
                          <div className="font-medium text-brand-navy">{serviceTitles[id]}</div>
                          <div className="text-sm text-brand-navy/60">{option.label}</div>
                        </div>
                        <div className="font-heading font-bold text-brand-sage">
                          ${service.price}
                        </div>
                      </div>
                    );
                  })}
                
                <div className="flex justify-between items-center pt-4">
                  <div className="font-heading font-bold text-brand-navy text-lg">Total Amount</div>
                  <div className="font-heading font-bold text-brand-sage text-2xl">
                    ${calculateTotal()}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  After form submission, you'll receive an email with your selected services 
                  and be redirected to our secure payment page.
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-brand-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Consent & Final Step
              </h2>
            </div>

            <div className="p-6 bg-brand-bg rounded-xl mb-6">
              <p className="text-brand-navy mb-4">
                I understand that services provided by SpedEveryday are educational and consultative 
                and do not constitute a medical or psychological diagnosis. I acknowledge that these 
                services are not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-brand-navy">
                By submitting this form, I consent to:
              </p>
              <ul className="mt-3 space-y-2 text-brand-navy">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                  <span>Receiving emails about my selected services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                  <span>Being redirected to the payment page</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                  <span>The collection and use of my information for service delivery</span>
                </li>
              </ul>
            </div>

            <label className="flex items-start gap-3 p-4 border border-brand-navy/10 rounded-xl hover:bg-brand-bg cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className="w-5 h-5 text-brand-sage rounded mt-1 focus:ring-brand-sage/20"
              />
              <div>
                <span className="font-medium text-brand-navy">I agree to all terms above</span>
                <p className="text-sm text-brand-navy/60 mt-1">
                  Click submit to receive your service confirmation email and proceed to payment
                </p>
              </div>
            </label>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3 text-red-600">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="text-sm">{error}</div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-xl md:text-4xl font-bold text-brand-navy mb-4">
            SpedEveryday Client Intake Form
          </h1>
          <p className="text-lg text-brand-navy/70">
            Complete this form to book autism support services
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-brand-navy">
              Step {step} of 6
            </div>
            <div className="text-sm text-brand-navy/60">
              {step === 1 && 'Parent Information'}
              {step === 2 && 'Child Information'}
              {step === 3 && 'Current Concerns'}
              {step === 4 && 'Current Status'}
              {step === 5 && 'Services & Pricing'}
              {step === 6 && 'Consent & Submit'}
            </div>
          </div>
          <div className="h-2 bg-brand-navy/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-sage rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-brand-navy/10">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-3 border border-brand-navy/30 text-brand-navy rounded-xl font-medium hover:bg-brand-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              type={step === 6 ? 'submit' : 'button'}
              onClick={step === 6 ? handleSubmit : () => setStep(step + 1)}
              disabled={loading || (step === 6 && !formData.consent)}
              className="bg-brand-navy text-white text-[13px] px-4 py-2.5 rounded-xl font-heading font-semibold hover:bg-brand-sage transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : step === 6 ? (
                <>
                  <Send className="w-5 h-5" />
                  Proceed to Payment
                </>
              ) : (
                'Next Step'
              )}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white/50 rounded-xl p-6 border border-brand-navy/10">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-brand-sage" />
            <h3 className="font-heading font-bold text-brand-navy">What happens after submission?</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3">
              <div className="w-8 h-8 bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <div className="font-medium text-brand-navy">Email Confirmation</div>
              <p className="text-xs text-brand-navy/60 mt-1">Receive service details & prices</p>
            </div>
            <div className="text-center p-3">
              <div className="w-8 h-8 bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <div className="font-medium text-brand-navy">Automatic Redirect</div>
              <p className="text-xs text-brand-navy/60 mt-1">Go to secure payment page</p>
            </div>
            <div className="text-center p-3">
              <div className="w-8 h-8 bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <div className="font-medium text-brand-navy">Complete Payment</div>
              <p className="text-xs text-brand-navy/60 mt-1">Pay for selected services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientIntakeForm;