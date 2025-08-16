// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Impor useCart hook

function CartPage() {
  const navigate = useNavigate();
  // Dapatkan semua state dan fungsi dari useCart hook
  const { cartItems, updateQuantity, removeItem, calculateTotal } = useCart();

  // Handler untuk melanjutkan ke halaman checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu!");
      return;
    }
    navigate('/checkout'); // Arahkan ke halaman checkout
  };

  return (
    // Menggunakan background #d9ecb1 (lebih terang dari primary-background), font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-4xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Keranjang Belanja Aplikasi</h1>

      {cartItems.length === 0 ? (
        // Menggunakan dark-neutral untuk teks saat keranjang kosong
        <div className="text-center text-[#254222] p-10">
          Keranjang aplikasi kosong. Yuk, mulai belanja!
          <div className="flex justify-center space-x-4 mt-6">
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
              <div key={item.id} className="flex items-center border-b-2 border-[#254222] pb-4"> {/* Garis pemisah antar item lebih gelap */}
                <img
                  src={item.imageUrl || `https://placehold.co/100x100/cccccc/333333?text=${item.name ? item.name.substring(0, 5) + '...' : 'Produk'}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/cccccc/333333?text=N/A`; }} // Fallback
                />
                <div className="flex-grow">
                  {/* Menggunakan dark-neutral */}
                  <h3 className="text-lg font-semibold text-[#254222]">{item.name}</h3>
                  {/* Harga dengan background dark-neutral dan teks light krem (#FFFDF5) untuk kontras yang baik */}
                  <p className="text-[#FFFDF5] bg-[#254222] inline-block px-2 py-1 rounded-md text-sm">Rp {item.price ? item.price.toLocaleString('id-ID') : 'N/A'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} // Menggunakan updateQuantity dari Context
                    // Tombol kuantitas outline #99cc66 dengan teks dark-neutral, hover mengisi dan teks dark-neutral
                    className="px-3 py-1 rounded-md transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#99cc66] text-[#254222] hover:bg-[#99cc66] hover:text-[#254222]"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  {/* Menggunakan dark-neutral */}
                  <span className="text-lg font-medium text-[#254222]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} // Menggunakan updateQuantity dari Context
                    // Tombol kuantitas outline #99cc66 dengan teks dark-neutral, hover mengisi dan teks dark-neutral
                    className="px-3 py-1 rounded-md transition-colors duration-300 transform active:scale-95
                               bg-transparent border-2 border-[#99cc66] text-[#254222] hover:bg-[#99cc66] hover:text-[#254222]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => { // Menggunakan removeItem dari Context
                      if (window.confirm("Apakah Anda yakin ingin menghapus produk ini dari keranjang?")) {
                        removeItem(item.id);
                        alert("Produk berhasil dihapus dari keranjang!");
                      }
                    }}
                    // Tombol hapus outline merah
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
            {/* Menggunakan dark-neutral */}
            <p className="text-xl font-bold text-[#254222]">Total: Rp {calculateTotal().toLocaleString('id-ID')}</p> {/* Menggunakan calculateTotal dari Context */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => navigate(-1)} // Tombol Kembali
                // Tombol outline dark-neutral dengan hover mengisi dan teks primary-background
                className="py-3 px-8 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50
                           bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5]"
              >
                Kembali
              </button>
              <button
                onClick={() => navigate('/products')} // Lanjut Belanja
                // Tombol outline #6699cc dengan hover mengisi dan teks dark-neutral
                className="py-3 px-8 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50
                           bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222]"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={handleCheckout}
                // Tombol outline main-accent dengan hover mengisi dan teks dark-neutral
                className="py-3 px-8 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50
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
