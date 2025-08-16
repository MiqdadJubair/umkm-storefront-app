// src/pages/ProductListingPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ProductListingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [stockFilter, setStockFilter] = useState(searchParams.get('stock') || 'all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);

        const uniqueCategories = [...new Set(productsData.map(product => product.category).filter(Boolean))];
        setCategories(['all', ...uniqueCategories]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setStockFilter(searchParams.get('stock') || 'all');
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleStockFilterChange = (e) => {
    const value = e.target.value;
    setStockFilter(value);
    if (value === 'all') {
      searchParams.delete('stock');
    } else {
      searchParams.set('stock', value);
    }
    setSearchParams(searchParams);
  };

  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase())) &&
    (stockFilter === 'all' || 
     (stockFilter === 'available' && (product.stock && product.stock > 0)) ||
     (stockFilter === 'out-of-stock' && (product.stock === 0)))
  );

  if (sortOption === 'priceAsc') {
    filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === 'priceDesc') {
    filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortOption === 'nameAsc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'nameDesc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];

  if (loading) {
    // Menggunakan nilai hex langsung untuk warna loading
    return <div className="text-center text-xl font-semibold text-[#99cc66] font-inter">Memuat produk...</div>;
  }

  if (error) {
    // Menggunakan warna bawaan Tailwind (merah)
    return <div className="text-center text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    // Menggunakan background #d9ecb1 (lebih terang dari primary-background)
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl font-inter">
      <h2 className="text-3xl font-bold text-[#254222] mb-6 text-center">
        Semua Produk Aplikasi
      </h2>

      {/* Tombol Navigasi Cepat di atas daftar produk */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          // Tombol outline sesuai palet kita: dark-neutral dengan hover ke dark-neutral + primary-background
          className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50"
        >
          Kembali
        </button>
        <button
          onClick={() => navigate('/cart')}
          // Tombol outline main-accent
          className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
        >
          Lihat Keranjang
        </button>
      </div>

      {/* Input Pencarian, Dropdown Sortir, dan Filter Kategori */}
      <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Cari produk berdasarkan nama..."
          value={searchTerm}
          onChange={handleSearchChange}
          // Fokus ring dan border menggunakan main-accent, background #FFFDF5
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300 bg-[#FFFDF5]"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          // Fokus ring dan border menggunakan main-accent, background #FFFDF5
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300 bg-[#FFFDF5]"
        >
          <option value="default">Urutkan Berdasarkan...</option>
          <option value="nameAsc">Nama (A-Z)</option>
          <option value="nameDesc">Nama (Z-A)</option>
          <option value="priceAsc">Harga (Termurah)</option>
          <option value="priceDesc">Harga (Termahal)</option>
        </select>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          // Fokus ring dan border menggunakan main-accent, background #FFFDF5
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300 bg-[#FFFDF5]"
        >
          <option value="all">Semua Kategori</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={handleStockFilterChange}
          // Fokus ring dan border menggunakan main-accent, background #FFFDF5
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300 bg-[#FFFDF5]"
        >
          <option value="all">Semua Stok</option>
          <option value="available">Tersedia</option>
          <option value="out-of-stock">Stok Habis</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-[#254222] text-lg">Tidak ada produk ditemukan.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
