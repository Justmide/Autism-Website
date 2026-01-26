// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, Plus, Minus, ShoppingCart, Package, Trash2, MessageCircle, X, ChevronRight, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: quantity }];
    }
    
    saveCart(newCart);
    
    // Show notification
    showNotification(`Added ${product.name} to cart!`);
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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Support Products Shop</h1>
            <p className="lg:text-lg text-[15px] text-brand-navy/70 max-w-2xl mx-auto">
              Carefully curated learning materials, sensory tools, and developmental products
            </p>
          </div>
        </div>
      </div>

      {/* Cart Summary Banner */}
      {cart.length > 0 && (
        <div className="bg-gradient-to-r from-brand-sage to-brand-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <div>
                  <p className="font-semibold">You have {getTotalItems()} items in your cart</p>
                  <p className="text-sm opacity-90">Total: ${getTotalPrice().toFixed(2)}</p>
                </div>
              </div>
              <Link
                to="/cart"
                className="bg-white text-brand-navy px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                View Cart
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-sage focus:border-brand-sage outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-sage focus:border-brand-sage outline-none appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const cartItem = cart.find(item => item.id === product.id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-card transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-brand-gold text-white text-xs font-bold rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-semibold text-brand-sage uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-brand-navy mt-1">{product.name}</h3>
                    </div>
                    {product.age_group && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {product.age_group}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-brand-navy/60 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-brand-navy">
                      ${product.price}
                      {product.stock > 0 && (
                        <span className="text-sm text-green-600 font-normal block">
                          {product.stock} in stock
                        </span>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      {quantityInCart > 0 ? (
                        <>
                          <div className="flex items-center bg-brand-sage/10 rounded-lg">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-brand-sage hover:bg-brand-sage/20 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-brand-navy">
                              {quantityInCart}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              disabled={quantityInCart >= product.stock}
                              className={`w-8 h-8 flex items-center justify-center text-brand-sage hover:bg-brand-sage/20 rounded-r-lg ${
                                quantityInCart >= product.stock ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          disabled={product.stock <= 0}
                          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                            product.stock > 0
                              ? 'bg-brand-navy text-white hover:bg-brand-sage'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
            <p className="text-gray-500">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed right-6 bottom-[90px] z-40">
        <div className="relative">
          <Link
            to="/cart"
            className="bg-brand-navy text-white p-4 rounded-full shadow-lg hover:bg-brand-sage transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* View Cart CTA */}
      {cart.length > 0 && (
        <div className="fixed left-6 bottom-6 z-40">
          <Link
            to="/cart"
            className="bg-brand-sage text-white px-6 py-3 rounded-full shadow-lg hover:bg-brand-navy transition-colors flex items-center gap-2"
          >
            <span>View Cart ({getTotalItems()})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Shop;