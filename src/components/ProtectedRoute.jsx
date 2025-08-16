// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Impor instance auth
import { onAuthStateChanged } from 'firebase/auth'; // Impor fungsi untuk memantau status autentikasi

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memantau perubahan status autentikasi
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user jika ada, null jika tidak ada
      setLoading(false); // Selesai loading status autentikasi
    });

    // Membersihkan listener saat komponen dilepas
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Tampilkan loading state sementara menunggu status autentikasi
    return <div className="text-center p-8 text-xl font-semibold text-blue-600">Memverifikasi autentikasi...</div>;
  }

  // Jika tidak ada user (belum login), arahkan ke halaman login admin
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika user sudah login, tampilkan children (komponen yang dilindungi)
  return children;
}

export default ProtectedRoute;
