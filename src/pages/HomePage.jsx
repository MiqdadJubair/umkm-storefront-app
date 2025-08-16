// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase/firebase'; // Impor instance Firestore
import { collection, getDocs } from 'firebase/firestore'; // Impor fungsi Firestore

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData); // Menampilkan semua produk untuk saat ini
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products for Home Page:", err);
        setError("Gagal memuat produk di beranda. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    // Menggunakan nilai hex langsung untuk warna
    return <div className="text-center text-xl font-semibold text-[#99cc66] font-inter">Memuat produk terbaru...</div>;
  }

  if (error) {
    // Menggunakan warna bawaan Tailwind
    return <div className="text-center text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    // Menggunakan nilai hex langsung untuk background dan teks
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#ece2b1] rounded-lg shadow-md max-w-6xl mx-auto font-inter">
      <h2 className="text-4xl font-extrabold text-[#254222] mb-4 text-center">
        Selamat Datang di Toko UMKM Favorit Anda!
      </h2>
      <p className="text-lg text-[#254222] mb-6 text-center">
        Temukan berbagai produk unik dan berkualitas tinggi dari UMKM lokal favorit. Aplikasi ini hadir untuk memudahkan pelanggan berbelanja dan mendukung usaha kecil di seluruh Indonesia.
      </p>

      {/* Area untuk menampilkan daftar produk */}
      {products.length === 0 ? (
        <div className="text-center text-[#254222] text-lg">Tidak ada produk ditemukan.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-6 text-md text-[#254222] text-center">
        Jelajahi kategori atau cari produk favorit sekarang juga!
      </p>
    </div>
  );
}

export default HomePage;
