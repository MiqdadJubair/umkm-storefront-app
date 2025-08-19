// src/pages/ProductListingPage.jsx
import usePageTitle from '../hooks/usePageTitle.js';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.js'; // Pastikan path ini benar!
import ProductCard from '../components/ProductCard.jsx'; // Pastikan path ini benar!

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // State untuk kategori aktif
  const [availableCategories, setAvailableCategories] = useState([]); // State untuk kategori yang tersedia dari Firestore
  const [error, setError] = useState(null);
  // NEW: Panggil usePageTitle
  usePageTitle("Daftar Produk");

  // useEffect pertama: Mengambil daftar kategori unik dari semua produk di Firestore
  // Ini memastikan tab kategori yang ditampilkan dinamis berdasarkan data yang ada.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const categoriesSet = new Set(['all']); // Selalu mulai dengan 'all'

        querySnapshot.docs.forEach(doc => {
          const productData = doc.data();
          // NEW: Ambil array 'categories' dari produk
          // Pastikan itu array, lalu tambahkan setiap kategori ke set
          if (productData.categories && Array.isArray(productData.categories)) {
            productData.categories.forEach(cat => {
              categoriesSet.add(String(cat).toLowerCase()); // Pastikan kategori di-lowercase
            });
          } else {
            // Fallback jika ada produk lama tanpa field 'categories' atau bukan array
            // Atau jika Anda ingin secara eksplisit menambahkan "uncategorized" sebagai opsi
            // categoriesSet.add('uncategorized');
          }
        });
        setAvailableCategories(Array.from(categoriesSet));
      } catch (err) {
        console.error("ERROR: Gagal mengambil kategori unik:", err);
        setError("Gagal memuat kategori.");
      }
    };
    fetchCategories();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  // useEffect kedua: Mengambil produk berdasarkan kategori yang dipilih
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let productsQuery = collection(db, 'products');

        // Jika kategori bukan 'all', tambahkan filter where
        if (selectedCategory !== 'all') {
          // NEW: Query Firestore untuk memfilter berdasarkan array 'categories'
          // Menggunakan 'array-contains' untuk mencari produk yang array categories-nya mengandung selectedCategory
          productsQuery = query(productsQuery, where('categories', 'array-contains', selectedCategory));
        }

        const querySnapshot = await getDocs(productsQuery);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Pastikan product.categories yang disimpan di state juga array
          categories: (doc.data().categories && Array.isArray(doc.data().categories)) ? doc.data().categories.map(cat => String(cat).toLowerCase()) : ['uncategorized'],
        }));
        setProducts(productsData);
      } catch (err) {
        console.error("ERROR: Gagal mengambil produk:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    // Panggil fetchProducts hanya jika availableCategories sudah dimuat
    if (availableCategories.length > 0) {
      fetchProducts();
    }
  }, [selectedCategory, availableCategories]); // Ambil ulang produk setiap kali kategori atau kategori yang tersedia berubah

  if (error) {
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-7xl font-inter">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#254222] mb-6 text-center">Jelajahi Produk Kami</h1>

      {/* Tabs Kategori - Responsif */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {availableCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            // Desain tombol disesuaikan untuk responsif
            className={`py-2 px-4 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-300 transform active:scale-95
              ${selectedCategory === cat
                ? 'bg-[#99cc66] text-[#254222] shadow-md' // Style untuk tab aktif
                : 'bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#d9ecb1]' // Style untuk tab tidak aktif
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Mengubah huruf pertama menjadi kapital */}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat produk...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-[#254222] text-lg">Tidak ada produk dalam kategori ini.</p>
          ) : (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
