// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('shop-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('shop-cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    updateCart(newCart);
    return newCart;
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
    
    updateCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};