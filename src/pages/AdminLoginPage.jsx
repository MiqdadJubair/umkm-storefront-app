// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // Impor instance auth dari firebase.js
import { signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from 'firebase/auth'; // Impor fungsi login dan reset password, serta setPersistence
import { useNavigate } from 'react-router-dom'; // Untuk navigasi setelah login
import usePageTitle from '../hooks/usePageTitle.js';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // State untuk pesan error login
  const navigate = useNavigate(); // Inisialisasi hook useNavigate
  // NEW: Panggil usePageTitle
  usePageTitle("Login");

  // Fungsi untuk menangani reset password
  const handlePasswordReset = async () => {
    const adminEmail = prompt("Masukkan email admin Anda untuk reset kata sandi:");
    if (adminEmail) {
      try {
        await sendPasswordResetEmail(auth, adminEmail);
        alert("Link reset kata sandi telah dikirim ke email Anda. Silakan periksa inbox.");
      } catch (error) {
        console.error("Error sending password reset email:", error.code, error.message);
        if (error.code === 'auth/user-not-found') {
          alert("Email tidak ditemukan. Pastikan Anda memasukkan email yang benar.");
        } else if (error.code === 'auth/invalid-email') {
          alert("Format email tidak valid.");
        } else {
          alert("Gagal mengirim link reset kata sandi. Silakan coba lagi nanti.");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Reset error message

    try {
      // Mengatur persistensi sesi ke SESSION. Sesi akan berakhir saat browser ditutup.
      await setPersistence(auth, browserSessionPersistence); // Atau browserLocalPersistence jika ingin sesi tetap ada

      // Coba login dengan email dan password
      await signInWithEmailAndPassword(auth, email, password);
      // Jika login berhasil, arahkan ke dashboard admin
      alert('Login Berhasil!'); // Sebagai ganti modal kustom
      navigate('/admin/dashboard');
    } catch (error) {
      // Tangani error login
      console.error("Error logging in:", error.code, error.message);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setLoginError('Email atau kata sandi salah. Silakan coba lagi.');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Format email tidak valid.');
      }
      else {
        setLoginError('Terjadi kesalahan saat login. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    // Latar belakang abu-abu terang
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Judul biru yang kuat */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Label teks lebih gelap */}
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@umkm.com"
              required
            />
          </div>
          <div>
            {/* Label teks lebih gelap */}
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password12345"
              required
            />
          </div>
          {loginError && (
            // Pesan error lebih merah
            <p className="text-red-600 text-xs italic text-center">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handlePasswordReset}
            // Tautan lebih biru
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold focus:outline-none transition-colors duration-200"
          >
            Lupa kata sandi?
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
