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

  useEffect(() => {
    const fetchStoreName = async () => {
      try {
        const settingsDocRef = doc(db, 'storeSettings', 'general');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data().storeName) {
          setStoreName(docSnap.data().storeName + ' Storefront');
        } else {
          setStoreName('UMKM Storefront');
        }
      } catch (error) {
        console.error("Error fetching store name for Navbar:", error);
        setStoreName('UMKM Storefront');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });

    fetchStoreName();
    return () => unsubscribe();
  }, []);

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
    // Menggunakan kode heksadesimal langsung untuk background dan teks
    // Font tetap menggunakan 'font-inter' yang diimpor global
    <nav className="bg-[#254222] p-4 text-[#ece2b1] shadow-md font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-[#cae4c5] transition-colors">
          {storeName}
        </Link>

        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-[#cae4c5] transition-colors">Beranda</Link>
          <Link to="/products" className="hover:text-[#cae4c5] transition-colors">Produk</Link>
          <Link to="/cart" className="hover:text-[#cae4c5] transition-colors">Keranjang</Link>

          {!loadingUser && (
            user ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="py-1 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent border-2 border-[#cae4c5] text-[#cae4c5] hover:bg-[#cae4c5] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#cae4c5] focus:ring-opacity-50"
                >
                  Dashboard Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
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
    </nav>
  );
}

export default Navbar;
