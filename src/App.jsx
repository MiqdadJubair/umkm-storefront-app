// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Import useLocation
import { motion, AnimatePresence } from 'framer-motion'; // Impor motion dan AnimatePresence
import './index.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

// Mengimpor semua halaman
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductManagementPage from './pages/ProductManagementPage';
import OrderManagementPage from './pages/OrderManagementPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

// Mendefinisikan variasi animasi untuk transisi halaman
const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw" // Mulai dari luar kiri
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween", // Jenis transisi
      ease: "easeInOut", // Fungsi timing
      duration: 0.5 // Durasi 0.5 detik
    }
  },
  exit: {
    opacity: 0,
    x: "100vw", // Keluar ke kanan
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5
    }
  }
};

function App() {
  const location = useLocation(); // Dapatkan objek lokasi saat ini dari React Router

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden"> {/* Tambahkan overflow-hidden */}
          <AnimatePresence mode='wait'> {/* mode='wait' agar animasi keluar selesai sebelum animasi masuk dimulai */}
            <Routes location={location} key={location.pathname}> {/* Pastikan Routes menggunakan lokasi dan key */}
              {/* Setiap Route harus membungkus elemennya dengan motion.div */}
              <Route path="/" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center" // Tambahkan kelas untuk mengisi ruang
                >
                  <HomePage />
                </motion.div>
              } />
              <Route path="/products" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <ProductListingPage />
                </motion.div>
              } />
              <Route path="/product/:id" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <ProductDetailPage />
                </motion.div>
              } />
              <Route path="/cart" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <CartPage />
                </motion.div>
              } />
              <Route path="/checkout" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <CheckoutPage />
                </motion.div>
              } />
              <Route path="/order-confirmation" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <OrderConfirmationPage />
                </motion.div>
              } />
              <Route path="/admin/login" element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex-grow flex flex-col items-center justify-center"
                >
                  <AdminLoginPage />
                </motion.div>
              } />

              {/* Rute yang dilindungi (hanya bisa diakses setelah login) */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full flex-grow flex flex-col items-center justify-center"
                    >
                      <AdminDashboardPage />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full flex-grow flex flex-col items-center justify-center"
                    >
                      <ProductManagementPage />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full flex-grow flex flex-col items-center justify-center"
                    >
                      <OrderManagementPage />
                    </motion.div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full flex-grow flex flex-col items-center justify-center"
                    >
                      <AdminSettingsPage />
                    </motion.div>
                  </ProtectedRoute>
                }
              />

              <Route path="/product/" element={<Navigate to="/products" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </CartProvider>
  );
}

// Wrap App component with Router outside, usually in index.js or main.jsx
// For Canvas environment, keep Router here.
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
