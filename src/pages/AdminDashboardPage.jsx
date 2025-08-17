// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase'; // Pastikan `db` juga diimpor dari firebase.js
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

// Impor ikon yang relevan dari lucide-react untuk "Akses Cepat"
import {
  Package, ShoppingCart, Settings, LogOut, Loader2, BarChart
} from 'lucide-react';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State untuk modal konfirmasi logout

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingMetrics(true);
      try {
        // Fetch Orders Data
        const ordersCollectionRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersCollectionRef);
        let salesSum = 0;
        let ordersCount = 0;
        ordersSnapshot.forEach(doc => {
          const order = doc.data();
          // Pastikan totalAmount adalah angka dan tambahkan validasi untuk tipe data
          if (typeof order.totalAmount === 'number') {
            salesSum += order.totalAmount;
          }
          ordersCount++;
        });
        setTotalSales(salesSum);
        setTotalOrders(ordersCount);

        // Fetch Products Data
        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        let productsCount = 0;
        let outOfStockCount = 0;
        productsSnapshot.forEach(doc => {
          const product = doc.data();
          productsCount++;
          // Pastikan stock adalah angka dan validasi jika perlu
          if (typeof product.stock === 'number' && product.stock === 0) {
            outOfStockCount++;
          }
        });
        setTotalProducts(productsCount);
        setOutOfStockProducts(outOfStockCount);

      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        // Anda bisa menambahkan state error untuk menampilkan pesan ke UI jika gagal fetch
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchDashboardData();
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen di-mount

  // Definisi metrik dashboard
  const dashboardMetrics = [
    {
      title: 'Total Penjualan',
      value: loadingMetrics ? '...' : `Rp ${totalSales.toLocaleString('id-ID')}`,
      icon: '💰', // Menggunakan emoji berwarna
      link: null
    },
    {
      title: 'Jumlah Pesanan',
      value: loadingMetrics ? '...' : totalOrders,
      icon: '📦', // Menggunakan emoji berwarna
      link: '/admin/orders' // Tambahkan link ke halaman pesanan
    },
    {
      title: 'Produk Terdaftar',
      value: loadingMetrics ? '...' : totalProducts,
      icon: '🏷️', // Menggunakan emoji berwarna
      link: '/admin/products' // Tambahkan link ke halaman produk
    },
    {
      title: 'Stok Habis',
      value: loadingMetrics ? '...' : outOfStockProducts,
      icon: '⚠️', // Menggunakan emoji berwarna
      link: '/admin/products?stock=out-of-stock'
    },
  ];

  // Fungsi untuk konfirmasi logout
  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Fungsi untuk menangani logout setelah konfirmasi
  const handleLogout = async () => {
    setShowLogoutConfirm(false); // Sembunyikan modal
    try {
      await signOut(auth);
      navigate('/admin/login'); // Arahkan ke halaman login admin
      // Anda bisa menambahkan pesan sukses menggunakan toast atau status message jika diinginkan
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Anda bisa menambahkan pesan error ke UI jika gagal logout
    }
  };

  return (
    // Container utama dengan background, padding, dan font Inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl font-inter min-h-screen">
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Dashboard Admin</h1>

      {/* Tombol Logout */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={confirmLogout} // Panggil fungsi konfirmasi
          className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
        >
          <LogOut className="mr-2" size={18} /> Logout
        </button>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardMetrics.map((metric, index) => (
          <Link
            key={index}
            to={metric.link || '#'} // Jika tidak ada link, gunakan '#'
            // Tambahkan pointer-events-none saat loading agar tidak bisa diklik
            className={`bg-[#FFFDF5] p-6 rounded-lg shadow-md flex items-center space-x-4
                        transform transition-transform duration-200 hover:scale-105
                        ${metric.link && !loadingMetrics ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}
                        ${loadingMetrics ? 'pointer-events-none opacity-80' : ''}`}
          >
            {/* Menggunakan span untuk emoji */}
            <span className="text-4xl">{metric.icon}</span>
            <div>
              <p className="text-lg text-[#254222]">{metric.title}</p>
              <h2 className="text-2xl font-bold text-[#254222] flex items-center">
                {loadingMetrics ? (
                  <Loader2 className="animate-spin text-[#254222] mr-2" size={24} /> // Spinner saat loading
                ) : (
                  metric.value
                )}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Access Links */}
      <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-[#254222] mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50 flex items-center justify-center"
          >
            <Package className="inline-block mr-2" size={20} /> Manajemen Produk
          </Link>
          <Link
            to="/admin/orders"
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50 flex items-center justify-center"
          >
            <ShoppingCart className="inline-block mr-2" size={20} /> Manajemen Pesanan
          </Link>
          <Link
            to="/admin/settings"
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#cae4c5] text-[#254222] hover:bg-[#cae4c5] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#cae4c5] focus:ring-opacity-50 flex items-center justify-center"
          >
            <Settings className="inline-block mr-2" size={20} /> Pengaturan Toko
          </Link>
        </div>
      </div>

      {/* Placeholder for recent activities or charts */}
      <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-md min-h-[250px] flex flex-col">
        <h2 className="text-xl font-semibold text-[#254222] mb-4">Aktivitas Terbaru & Statistik</h2>
        <div className="flex-grow flex items-center justify-center text-[#254222] text-lg text-center p-4 border border-dashed border-[#cae4c5] rounded-md">
          <BarChart className="mr-3 text-[#99cc66]" size={32} />
          Area ini dapat menampilkan grafik penjualan, pesanan terbaru, atau log aktivitas admin.
          <BarChart className="ml-3 text-[#99cc66]" size={32} />
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-[#254222] mb-4">Konfirmasi Logout</h3>
            <p className="text-[#254222] mb-6">Apakah Anda yakin ingin keluar dari dashboard admin?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                           bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                           bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
