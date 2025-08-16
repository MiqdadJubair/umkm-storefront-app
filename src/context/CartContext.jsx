// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Buat Context
const CartContext = createContext();

// 2. Buat Provider Component
export const CartProvider = ({ children }) => {
  // State untuk menyimpan item keranjang
  const [cartItems, setCartItems] = useState(() => {
    // Fungsi inisialisasi state dari localStorage (dijalankan hanya sekali saat render awal)
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Gagal memuat keranjang dari localStorage:", error);
      return []; // Mengembalikan array kosong jika ada error
    }
  });

  // useEffect untuk menyimpan cartItems ke localStorage setiap kali state berubah
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log("CartContext: Keranjang disimpan ke localStorage:", cartItems);
    } catch (error) {
      console.error("Gagal menyimpan keranjang ke localStorage:", error);
    }
  }, [cartItems]); // Dijalankan setiap kali cartItems berubah

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Jika produk sudah ada, perbarui kuantitas
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Jika produk belum ada, tambahkan item baru
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Fungsi untuk memperbarui kuantitas item
  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Fungsi untuk mengosongkan keranjang
  const clearCart = () => {
    setCartItems([]);
  };

  // Hitung total harga keranjang
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Buat Custom Hook untuk kemudahan penggunaan
export const useCart = () => useContext(CartContext);
