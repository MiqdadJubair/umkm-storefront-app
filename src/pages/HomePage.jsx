// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { ArrowRight, Phone } from 'lucide-react'; // Menghapus Mail karena email kontak dihapus
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [storeName, setStoreName] = useState('UMKM Storefront');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Pastikan ini dihubungkan ke CartContext jika ada
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // State untuk informasi kontak dinamis (dari Firestore) dan nama pemilik
  const [adminWhatsApp, setAdminWhatsApp] = useState('6281234567890'); // Default
  const [ownerName, setOwnerName] = useState(''); // NEW: State untuk nama pemilik

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsDocRef = doc(db, 'storeSettings', 'general');
        const settingsDocSnap = await getDoc(settingsDocRef);
        let currentStoreName = 'UMKM Storefront';
        let currentOwnerName = ''; // Default owner name

        if (settingsDocSnap.exists()) {
          const data = settingsDocSnap.data();
          currentStoreName = data.storeName ? `${data.storeName.replace(/\*\*/g, '').trim()} Storefront` : 'UMKM Storefront';
          setStoreName(currentStoreName);

          // Ambil nomor WhatsApp admin dari Firestore
          setAdminWhatsApp(data.adminWhatsApp || '6281234567890');
          // NEW: Ambil nama pemilik dari Firestore
          currentOwnerName = data.ownerName ? data.ownerName.trim() : '';
          setOwnerName(currentOwnerName);
        }
        document.title = currentStoreName;

        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          category: doc.data().category ? String(doc.data().category).toLowerCase() : 'uncategorized',
        }));

        setProducts(productsData);

        const uniqueCategories = new Set(productsData.map(product => product.category));
        setCategories(['all', ...Array.from(uniqueCategories)]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data for Home Page:", err);
        setError("Gagal memuat beranda. Silakan coba lagi nanti.");
        setLoading(false);
        document.title = 'UMKM Storefront';
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') {
      return true;
    }
    return product.category === activeTab;
  });

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setNotificationMessage(`"${product.name}" telah ditambahkan ke keranjang!`);
    setShowNotification(true);
  };

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const navigateToProductListing = () => {
    navigate('/products');
  };

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat beranda...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    <div className="flex-grow flex flex-col items-center p-4 sm:p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl mx-auto font-inter my-8">
      {/* Notifikasi Tambah Keranjang */}
      {showNotification && (
        <div className="fixed top-20 right-8 bg-[#254222] text-[#FFFDF5] p-4 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notificationMessage}
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-10 p-6 bg-[#FFFDF5] rounded-lg shadow-md w-full">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#254222] mb-2 leading-tight">
          Selamat datang di <span className="text-[#99cc66]">{storeName}</span>!
        </h1>
        {ownerName && ( // NEW: Tampilkan tagline jika ownerName ada
          <p className="text-lg sm:text-xl text-[#254222] font-medium opacity-80 mb-4 font-serif">
            by <span className="text-[#6699cc] font-bold">{ownerName}</span>
          </p>
        )}
        <p className="text-base sm:text-lg md:text-xl text-[#254222] mb-6 max-w-3xl mx-auto">
          Jelajahi keajaiban kearifan lokal! Di <strong className="font-bold">{storeName}</strong>, setiap produk bukan hanya sebuah barang, melainkan cerita dan dedikasi UMKM Indonesia. Mari bersatu mendukung ekonomi lokal, temukan produk unik, dan rasakan kepuasan berbelanja dengan hati!
        </p>
        <button
          onClick={navigateToProductListing}
          className="inline-flex items-center px-6 py-3 text-lg sm:px-8 sm:py-4 sm:text-xl bg-[#6699cc] text-[#FFFDF5] font-bold rounded-lg shadow-lg
                     hover:bg-[#5a8bbd] transform transition-transform duration-300 active:scale-95"
        >
          Mulai Jelajahi Produk Kami!
          <ArrowRight className="ml-3 w-5 h-5" />
        </button>
      </div>

      {/* Bagian Produk Pilihan / Semua Produk */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254222] mb-8 mt-8 text-center">
        Produk Unggulan Kami
      </h2>

      {/* Tabs untuk Filtering Kategori (Dynamic & Mobile-friendly) */}
      <div className="flex justify-center mb-8 border-b-2 border-[#b9e07f] w-full max-w-2xl overflow-x-auto whitespace-nowrap px-4 sm:px-0 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleTabClick(category)}
            className={`flex-shrink-0 py-3 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-medium rounded-t-lg transition-colors duration-300
                        ${activeTab === category ? 'border-b-4 border-[#6699cc] text-[#6699cc] font-bold' : 'text-[#254222] hover:text-[#6699cc]'}`}
          >
            {category === 'all' ? 'Semua' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="col-span-full text-center text-[#254222] text-xl p-4">Tidak ada produk ditemukan. Tambahkan produk dari halaman admin!</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 p-2 sm:p-0">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))
          ) : (
            <div className="col-span-full text-center text-[#254222] text-xl p-4">
              Tidak ada produk ditemukan untuk kategori ini.
            </div>
          )}
        </div>
      )}

      {/* Footer Call to Action */}
      <div className="text-center mt-12 p-6 bg-[#FFFDF5] rounded-lg shadow-md w-full">
        <p className="text-xl sm:text-2xl lg:text-3xl text-[#254222] mb-4 font-semibold">
          Siap untuk menemukan permata tersembunyi UMKM?
        </p>
        <button
          onClick={navigateToProductListing}
          className="inline-flex items-center px-6 py-3 bg-[#99cc66] text-[#FFFDF5] text-lg sm:px-8 sm:py-4 sm:text-xl font-bold rounded-lg shadow-md
                     hover:bg-[#7aaf4f] transform transition-transform duration-300 active:scale-95"
        >
          Lihat Koleksi Lengkap
          <ArrowRight className="ml-3 w-5 h-5" />
        </button>
      </div>

      {/* Bagian Kontak - Diperbarui Estetika dan Informasi Dinamis */}
      <div className="text-center mt-12 p-6 sm:p-8 bg-gradient-to-br from-[#E0EFCF] to-[#B9E07F] rounded-xl shadow-2xl w-full max-w-3xl mx-auto border border-[#A7CD6B]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#254222] mb-6">
          Mari Terhubung!
        </h2>
        <p className="text-base sm:text-lg text-[#254222] mb-8 leading-relaxed max-w-xl mx-auto">
          Punya pertanyaan, saran, atau ingin berkolaborasi? Jangan ragu untuk menghubungi tim ramah kami!
        </p>
        <div className="flex justify-center items-center"> {/* NEW: Menghapus flex-col sm:flex-row dan gap, menyesuaikan untuk satu tombol */}
          <a
            href={`https://wa.me/${adminWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#254222] text-white font-bold rounded-full shadow-lg text-base sm:text-lg transition-all duration-300 transform
                       hover:scale-105 hover:bg-[#3d6339] focus:outline-none focus:ring-4 focus:ring-[#254222] focus:ring-opacity-50
                       group relative overflow-hidden"
          >
            <Phone className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative z-10">WhatsApp Kami</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </a>
          {/* NEW: Tombol email dihapus sesuai permintaan */}
        </div>
      </div>

      {/* Animasi untuk notifikasi */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out forwards;
        }
        /* Hide scrollbar for aesthetic purposes, but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}

export default HomePage;