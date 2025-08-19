// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { ArrowRight, Phone } from 'lucide-react'; // Hapus ChevronLeft, ChevronRight
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' akan jadi 'newest'
  const [storeName, setStoreName] = useState('UMKM Storefront');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // State untuk informasi kontak dinamis (dari Firestore) dan nama pemilik
  const [adminWhatsApp, setAdminWhatsApp] = useState('6281234567890');
  const [ownerName, setOwnerName] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Panggil usePageTitle
  usePageTitle("Beranda"); // Judul halaman utama

  // Fungsi untuk mengambil data produk, pengaturan toko, dan kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil pengaturan toko (store name, admin WhatsApp, owner name)
        const settingsDocRef = doc(db, 'storeSettings', 'general');
        const settingsDocSnap = await getDoc(settingsDocRef);
        let currentStoreName = 'UMKM Storefront';
        let currentOwnerName = '';

        if (settingsDocSnap.exists()) {
          const data = settingsDocSnap.data();
          currentStoreName = data.storeName ? `${data.storeName.replace(/\*\*/g, '').trim()} Storefront` : 'UMKM Storefront';
          setStoreName(currentStoreName);
          setAdminWhatsApp(data.adminWhatsApp || '6281234567890');
          currentOwnerName = data.ownerName ? data.ownerName.trim() : '';
          setOwnerName(currentOwnerName);
        }

        // Ambil produk (untuk filtering kategori)
        const productsCollectionRef = collection(db, 'products');
        
        // Query untuk mengambil SEMUA produk untuk filtering kategori
        const allProductsQuerySnapshot = await getDocs(productsCollectionRef);
        const allProductsData = allProductsQuerySnapshot.docs.map(doc => {
          const data = doc.data();
          const productCategories = (data.categories && Array.isArray(data.categories))
            ? data.categories.map(cat => String(cat).toLowerCase())
            : ['uncategorized']; // Fallback jika categories field tidak ada atau bukan array

          return {
            id: doc.id,
            ...data,
            categories: productCategories,
          };
        });
        setProducts(allProductsData); // Set semua produk untuk fitur filter kategori

        // Ekstrak kategori unik dari SEMUA produk
        const allProductCategoriesRaw = allProductsData.flatMap(product => product.categories || []);
        const uniqueCategories = new Set(allProductCategoriesRaw.filter(cat => cat !== 'uncategorized'));
        setCategories(['all', ...Array.from(uniqueCategories)]); // 'all' akan jadi 'Produk Terbaru'

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data for Home Page:", err);
        setError("Gagal memuat beranda. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter produk berdasarkan tab aktif (jika bukan 'all'/'Produk Terbaru')
  const filteredProducts = products.filter(product => {
    // Jika tab 'all' aktif, kita akan menampilkan produk terbaru (hingga 5)
    if (activeTab === 'all') {
      return true; // Semua produk akan dipertimbangkan, pengurutan dan pembatasan dilakukan nanti
    }
    // Filter berdasarkan kategori
    return product.categories && Array.isArray(product.categories) && product.categories.includes(activeTab);
  });

  // Logika untuk menampilkan produk terbaru (untuk tampilan kartu)
  // Mengambil hingga 5 produk terbaru dan mengurutkannya
  const latestProducts = [...products]
    .filter(product => product.createdAt) // Pastikan hanya produk dengan createdAt yang dipertimbangkan
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return dateB - dateA; // Urutkan dari terbaru ke terlama
    })
    .slice(0, 4); // Ambil hingga 4 produk terbaru

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddToCart = (product) => {
    if (!product || !product.id) {
        console.error("ERROR: Produk atau ID produk tidak valid untuk ditambahkan ke keranjang.", product);
        displayNotification("Produk tidak valid untuk ditambahkan.", 'error');
        return;
    }
    addToCart(product, 1);
    displayNotification(`"${product.name}" telah ditambahkan ke keranjang!`, 'success');
  };

  // Fungsi untuk notifikasi pop-up
  const displayNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setShowNotification(true);
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 3000);
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
        {ownerName && (
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
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b-2 border-[#b9e07f] w-full max-w-2xl px-4 sm:px-0">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleTabClick(category)}
            className={`flex-shrink-0 py-3 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-medium rounded-t-lg transition-colors duration-300
                        ${activeTab === category ? 'border-b-4 border-[#6699cc] text-[#6699cc] font-bold' : 'text-[#254222] hover:text-[#6699cc]'}`}
          >
            {category === 'all' ? 'Produk Terbaru' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="col-span-full text-center text-[#254222] text-xl p-4">Tidak ada produk ditemukan. Tambahkan produk dari halaman admin!</div>
      ) : (
        <>
          {/* Tampilkan produk terbaru atau produk berdasarkan kategori dalam tata letak kartu */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 p-2 sm:p-0">
            {activeTab === 'all' ? ( // Jika tab "Produk Terbaru" aktif
              latestProducts.length > 0 ? (
                latestProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))
              ) : (
                <div className="col-span-full text-center text-[#254222] text-xl p-4">Tidak ada produk terbaru yang tersedia.</div>
              )
            ) : ( // Jika tab kategori lainnya aktif
              filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))
              ) : (
                <div className="col-span-full text-center text-[#254222] text-xl p-4">
                  Tidak ada produk ditemukan untuk kategori ini.
                </div>
              )
            )}
          </div>
        </>
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
        <div className="flex justify-center items-center">
          <a
            href={`https://wa.me/${adminWhatsApp}?text=Salam%2C%20ka%20${ownerName || 'Admin'}%20dan%20Tim%20${storeName}%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20produk%20atau%20layanan%20kakak%20dan%20Tim.%20Bisakah%20saya%20mendapatkan%20informasi%20tentang%20[Mohon%20isi%20detail%20pertanyaan%20Anda%20di%20sini].%20Mohon%20bantuannya.%20Terima%20kasih.`}
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
      `}</style>
    </div>
  );
}

export default HomePage;
