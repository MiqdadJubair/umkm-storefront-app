// src/pages/AdminSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase.js'; // Impor auth
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth'; // Impor updatePassword
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

function AdminSettingsPage() {
  const navigate = useNavigate();
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'UMKM Storefront', // Default value
    ownerName: '', // New field for owner's name
    ownerPhone: '', // New field for owner's phone number
    adminWhatsApp: '',
    bankAccountNumber: '',
    bankAccountName: '',
    bankName: '',
    // New E-wallet fields
    eWalletProvider: '', // e.g., Dana, GoPay, OVO
    eWalletNumber: '',
    eWalletAccountName: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // State untuk ubah kata sandi
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  // NEW: Panggil usePageTitle
  usePageTitle("Pengaturan Toko");


  // Dokumen settings akan disimpan dengan ID tetap 'general'
  const settingsDocRef = doc(db, 'storeSettings', 'general');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          // Merge data yang ada dengan default untuk memastikan semua field ada
          setStoreSettings(prev => ({ ...prev, ...docSnap.data() }));
        } else {
          // Jika dokumen belum ada, setel nilai default dan simpan
          // Pastikan semua field default terisi sebelum disimpan
          await setDoc(settingsDocRef, {
            storeName: 'UMKM Storefront',
            ownerName: '',
            ownerPhone: '',
            adminWhatsApp: '',
            bankAccountNumber: '',
            bankAccountName: '',
            bankName: '',
            eWalletProvider: '',
            eWalletNumber: '',
            eWalletAccountName: ''
          });
        }
      } catch (err) {
        console.error("Error fetching store settings:", err);
        setError("Gagal memuat pengaturan toko.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      await setDoc(settingsDocRef, storeSettings);
      setSuccessMessage('Pengaturan toko berhasil disimpan!');
    } catch (err) {
      console.error("Error saving store settings:", err);
      setError("Gagal menyimpan pengaturan toko.");
    } finally {
      setSaving(false);
    }
  };

  // Fungsi untuk menangani perubahan kata sandi
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess('');

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('Kata sandi baru tidak cocok.');
      return;
    }
    if (newPassword.length < 6) { // Firebase requires minimum 6 characters
      setPasswordChangeError('Kata sandi baru minimal 6 karakter.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setPasswordChangeSuccess('Kata sandi berhasil diperbarui!');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        // Ini seharusnya tidak terjadi jika ProtectedRoute bekerja,
        // tapi baik untuk penanganan error
        setPasswordChangeError('Tidak ada pengguna yang login.');
      }
    } catch (error) {
      console.error("Error changing password:", error.code, error.message);
      if (error.code === 'auth/requires-recent-login') {
        setPasswordChangeError('Untuk mengubah kata sandi, Anda perlu login ulang. Silakan logout dan login kembali.');
      } else {
        setPasswordChangeError('Gagal mengubah kata sandi. Silakan coba lagi.');
      }
    }
  };


  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    // Menggunakan main-accent
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat pengaturan toko...</div>;
  }

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-2xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Pengaturan Toko</h1>

      <div className="flex justify-start items-center mb-6">
        <button
          onClick={handleGoBack}
          // Tombol outline dark-neutral
          className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Kembali
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 transition-all duration-300" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 transition-all duration-300" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pengaturan Umum Toko */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-sm">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-xl font-semibold text-[#254222] mb-4">Informasi Umum Toko</h2>
          <div>
            {/* Menggunakan dark-neutral */}
            <label htmlFor="storeName" className="block text-[#254222] text-sm font-bold mb-2">
              Nama Toko (akan tampil sebagai "Nama Toko Storefront")
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={storeSettings.storeName}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: Sunshine"
              required
            />
          </div>
          <div className="mt-4">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="ownerName" className="block text-[#254222] text-sm font-bold mb-2">
              Nama Pemilik/Pengelola
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={storeSettings.ownerName}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div className="mt-4">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="ownerPhone" className="block text-[#254222] text-sm font-bold mb-2">
              Nomor Telepon Pemilik/Pengelola
            </label>
            <input
              type="tel"
              id="ownerPhone"
              name="ownerPhone"
              value={storeSettings.ownerPhone}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: 081234567890"
            />
          </div>
          <div className="mt-4">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="adminWhatsApp" className="block text-[#254222] text-sm font-bold mb-2">
              Nomor WhatsApp Admin (tanpa '+', mis: 62812...)
            </label>
            <input
              type="tel"
              id="adminWhatsApp"
              name="adminWhatsApp"
              value={storeSettings.adminWhatsApp}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: 6287774211370"
            />
          </div>
        </div>

        {/* Pengaturan Rekening Bank */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-sm">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-xl font-semibold text-[#254222] mb-4">Informasi Rekening Bank</h2>
          <div>
            {/* Menggunakan dark-neutral */}
            <label htmlFor="bankName" className="block text-[#254222] text-sm font-bold mb-2">
              Nama Bank
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={storeSettings.bankName}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: BCA"
            />
          </div>
          <div className="mt-4">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="bankAccountNumber" className="block text-[#254222] text-sm font-bold mb-2">
              Nomor Rekening Bank
            </label>
            <input
              type="text"
              id="bankAccountNumber"
              name="bankAccountNumber"
              value={storeSettings.bankAccountNumber}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: 1234567890"
            />
          </div>
          <div className="mt-4">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="bankAccountName" className="block text-[#254222] text-sm font-bold mb-2">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              id="bankAccountName"
              name="bankAccountName"
              value={storeSettings.bankAccountName}
              onChange={handleChange}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
        </div>

        {/* Pengaturan E-Wallet */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-sm">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-xl font-semibold text-[#254222] mb-4">Informasi E-Wallet</h2>
          <div>
            <label htmlFor="eWalletProvider" className="block text-[#254222] text-sm font-bold mb-2">
              Penyedia E-Wallet (mis. Dana, GoPay, OVO)
            </label>
            <input
              type="text"
              id="eWalletProvider"
              name="eWalletProvider"
              value={storeSettings.eWalletProvider}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: Dana"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="eWalletNumber" className="block text-[#254222] text-sm font-bold mb-2">
              Nomor E-Wallet
            </label>
            <input
              type="text"
              id="eWalletNumber"
              name="eWalletNumber"
              value={storeSettings.eWalletNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: 081234567890"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="eWalletAccountName" className="block text-[#254222] text-sm font-bold mb-2">
              Nama Akun E-Wallet
            </label>
            <input
              type="text"
              id="eWalletAccountName"
              name="eWalletAccountName"
              value={storeSettings.eWalletAccountName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
        </div>

        <button
          type="submit"
          // Tombol outline main-accent
          className="w-full py-3 px-6 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
          disabled={saving}
        >
          {saving ? 'Menyimpan Pengaturan...' : 'Simpan Pengaturan'}
        </button>
      </form>

      {/* Bagian Ubah Kata Sandi */}
      {/* Menggunakan background #FFFDF5 */}
      <div className="mt-10 bg-[#FFFDF5] p-6 rounded-lg shadow-sm">
        {/* Menggunakan dark-neutral */}
        <h2 className="text-xl font-semibold text-[#254222] mb-4">Ubah Kata Sandi Admin</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            {/* Menggunakan dark-neutral */}
            <label htmlFor="newPassword" className="block text-[#254222] text-sm font-bold mb-2">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>
          <div>
            {/* Menggunakan dark-neutral */}
            <label htmlFor="confirmNewPassword" className="block text-[#254222] text-sm font-bold mb-2">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              // Fokus ring dan border menggunakan main-accent
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              placeholder="Ketik ulang kata sandi baru"
              required
            />
          </div>
          {passwordChangeError && (
            <p className="text-red-600 text-xs italic text-center mt-2">{passwordChangeError}</p>
          )}
          {passwordChangeSuccess && (
            <p className="text-green-600 text-xs italic text-center mt-2">{passwordChangeSuccess}</p>
          )}
          <button
            type="submit"
            // Tombol outline biru (#6699cc)
            className="w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                        bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222]"
          >
            Ubah Kata Sandi
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
