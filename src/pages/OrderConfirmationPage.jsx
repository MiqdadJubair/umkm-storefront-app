// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Impor db
import { doc, getDoc } from 'firebase/firestore'; // Impor doc dan getDoc

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [storeSettings, setStoreSettings] = useState({ // State untuk pengaturan toko
    adminWhatsApp: '',
    bankAccountNumber: '',
    bankAccountName: '',
    bankName: ''
  });
  const [loadingSettings, setLoadingSettings] = useState(true); // State loading untuk pengaturan toko
  const [copyMessage, setCopyMessage] = useState(''); // State untuk pesan salin
  const [initialLoadError, setInitialLoadError] = useState(false); // State untuk error load awal

  useEffect(() => {
    // Ambil detail pesanan dari state navigasi
    if (location.state && location.state.orderDetails && location.state.orderId) {
      setOrderDetails(location.state.orderDetails);
      setOrderId(location.state.orderId);
      setInitialLoadError(false); // Reset error jika data ditemukan
    } else {
      // Jika tidak ada data pesanan, tampilkan pesan dan arahkan kembali
      setInitialLoadError(true);
      const timer = setTimeout(() => {
        navigate('/products');
      }, 3000); // Tunggu 3 detik sebelum redirect
      return () => clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
    }

    // Ambil pengaturan toko dari Firestore
    const fetchStoreSettings = async () => {
      try {
        const settingsDocRef = doc(db, 'storeSettings', 'general');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          setStoreSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching store settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchStoreSettings();
  }, [location.state, navigate]);

  // Fungsi untuk menyalin teks ke clipboard
  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy'); // Metode yang kompatibel di iframe Canvas
    document.body.removeChild(el);
    setCopyMessage('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopyMessage(''), 3000); // Hapus pesan setelah 3 detik
  };

  if (initialLoadError) {
    // Tampilkan pesan error jika detail pesanan tidak ditemukan, sebelum redirect
    return (
      <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter bg-[#d9ecb1] rounded-lg shadow-lg max-w-2xl mx-auto my-10">
        Detail pesanan tidak ditemukan. Mengalihkan ke halaman produk...
      </div>
    );
  }

  if (!orderDetails || loadingSettings) {
    // Ini akan ditampilkan saat data belum dimuat atau pengaturan belum dimuat
    // Menggunakan main-accent
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat detail konfirmasi pesanan...</div>;
  }

  // Gunakan data pengaturan toko yang dinamis
  const adminBankDetails = {
    accountNumber: storeSettings.bankAccountNumber || 'N/A',
    accountName: storeSettings.bankAccountName || 'N/A',
    bankName: storeSettings.bankName || 'N/A'
  };
  const adminWhatsAppNumber = storeSettings.adminWhatsApp || ''; // Ambil dari pengaturan

  // Persiapkan link WhatsApp
  let waLink = '';
  let whatsappButtonText = '';

  if (orderDetails.paymentMethod === 'bankTransfer' || orderDetails.paymentMethod === 'eWallet') {
    const paymentType = orderDetails.paymentMethod === 'bankTransfer' ? 'Transfer Bank' : 'E-Wallet';
    const prefilledWAMessage = encodeURIComponent(
      `Halo admin, saya ${orderDetails.customerInfo?.name || 'Pelanggan'} ingin konfirmasi pembayaran untuk pesanan #${orderId} dengan metode ${paymentType}. Total pembayaran Rp ${orderDetails.totalAmount.toLocaleString('id-ID')}.`
    );
    waLink = `https://wa.me/${adminWhatsAppNumber}?text=${prefilledWAMessage}`;
    whatsappButtonText = 'Konfirmasi & Kirim Bukti Transfer';
  } else if (orderDetails.paymentMethod === 'cod') {
    const prefilledWAMessage = encodeURIComponent(
      `Halo admin, saya ${orderDetails.customerInfo?.name || 'Pelanggan'} telah membuat pesanan COD #${orderId}. Mohon diproses.`
    );
    waLink = `https://wa.me/${adminWhatsAppNumber}?text=${prefilledWAMessage}`;
    whatsappButtonText = 'Hubungi Admin untuk COD';
  }

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-4 sm:p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-2xl text-center font-inter my-10">
      {/* Pesan Salin */}
      {copyMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#6699cc] text-white px-4 py-2 rounded-md shadow-md z-50 transition-opacity duration-300 opacity-100">
          {copyMessage}
        </div>
      )}

      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-4">Pesanan Berhasil Dibuat! 🎉</h1>
      {/* Menggunakan dark-neutral */}
      <p className="text-lg text-[#254222] mb-6">Terima kasih telah berbelanja di UMKM Storefront.</p>

      {/* Detail Pesanan Anda Section */}
      {/* Menggunakan background #FFFDF5 dan border secondary-neutral */}
      <div className="bg-[#FFFDF5] border border-[#cae4c5] p-6 rounded-lg mb-8 text-left shadow-sm">
        {/* Menggunakan dark-neutral */}
        <h2 className="text-xl font-semibold text-[#254222] mb-4 pb-3 border-b border-[#cae4c5]">Detail Pesanan Anda:</h2>
        {/* Menggunakan dark-neutral untuk teks */}
        <p className="text-[#254222] mb-2"><strong>ID Pesanan:</strong> <span className="font-mono bg-gray-100 text-[#254222] px-2 py-1 rounded-md text-sm break-all select-all">{orderId}</span></p>
        <p className="text-[#254222] mb-2"><strong>Nama Pelanggan:</strong> {orderDetails.customerInfo?.name}</p>
        <p className="text-[#254222] mb-2"><strong>Metode Pembayaran:</strong> 
          {orderDetails.paymentMethod === 'bankTransfer' ? 'Transfer Bank' :
           orderDetails.paymentMethod === 'eWallet' ? 'E-Wallet' :
           orderDetails.paymentMethod === 'cod' ? 'Cash On Delivery (COD)' : 'N/A'}
        </p>
        <p className="text-[#254222] mt-3"><strong>Alamat Pengiriman:</strong> {orderDetails.customerInfo?.address}</p>

        {/* Ringkasan Biaya */}
        {/* Menggunakan dark-neutral */}
        <h3 className="text-lg font-semibold text-[#254222] mt-6 mb-3 pb-2 border-b border-[#cae4c5]">Ringkasan Biaya:</h3>
        <div className="space-y-2">
          {/* Menggunakan dark-neutral */}
          <div className="flex justify-between text-[#254222]">
            <span>Subtotal:</span>
            <span>Rp {orderDetails.subtotal ? orderDetails.subtotal.toLocaleString('id-ID') : 'N/A'}</span>
          </div>
          {/* Menggunakan dark-neutral */}
          <div className="flex justify-between text-[#254222]">
            <span>Biaya Pengiriman:</span>
            <span>Rp {orderDetails.deliveryFee ? orderDetails.deliveryFee.toLocaleString('id-ID') : 'N/A'}</span>
          </div>
          {/* Total Pembayaran, menggunakan main-accent (#99cc66) untuk menonjol, dengan border dark-neutral */}
          <div className="flex justify-between text-xl font-bold text-[#99cc66] border-t pt-3 mt-3 border-[#254222]">
            <span>Total Pembayaran:</span>
            <span>Rp {orderDetails.totalAmount ? orderDetails.totalAmount.toLocaleString('id-ID') : 'N/A'}</span>
          </div>
        </div>

        {/* Item Pesanan */}
        {/* Menggunakan dark-neutral */}
        <h3 className="text-lg font-semibold text-[#254222] mt-6 mb-3 pb-2 border-b border-[#cae4c5]">Item Pesanan:</h3>
        <ul className="list-disc pl-5 mb-4 max-h-48 overflow-y-auto pr-2">
          {orderDetails.items && orderDetails.items.length > 0 ? (
            orderDetails.items.map((item, index) => (
              // Menggunakan dark-neutral
              <li key={index} className="text-[#254222] text-sm py-0.5">
                {item.name} (x{item.quantity}) - Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </li>
            ))
          ) : (
            // Menggunakan dark-neutral
            <li className="text-[#254222] text-sm">Tidak ada item dalam pesanan ini.</li>
          )}
        </ul>

        {(orderDetails.paymentMethod === 'bankTransfer' || orderDetails.paymentMethod === 'eWallet') && (
          // Background #FFFDF5, border main-accent
          <div className="mt-6 bg-[#f7fdf5] border border-[#99cc66] p-4 rounded-lg shadow-sm">
            {/* Menggunakan dark-neutral */}
            <h3 className="text-lg font-semibold text-[#254222] mb-3">Instruksi Pembayaran:</h3>
            {orderDetails.paymentMethod === 'bankTransfer' && (
              <>
                <p className="text-[#254222] text-base mb-2">Mohon transfer total sebesar <span className="font-bold">Rp {orderDetails.totalAmount.toLocaleString('id-ID')}</span> ke rekening berikut:</p>
                {/* Menggunakan dark-neutral untuk nomor rekening */}
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-3">
                  <span className="text-[#254222] text-xl font-bold break-all select-all flex-1 pr-2">
                    {adminBankDetails.accountNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(adminBankDetails.accountNumber)}
                    // Tombol salin biru (#6699cc)
                    className="py-1.5 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                               bg-[#6699cc] text-white hover:bg-[#5588bb] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
                  >
                    Salin
                  </button>
                </div>
                {/* Menggunakan dark-neutral */}
                <p className="text-[#254222] text-base">A.N. <span className="font-medium">{adminBankDetails.accountName}</span> ({adminBankDetails.bankName})</p>
              </>
            )}

            {orderDetails.paymentMethod === 'eWallet' && (
              <>
                <p className="text-[#254222] text-base mb-2">Mohon transfer total sebesar <span className="font-bold">Rp {orderDetails.totalAmount.toLocaleString('id-ID')}</span> ke E-Wallet berikut:</p>
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-3">
                    {/* Placeholder for actual E-wallet number */}
                    <span className="text-[#254222] text-xl font-bold break-all select-all flex-1 pr-2">
                      [Nomor E-Wallet Anda]
                    </span>
                    <button
                      onClick={() => copyToClipboard("[Nomor E-Wallet Anda]")} // Replace with actual e-wallet number
                      className="py-1.5 px-3 rounded-md text-sm font-semibold transition-colors duration-300 transform active:scale-95
                                 bg-[#6699cc] text-white hover:bg-[#5588bb] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
                    >
                      Salin
                    </button>
                  </div>
                  <p className="text-[#254222] text-base">Atas nama: [Nama Pemilik E-Wallet Anda]</p>
                  <p className="text-[#254222] text-base">Penyedia: [Nama E-Wallet seperti GoPay/OVO/DANA]</p>
                  <p className="text-sm text-gray-500 mt-2">*(Informasi E-Wallet ini adalah placeholder, perlu diisi di database `storeSettings`)*</p>
              </>
            )}
            {/* Menggunakan dark-neutral */}
            <p className="text-[#254222] mt-4 text-base">Setelah transfer, mohon konfirmasi pembayaran Anda melalui WhatsApp dengan menekan tombol di bawah:</p>
          </div>
        )}

        {orderDetails.paymentMethod === 'cod' && (
          // Background #FFFDF5, border secondary-neutral
          <div className="mt-6 bg-[#f7fdf5] border border-[#cae4c5] p-4 rounded-lg shadow-sm">
            {/* Menggunakan dark-neutral */}
            <h3 className="text-lg font-semibold text-[#254222] mb-3">Instruksi Pembayaran Cash On Delivery (COD):</h3>
            {/* Menggunakan dark-neutral */}
            <p className="text-[#254222] text-base">Pesanan Anda akan segera diproses. Mohon siapkan pembayaran sebesar <span className="font-bold">Rp {orderDetails.totalAmount.toLocaleString('id-ID')}</span> saat kurir tiba di alamat pengiriman Anda.</p>
            <p className="text-[#254222] mt-4 text-base">Anda dapat menghubungi admin untuk info lebih lanjut:</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        {waLink && adminWhatsAppNumber ? ( // Tampilkan tombol WA hanya jika link dan nomor WA admin ada
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            // Tombol utama: bg main-accent, teks dark-neutral, dengan hover mengisi. Disesuaikan untuk ukuran sedang
            className="flex-1 py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                       bg-[#99cc66] text-[#254222] hover:bg-[#77a04f] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50
                       inline-flex items-center justify-center min-w-[200px] shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.45 0-9.9 4.45-9.9 9.9 0 1.76.46 3.44 1.35 4.93L2.05 22l5.14-1.35c1.49.89 3.17 1.35 4.93 1.35 5.45 0 9.9-4.45 9.9-9.9S17.49 2 12.04 2zm5.78 14.15l-.46-.77c-.24-.39-.77-.48-1.15-.24l-1.39.81c-.15.09-.32.14-.5.14-.49 0-.9-.23-1.1-.64l-1.25-2.06c-.4-.66-.2-1.51.46-1.92l.77-.46c.39-.24.48-.77.24-1.15l-.81-1.39c-.09-.15-.14-.32-.14-.5 0-.49.23-.9.64-1.1l2.06-1.25c.4.66.2 1.51-.46 1.92l.46.77c.24.39.77.48 1.15.24l1.39-.81c.15-.09.32-.14.5-.14.49 0 .9.23 1.1.64l1.25 2.06c.4.66.2 1.51-.46 1.92l-.77.46c-.39.24-.48.77-.24 1.15l.81 1.39c.09.15.14.32.14.5 0 .49-.23.9-.64 1.1l-2.06 1.25z"/>
            </svg>
            {whatsappButtonText}
          </a>
        ) : null}
        <button
          onClick={() => navigate('/products')}
          // Tombol outline dark-neutral
          className="flex-1 py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5]
                     inline-flex items-center justify-center min-w-[200px] shadow-md focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50"
        >
          Lanjut Belanja
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
