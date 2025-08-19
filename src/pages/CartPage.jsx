// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Impor useCart hook
import usePageTitle from '../hooks/usePageTitle.js';

function CartPage() {
  const navigate = useNavigate();
  // Dapatkan semua state dan fungsi dari useCart hook
  const { cartItems, updateQuantity, removeItem, calculateTotal } = useCart();

  // State untuk mengelola modal kustom
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('alert'); // Bisa 'alert' atau 'confirm'
  const [onConfirmAction, setOnConfirmAction] = useState(null); // Fungsi yang akan dijalankan saat konfirmasi
  // NEW: Panggil usePageTitle
  usePageTitle("Keranjang Belanja");

  // Fungsi untuk menampilkan modal kustom (baik alert maupun konfirmasi)
  const displayCustomModal = (message, type = 'alert', confirmAction = null) => {
    setModalMessage(message);
    setModalType(type);
    setOnConfirmAction(() => confirmAction); // Simpan fungsi untuk dieksekusi saat konfirmasi
    setShowModal(true);
  };

  // Handler untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setModalType('alert');
    setOnConfirmAction(null);
  };

  // Handler untuk melanjutkan ke halaman checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      displayCustomModal("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu!", 'alert');
      return;
    }
    navigate('/checkout'); // Arahkan ke halaman checkout
  };

  // Handler untuk konfirmasi penghapusan item
  const handleRemoveItemConfirm = (itemId) => {
    displayCustomModal(
      "Apakah Anda yakin ingin menghapus produk ini dari keranjang?",
      'confirm',
      () => {
        removeItem(itemId);
        displayCustomModal("Produk berhasil dihapus dari keranjang!", 'alert');
      }
    );
  };

  return (
    // Menggunakan background #d9ecb1 (lebih terang dari primary-background), font-inter
    <div className="container mx-auto p-4 sm:p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-4xl font-inter relative">
      {/* Custom Modal Component */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-[#254222] mb-4">Pemberitahuan</h3>
            <p className="text-[#254222] mb-6">{modalMessage}</p>
            {modalType === 'alert' ? (
              <button
                onClick={closeModal}
                className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                           bg-[#99cc66] text-[#254222] hover:bg-[#77a04f] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
              >
                Oke
              </button>
            ) : (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => { onConfirmAction(); closeModal(); }}
                  className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                             bg-[#99cc66] text-[#254222] hover:bg-[#77a04f] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity50"
                >
                  Ya
                </button>
                <button
                  onClick={closeModal}
                  className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                             bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  Tidak
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Keranjang Belanja Aplikasi</h1>

      {cartItems.length === 0 ? (
        // Menggunakan dark-neutral untuk teks saat keranjang kosong
        <div className="text-center text-[#254222] p-10">
          Keranjang aplikasi kosong. Yuk, mulai belanja!
          <div className="flex justify-center flex-wrap gap-4 mt-6"> {/* Use flex-wrap for smaller screens */}
            <button
              onClick={() => navigate(-1)} // Tombol Kembali ke halaman sebelumnya
              // Tombol outline dark-neutral dengan hover mengisi dan teks primary-background
              className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50"
            >
              Kembali
            </button>
            <button
              onClick={() => navigate('/products')}
              // Tombol outline main-accent dengan hover mengisi dan teks dark-neutral
              className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
            >
              Lihat Semua Produk
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              // Main item container: flex row, align items center, space between on larger, wrap on smaller
              <div key={item.id} className="flex flex-wrap sm:flex-nowrap items-center justify-between border-b-2 border-[#254222] pb-4 last:border-b-0">
                <img
                  src={item.imageUrl || `https://placehold.co/100x100/cccccc/333333?text=${item.name ? item.name.substring(0, 5) + '...' : 'Produk'}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0 flex-shrink-0" // mb for mobile
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/cccccc/333333?text=N/A`; }} // Fallback
                />
                <div className="flex-grow min-w-[140px] max-w-full sm:max-w-xs text-center sm:text-left mx-2 mb-4 sm:mb-0"> {/* Added min/max width, margin, and mb for mobile */}
                  <h3 className="text-lg font-semibold text-[#254222] line-clamp-2">{item.name}</h3> {/* Added line-clamp for long names */}
                  <p className="text-[#FFFDF5] bg-[#254222] inline-block px-2 py-1 rounded-md text-sm mt-1">Rp {item.price ? item.price.toLocaleString('id-ID') : 'N/A'}</p>
                </div>
                <div className="flex items-center space-x-2 mt-0 sm:mt-0 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"> {/* Align controls on full width for mobile */}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} // Menggunakan updateQuantity dari Context
                    className="px-3 py-1 rounded-md transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#99cc66] text-[#254222] hover:bg-[#99cc66] hover:text-[#254222]"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-[#254222]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} // Menggunakan updateQuantity dari Context
                    className="px-3 py-1 rounded-md transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#99cc66] text-[#254222] hover:bg-[#99cc66] hover:text-[#254222]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItemConfirm(item.id)} // Menggunakan fungsi konfirmasi kustom
                    className="py-1 px-3 rounded-md transition-colors duration-300 transform active:scale-95 ml-4
                               bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 pt-4 border-t-4 border-[#254222]"> {/* Garis total menjadi dark-neutral dan tebal */}
            <p className="text-xl font-bold text-[#254222]">Total: Rp {calculateTotal().toLocaleString('id-ID')}</p> {/* Menggunakan calculateTotal dari Context */}
            <div className="flex justify-end flex-wrap gap-3 mt-6"> {/* Adjusted gap and flex-wrap for smaller buttons */}
              <button
                onClick={() => navigate(-1)} // Tombol Kembali
                // Reduced size: py-2 px-5 text-lg
                className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50
                               bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5]"
              >
                Kembali
              </button>
              <button
                onClick={() => navigate('/products')} // Lanjut Belanja
                // Reduced size: py-2 px-5 text-lg
                className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50
                               bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222]"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={handleCheckout}
                // Reduced size: py-2 px-5 text-lg
                className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50
                               bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
              >
                Lanjutkan ke Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
