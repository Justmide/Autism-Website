// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Plus, Minus, Trash2, MessageCircle, 
  ArrowLeft, Package, ShoppingCart, CreditCard 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('shop-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('shop-cart', JSON.stringify(newCart));
    
    // Dispatch event for Navbar to listen to
    const event = new Event('cart-updated');
    window.dispatchEvent(event);
  };

  const updateQuantity = (productId, change) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      saveCart([]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSubtotal = () => {
    return getTotalPrice();
  };

  const getShipping = () => {
    return getTotalPrice() > 50 ? 0 : 9.99;
  };

  const getGrandTotal = () => {
    return getSubtotal() + getShipping();
  };

  const createWhatsAppOrder = () => {
    let message = "Hello SpedEveryday! I want to place order for:\n\n";
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name} x${item.quantity} = $${itemTotal.toFixed(2)}\n`;
    });
    
    message += "\n━━━━━━━━━━━━━━━━\n";
    message += `Subtotal: $${getSubtotal().toFixed(2)}\n`;
    if (getShipping() > 0) {
      message += `Shipping: $${getShipping().toFixed(2)}\n`;
    } else {
      message += "Shipping: FREE\n";
    }
    message += `Total: $${getGrandTotal().toFixed(2)}\n`;
    message += "\nPlease contact me to arrange payment and delivery details.";
    
    return message;
  };

  const handleWhatsAppCheckout = () => {
    const message = createWhatsAppOrder();
    const phoneNumber = "+2347088136059"; // Replace with your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Optionally clear cart after checkout
    // saveCart([]);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart to see them here!</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-sage transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="lg:text-3xl text-2xl font-bold text-brand-navy">Your Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{getTotalItems()} items in your cart</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="text-[13px] lg:px-4 px-2 py-2 lg:w-[140px] w-[80px] border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </button>
            <Link
              to="/shop"
              className="lg:px-4 px-2 py-2 text-[14px] lg:w-[210px] w-[180px] border border-brand-navy text-brand-navy rounded-lg hover:bg-brand-navy/5 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="lg:px-6 px-4 py-4 border-b bg-gray-50">
                <h2 className="font-semibold text-brand-navy">Cart Items</h2>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="lg:p-6 p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <div className="lg:w-24 lg:h-24 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-brand-navy lg:text-lg text-[14px]">{item.name}</h3>
                            {/* <p className="lg:text-sm text-[13px] text-gray-600 mt-1 line-clamp-2">{item.description}</p> */}
                            <div className="flex items-center gap-3 mt-2">
                              <span className="px-2 py-1 bg-brand-sage/10 text-brand-sage text-xs rounded-full">
                                {item.category}
                              </span>
                              {item.age_group && (
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                                  {/* {item.age_group} */}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="lg:text-2xl text-[14px] font-bold text-brand-navy">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="lg:text-sm text-[12px] text-gray-600">${item.price} each</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium text-brand-navy">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-8">
              <h2 className="text-xl font-bold text-brand-navy mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={getShipping() > 0 ? "font-semibold" : "text-green-600 font-semibold"}>
                    {getShipping() > 0 ? `$${getShipping().toFixed(2)}` : 'FREE'}
                  </span>
                </div>
                
                {getSubtotal() < 50 && (
                  <div className="text-sm text-brand-sage bg-brand-sage/10 p-3 rounded-lg">
                    <p className="font-medium">Spend ${(50 - getSubtotal()).toFixed(2)} more for free shipping!</p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl text-brand-navy">${getGrandTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full mt-8 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Checkout via WhatsApp
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                You'll be redirected to WhatsApp to complete your order
              </p>
              
              {/* Order Preview */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-brand-navy mb-3">Order Preview</h3>
                <div className="space-y-2 text-sm">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600 truncate">{item.name} x{item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="block w-full text-center border border-brand-navy text-brand-navy py-3 rounded-xl font-semibold hover:bg-brand-navy/5 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Checkout Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-brand-navy">${getGrandTotal().toFixed(2)}</p>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;