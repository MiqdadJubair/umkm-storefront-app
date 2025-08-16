// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Impor useCart hook
import { db } from '../firebase/firebase'; // Impor instance Firestore
import { collection, addDoc } from 'firebase/firestore'; // Impor fungsi Firestore

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, clearCart } = useCart(); // Dapatkan item, total, dan fungsi clear dari keranjang

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '' // Opsional: catatan dari pelanggan
  });
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer'); // State untuk metode pembayaran
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = 20000; // Biaya pengiriman tetap

  // Handler untuk perubahan input formulir informasi pelanggan
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk perubahan metode pembayaran
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Fungsi validasi email sederhana
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Fungsi validasi nomor telepon (hanya angka)
  const isValidPhone = (phone) => {
    return /^\+?\d+$/.test(phone); // Memungkinkan '+' di awal
  };

  // Handler untuk submit pesanan
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(''); // Reset error sebelum submit

    if (cartItems.length === 0) {
      setError("Keranjang belanja kosong. Tidak dapat memproses pesanan.");
      return;
    }

    // Validasi input wajib (Nama, Telepon, Alamat)
    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      setError("Mohon lengkapi informasi wajib: Nama Lengkap, Nomor Telepon, dan Alamat Lengkap.");
      return;
    }

    // Validasi format email jika diisi
    if (customerInfo.email.trim() && !isValidEmail(customerInfo.email)) {
      setError("Format email tidak valid. Contoh: nama@domain.com");
      return;
    }

    // Validasi format nomor telepon
    if (!isValidPhone(customerInfo.phone)) {
      setError("Nomor telepon hanya boleh berisi angka (opsional diawali '+').");
      return;
    }

    setLoading(true);

    try {
      const subtotal = calculateTotal();
      const totalAmountWithDelivery = subtotal + deliveryFee; // Tambahkan biaya pengiriman
      
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl
      }));

      const newOrder = {
        customerInfo: customerInfo,
        items: orderItems,
        subtotal: subtotal, // Simpan subtotal
        deliveryFee: deliveryFee, // Simpan biaya pengiriman
        totalAmount: totalAmountWithDelivery, // Simpan total akhir
        status: 'Tertunda', // Status awal pesanan
        orderDate: new Date().toISOString(),
        paymentMethod: paymentMethod, // Tambahkan metode pembayaran ke pesanan
      };

      const ordersCollectionRef = collection(db, 'orders');
      const docRef = await addDoc(ordersCollectionRef, newOrder); // Ambil docRef untuk mendapatkan ID pesanan

      clearCart(); // Kosongkan keranjang setelah pesanan berhasil

      // Navigasi ke halaman konfirmasi dan kirim detail pesanan melalui state
      navigate('/order-confirmation', { 
        state: { 
          orderDetails: newOrder, 
          orderId: docRef.id 
        } 
      });

    } catch (err) {
      console.error("Error submitting order:", err);
      setError("Gagal membuat pesanan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Ini hanya jika keranjang kosong dan belum ada proses checkout yang sukses
  if (cartItems.length === 0) {
    return (
      // Menggunakan background #d9ecb1 dan font-inter
      <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-4xl text-center font-inter">
        {/* Menggunakan dark-neutral */}
        <h1 className="text-3xl font-bold text-[#254222] mb-6">Checkout</h1>
        {/* Menggunakan dark-neutral */}
        <p className="text-[#254222] text-lg">Keranjang belanja Anda kosong. Tidak ada yang perlu di-checkout.</p>
        <button
          onClick={() => navigate('/products')}
          // Tombol outline #6699cc dengan hover mengisi dan teks dark-neutral
          className="mt-6 py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222]"
        >
          Lanjut Belanja
        </button>
      </div>
    );
  }

  const subtotalAmount = calculateTotal();
  const finalTotalAmount = subtotalAmount + deliveryFee;

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-4xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Checkout Pesanan</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Konten formulir Checkout utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ringkasan Pesanan */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-sm">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-2xl font-semibold text-[#254222] mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              // Menggunakan dark-neutral
              <div key={item.id} className="flex justify-between items-center text-[#254222]">
                <span>{item.name} (x{item.quantity})</span>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          {/* Garis pemisah, menggunakan dark-neutral */}
          <div className="border-t-2 border-[#254222] mt-4 pt-4 flex justify-between items-center text-xl font-bold text-[#254222]">
            <span>Subtotal:</span>
            <span>Rp {subtotalAmount.toLocaleString('id-ID')}</span>
          </div>
          {/* Menggunakan dark-neutral */}
          <div className="mt-2 flex justify-between items-center text-xl font-bold text-[#254222]">
            <span>Biaya Pengiriman:</span>
            <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
          </div>
          {/* Total Pembayaran, menggunakan main-accent (#99cc66) untuk menonjol */}
          <div className="mt-2 flex justify-between items-center text-2xl font-bold text-[#99cc66] border-t pt-2 border-[#254222]">
            <span>Total Pembayaran:</span>
            <span>Rp {finalTotalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Formulir Informasi Pelanggan */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-sm">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-2xl font-semibold text-[#254222] mb-4">Informasi Pengiriman</h2>
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="name" className="block text-[#254222] text-sm font-bold mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="email" className="block text-[#254222] text-sm font-bold mb-2">Email (Opsional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Contoh: budi@email.com"
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="phone" className="block text-[#254222] text-sm font-bold mb-2">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                pattern="[0-9+]*"
                inputMode="tel"
                placeholder="Contoh: 081234567890 (hanya angka)"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="address" className="block text-[#254222] text-sm font-bold mb-2">Alamat Lengkap</label>
              <textarea
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                rows="3"
                placeholder="Contoh: Jl. Raya Bogor No. 123, Kel. ABC, Kec. XYZ, Kota Jakarta Timur"
                required
              ></textarea>
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="notes" className="block text-[#254222] text-sm font-bold mb-2">Catatan Tambahan (Opsional)</label>
              <textarea
                id="notes"
                name="notes"
                value={customerInfo.notes}
                onChange={handleCustomerInfoChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                rows="2"
                placeholder="Contoh: Titip ke satpam, jangan tekan bel."
              ></textarea>
            </div>
            {/* Menggunakan dark-neutral */}
            <h2 className="text-2xl font-semibold text-[#254222] mb-4 mt-6">Metode Pembayaran</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bankTransfer"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={paymentMethod === 'bankTransfer'}
                  onChange={handlePaymentMethodChange}
                  // Radio button dot, menggunakan main-accent
                  className="mr-2 h-4 w-4 text-[#99cc66] focus:ring-[#99cc66] border-gray-300 rounded"
                />
                {/* Menggunakan dark-neutral */}
                <label htmlFor="bankTransfer" className="text-[#254222] text-base">Transfer Bank</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="eWallet"
                  name="paymentMethod"
                  value="eWallet"
                  checked={paymentMethod === 'eWallet'}
                  onChange={handlePaymentMethodChange}
                  // Radio button dot, menggunakan main-accent
                  className="mr-2 h-4 w-4 text-[#99cc66] focus:ring-[#99cc66] border-gray-300 rounded"
                />
                {/* Menggunakan dark-neutral */}
                <label htmlFor="eWallet" className="text-[#254222] text-base">E-Wallet</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={handlePaymentMethodChange}
                  // Radio button dot, menggunakan main-accent
                  className="mr-2 h-4 w-4 text-[#99cc66] focus:ring-[#99cc66] border-gray-300 rounded"
                />
                {/* Menggunakan dark-neutral */}
                <label htmlFor="cod" className="text-[#254222] text-base">Cash On Delivery (COD)</label>
              </div>
            </div>
            <button
              type="submit"
              // Tombol outline main-accent dengan hover mengisi dan teks dark-neutral
              className="w-full py-3 px-6 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50
                         bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
              disabled={loading}
            >
              {loading ? 'Memproses Pesanan...' : 'Buat Pesanan Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
