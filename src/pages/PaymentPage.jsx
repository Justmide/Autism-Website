import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Building, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  ArrowLeft,
  Copy
} from 'lucide-react';
import PayPalButton from '../components/Btn/PaypalButton';

const PayPalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#003087" d="M20.341 3.678c-.22-.639-1.02-.819-1.527-.819H9.228c-.528 0-.95.355-1.056.86L6.12 14.96c-.102.484.24.94.73.94h3.565c.446 0 .82-.312.926-.757l.22-1.123c.104-.51.528-.86.926-.86h1.483c2.03 0 3.32-1.172 3.828-3.34.48-2.085-.74-3.488-2.4-3.488h-2.23c-.484 0-.882.355-1.008.818l-.444 2.23c-.06.312.18.6.484.6h.88c.352 0 .624.267.684.62l.22 1.123c.06.333-.156.64-.484.64H12.21a.933.933 0 0 1-.926-.757L9.99 8.118c-.104-.509.24-.96.73-.96h2.23c2.937 0 4.335 1.758 3.828 4.512-.528 2.773-2.648 4.02-5.292 4.02h-1.483c-.99 0-1.527.71-1.31 1.67l1.056 4.713c.104.484.528.84.926.84h2.912c.508 0 1.94-.18 2.218-1.07l.02-.08 1.483-6.653c.104-.509-.24-.96-.73-.96h-2.23z"/>
    <path fill="#009cde" d="M10.35 8.958l.445-2.23c.125-.463.528-.818 1.008-.818h2.23c1.66 0 2.88 1.403 2.4 3.488-.508 2.168-1.798 3.34-3.828 3.34h-1.483c-.4 0-.78-.35-.926-.86l-.22-1.123c-.105-.51-.528-.86-.926-.86h-.88c-.304 0-.544-.288-.484-.6z"/>
  </svg>
);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('paypal'); // 'card', 'paypal', or 'bank'
  const [orderDetails, setOrderDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get data from URL params
    const amount = searchParams.get('amount');
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    // Get detailed data from localStorage
    const storedData = localStorage.getItem('spedeveryday_intake');
    
    if (storedData) {
      setOrderDetails(JSON.parse(storedData));
    } else if (amount && email) {
      // Fallback if localStorage is missing but params exist
      setOrderDetails({
        amount: parseFloat(amount),
        clientEmail: email,
        clientName: name,
        services: [] // We won't have details, but we have the total
      });
    }

    setLoading(false);
  }, [searchParams]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = (method) => {
    if (method === 'card') {
      // Integration with Stripe would go here
      alert('This would open the Stripe payment gateway');
    } else if (method === 'paypal') {
      // Integration with PayPal would go here
      alert('This would redirect to PayPal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <Loader2 className="w-8 h-8 animate-spin text-brand-sage" />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-brand-navy mb-2">Invalid Order</h2>
          <p className="text-gray-600 mb-6">We couldn't find your order details. Please try submitting the form again.</p>
          <button 
            onClick={() => navigate('/book')}
            className="bg-brand-navy text-white px-6 py-2 rounded-full hover:bg-brand-sage transition-colors"
          >
            Return to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-brand-navy mb-2">
            Complete Your Payment
          </h1>
          <p className="text-brand-navy/70">
            Secure payment for SpedEveryday services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-sage" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-brand-bg rounded-xl">
                  <div className="text-sm text-brand-navy/60 mb-1">Client</div>
                  <div className="font-medium text-brand-navy">{orderDetails.clientName}</div>
                  <div className="text-sm text-brand-navy/60">{orderDetails.clientEmail}</div>
                </div>

                {orderDetails.services && orderDetails.services.length > 0 ? (
                  <div className="space-y-3">
                    {orderDetails.services.map((service, index) => (
                      <div key={index} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-0">
                        <div>
                          <div className="font-medium text-brand-navy">{service.title}</div>
                          <div className="text-sm text-brand-navy/60">{service.option}</div>
                        </div>
                        <div className="font-bold text-brand-navy">${service.price}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 italic">Service details not available</div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-lg font-medium text-brand-navy">Total Amount</div>
                <div className="text-3xl font-bold text-brand-sage">${orderDetails.amount}</div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-brand-navy mb-6">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-4 mb-6">
              
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === 'paypal'
                      ? 'border-brand-sage bg-brand-sage/5 text-brand-navy'
                      : 'border-gray-100 hover:border-brand-sage/50 text-gray-500'
                  }`}
                >
                  <PayPalIcon className={`w-8 h-8 ${paymentMethod === 'paypal' ? 'text-[#0070BA]' : 'text-gray-400'}`} />
                  <span className="font-medium">PayPal</span>
                </button>

            
              </div>
             {paymentMethod === "paypal" && (
  <div className="space-y-4 animate-fadeIn">
    <p className="text-sm text-gray-600 mb-4">
      You will be redirected to PayPal to complete your payment.
    </p>
    <PayPalButton amount={orderDetails.amount} />
    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
      <Shield className="w-3 h-3" />
      Secured by PayPal
    </div>
  </div>
)}
            </div>
          </div>

          {/* Sidebar / Trust */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-brand-navy mb-4">Secure Payment</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-brand-sage flex-shrink-0" />
                  <p>Your payment information is encrypted and secure.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-sage flex-shrink-0" />
                  <p>Instant confirmation email after successful payment.</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-sage/10 rounded-2xl p-6 border border-brand-sage/20">
              <h3 className="font-bold text-brand-navy mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Having trouble with payment? Contact our support team.
              </p>
              <a 
                href="mailto:support@spedeveryday.com"
                className="text-brand-sage font-medium hover:underline text-sm"
              >
                support@spedeveryday.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;