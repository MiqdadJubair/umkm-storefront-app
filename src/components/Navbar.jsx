// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState('UMKM Storefront');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol status buka/tutup menu mobile

  useEffect(() => {
    // Fungsi untuk mengambil nama toko dari Firestore
    const fetchStoreName = async () => {
      try {
        const settingsDocRef = doc(db, 'storeSettings', 'general');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data().storeName) {
          // Jika nama toko ada di Firestore, tambahkan ' Storefront'
          setStoreName(docSnap.data().storeName + ' Storefront');
        } else {
          // Kembali ke nama default jika tidak ditemukan
          setStoreName('UMKM Storefront');
        }
      } catch (error) {
        // Log kesalahan jika pengambilan gagal, dan gunakan nama default
        console.error("Error fetching store name for Navbar:", error);
        setStoreName('UMKM Storefront');
      }
    };

    // Dengarkan perubahan status autentikasi
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Perbarui status user
      setLoadingUser(false); // Atur loading menjadi false setelah status user ditentukan
    });

    fetchStoreName(); // Panggil fetchStoreName saat komponen dipasang
    return () => unsubscribe(); // Bersihkan listener status auth saat komponen dilepas
  }, []); // Array dependensi kosong berarti efek ini berjalan sekali saat dipasang

  // Fungsi untuk menangani logout pengguna
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logout pengguna
      console.log('Anda berhasil logout.'); // Log sukses (ganti dengan UI kustom jika diperlukan)
      navigate('/admin/login'); // Arahkan ke halaman login setelah logout
      setIsOpen(false); // Tutup menu mobile setelah logout
    } catch (error) {
      console.error("Error logging out:", error.message); // Log pesan kesalahan
      console.error('Gagal logout. Silakan coba lagi.'); // Log kegagalan (ganti dengan UI kustom jika diperlukan)
    }
  };

  // Fungsi untuk mengganti status buka/tutup menu mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Kontainer Navbar dengan Tailwind CSS untuk styling
    // Warna latar belakang: #254222 (hijau gelap), Warna teks: #ece2b1 (krem muda)
    // Shadow dan font-inter diterapkan secara global
    <nav className="bg-[#254222] p-4 text-[#ece2b1] shadow-md font-inter">
      <div className="container mx-auto flex justify-between items-center">
        {/* Nama Toko/Logo - Link ke Beranda */}
        <Link to="/" className="text-2xl font-bold hover:text-[#cae4c5] transition-colors" onClick={() => setIsOpen(false)}>
          {storeName}
        </Link>

        {/* Tombol Hamburger untuk Mobile (muncul hanya di layar kecil) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#ece2b1] focus:outline-none">
            {isOpen ? (
              // Icon 'X' saat menu terbuka
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Icon Hamburger saat menu tertutup
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigasi Utama untuk Desktop (tersembunyi di mobile, ditampilkan sebagai flex di md ke atas) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-[#cae4c5] transition-colors">Beranda</Link>
          <Link to="/products" className="hover:text-[#cae4c5] transition-colors">Produk</Link>
          <Link to="/cart" className="hover:text-[#cae4c5] transition-colors">Keranjang</Link>

          {!loadingUser && (
            user ? (
              <>
                {/* Admin Dashboard Link - Border hanya di desktop (md:border-2) */}
                <Link
                  to="/admin/dashboard"
                  className="py-1 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent md:border-2 md:border-[#cae4c5] text-[#cae4c5] hover:bg-[#cae4c5] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#cae4c5] focus:ring-opacity-50"
                >
                  Dashboard Admin
                </Link>
                {/* Logout Button - Border hanya di desktop (md:border-2) */}
                <button
                  onClick={handleLogout}
                  className="py-1 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent md:border-2 md:border-red-400 text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="hover:text-[#cae4c5] transition-colors">Login Admin</Link>
            )
          )}
        </div>
      </div>

      {/* Menu Mobile (muncul hanya di layar kecil saat isOpen true) */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 flex flex-col items-end"> {/* align items to end */}
          <Link to="/" className="block py-2 hover:text-[#cae4c5] transition-colors w-full text-right" onClick={toggleMenu}>Beranda</Link>
          <Link to="/products" className="block py-2 hover:text-[#cae4c5] transition-colors w-full text-right" onClick={toggleMenu}>Produk</Link>
          <Link to="/cart" className="block py-2 hover:text-[#cae4c5] transition-colors w-full text-right" onClick={toggleMenu}>Keranjang</Link>

          {!loadingUser && (
            user ? (
              <>
                {/* Admin Dashboard Link - TANPA border di mobile */}
                <Link
                  to="/admin/dashboard"
                  className="block py-2 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent text-[#cae4c5] hover:bg-[#cae4c5] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#cae4c5] focus:ring-opacity-50 w-full text-right"
                  onClick={toggleMenu}
                >
                  Dashboard Admin
                </Link>
                {/* Logout Button - TANPA border di mobile */}
                <button
                  onClick={handleLogout}
                  className="block py-2 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 w-full text-right"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="block py-2 hover:text-[#cae4c5] transition-colors w-full text-right" onClick={toggleMenu}>Login Admin</Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
