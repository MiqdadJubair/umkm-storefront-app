// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

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
          if (order.totalAmount) {
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
          if (product.stock === 0) {
            outOfStockCount++;
          }
        });
        setTotalProducts(productsCount);
        setOutOfStockProducts(outOfStockCount);

      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardMetrics = [
    { title: 'Total Penjualan', value: loadingMetrics ? '...' : `Rp ${totalSales.toLocaleString('id-ID')}`, icon: '💰', link: null },
    { title: 'Jumlah Pesanan', value: loadingMetrics ? '...' : totalOrders, icon: '📦', link: null },
    { title: 'Produk Terdaftar', value: loadingMetrics ? '...' : totalProducts, icon: '🏷️', link: null },
    { title: 'Stok Habis', value: loadingMetrics ? '...' : outOfStockProducts, icon: '⚠️', link: '/admin/products?stock=out-of-stock' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Anda berhasil logout.');
      navigate('/admin/login');
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert('Gagal logout. Silakan coba lagi.');
    }
  };

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Dashboard Admin</h1>

      {/* Tombol Logout */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={handleLogout}
          // Tombol outline merah
          className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardMetrics.map((metric, index) => (
          metric.link ? (
            <Link 
              key={index} 
              to={metric.link} 
              // Background #FFFDF5, teks dark-neutral, dengan efek hover
              className="bg-[#FFFDF5] p-6 rounded-lg shadow-md flex items-center space-x-4 
                         transform transition-transform duration-200 hover:scale-105 cursor-pointer 
                         hover:shadow-lg"
            >
              <span className="text-4xl">{metric.icon}</span>
              <div>
                <p className="text-lg text-[#254222]">{metric.title}</p>
                <h2 className="text-2xl font-bold text-[#254222]">{metric.value}</h2>
              </div>
            </Link>
          ) : (
            <div 
              key={index} 
              // Background #FFFDF5, teks dark-neutral, dengan efek hover
              className="bg-[#FFFDF5] p-6 rounded-lg shadow-md flex items-center space-x-4 
                         transform transition-transform duration-200 hover:scale-105 cursor-default 
                         hover:shadow-lg"
            >
              <span className="text-4xl">{metric.icon}</span>
              <div>
                <p className="text-lg text-[#254222]">{metric.title}</p>
                <h2 className="text-2xl font-bold text-[#254222]">{metric.value}</h2>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Quick Access Links */}
      <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-md"> {/* Background #FFFDF5 */}
        <h2 className="text-xl font-semibold text-[#254222] mb-4">Akses Cepat</h2> {/* Teks dark-neutral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/admin/products" 
            // Tombol outline main-accent
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
          >
            Manajemen Produk
          </Link>
          <Link 
            to="/admin/orders" 
            // Tombol outline biru (#6699cc)
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
          >
            Manajemen Pesanan
          </Link>
          <Link 
            to="/admin/settings" 
            // Tombol outline secondary-neutral
            className="py-3 px-6 rounded-lg text-lg text-center font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#cae4c5] text-[#254222] hover:bg-[#cae4c5] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#cae4c5] focus:ring-opacity-50"
          >
            Pengaturan Toko
          </Link>
        </div>
      </div>

      {/* Placeholder for recent activities or charts */}
      <div className="mt-8 bg-[#FFFDF5] p-6 rounded-lg shadow-md h-64 flex items-center justify-center text-[#254222] text-lg"> {/* Background #FFFDF5, teks dark-neutral */}
        [Area untuk Aktivitas Terbaru atau Grafik Statistik]
      </div>
    </div>
  );
}

export default AdminDashboardPage;
