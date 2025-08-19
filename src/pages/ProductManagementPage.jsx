// src/pages/ProductManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp
import { useNavigate, useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

// Import ikon dari lucide-react
import {
  ArrowLeft, Plus, Search, Filter, SortAsc, Edit, Trash2, Loader2,
  XCircle, CheckCircle, CircleHelp, Info, Package, DollarSign, Box, Image, Text, Weight, Globe, Tag
} from 'lucide-react';

function ProductManagementPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
    weight: '',
    origin: '',
    categoriesInput: '' // Menggunakan categoriesInput untuk string yang dipisahkan koma
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // State untuk filter & sortir
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState(searchParams.get('stock') || 'all');
  const [sortOption, setSortOption] = useState('default');
  const [categories, setCategories] = useState([]); // Daftar kategori unik untuk filter

  // Panggil usePageTitle
  usePageTitle("Manajemen Produk");

  // State untuk modal kustom
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);

  // State untuk mengontrol visibilitas filter di mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fungsi untuk mengambil data produk
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productsCollectionRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Pastikan 'categories' adalah array, jika tidak ada atau bukan, default ke array kosong
        const productCategories = (data.categories && Array.isArray(data.categories))
          ? data.categories.map(cat => String(cat).toLowerCase())
          : [];

        return {
          id: doc.id,
          ...data,
          categories: productCategories, // Pastikan product.categories adalah array
          // Tambahkan categoriesInput untuk mengisi form edit nanti (join array ke string)
          categoriesInput: productCategories.join(', ')
        };
      });
      setProducts(productsData);

      // Mengumpulkan semua kategori unik dari array 'categories' setiap produk
      const allProductCategories = productsData.flatMap(product => product.categories || []);
      const uniqueCategories = new Set(allProductCategories.filter(cat => cat !== 'uncategorized'));
      setCategories(['all', ...Array.from(uniqueCategories)]);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat produk. Silakan coba lagi nanti.");
      setLoading(false);
    }
  }, []); // Dependensi kosong karena tidak ada variabel eksternal yang dibutuhkan

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Memperbarui filter stok dari URL saat searchParams berubah
    setStockFilter(searchParams.get('stock') || 'all');
  }, [searchParams]);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const showModal = (type, message) => {
    setModalMessage(message);
    if (type === 'success') {
      setShowSuccessModal(true);
    } else if (type === 'error') {
      setShowErrorModal(true);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Validasi categoriesInput sebagai pengganti category
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.imageUrl || !newProduct.categoriesInput) {
      showModal('error', "Nama, Harga, Stok, URL Gambar, dan Kategori wajib diisi!");
      return;
    }

    try {
      // Proses categoriesInput menjadi array string
      const categoriesArray = newProduct.categoriesInput
        .split(',')
        .map(cat => cat.trim().toLowerCase())
        .filter(cat => cat !== ''); // Filter string kosong setelah trim

      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        categories: categoriesArray, // Simpan sebagai array
        createdAt: serverTimestamp(), // Tambahkan timestamp saat dibuat
        lastUpdated: serverTimestamp(), // Tambahkan timestamp update awal
        rating: 0, // Inisialisasi rating default
        reviews: 0 // Inisialisasi jumlah ulasan default
      };
      // Hapus field categoriesInput dari objek yang akan disimpan ke Firestore
      delete productToAdd.categoriesInput;

      const productsCollectionRef = collection(db, 'products');
      await addDoc(productsCollectionRef, productToAdd);
      showModal('success', 'Produk berhasil ditambahkan!');
      // Reset form
      setNewProduct({
        name: '', price: '', stock: '', imageUrl: '', description: '',
        weight: '', origin: '', categoriesInput: ''
      });
      setIsAddingProduct(false);
      fetchProducts(); // Refresh daftar produk
    } catch (err) {
      console.error("Error adding product:", err);
      showModal('error', "Gagal menambahkan produk. Silakan coba lagi.");
    }
  };

  const startEdit = (product) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(true); // Membuka formulir untuk edit
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description || '',
      weight: product.weight || '',
      origin: product.origin || '',
      // Konversi array categories menjadi string dipisahkan koma untuk input
      categoriesInput: (product.categories && Array.isArray(product.categories))
        ? product.categories.join(', ')
        : ''
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    // Validasi categoriesInput sebagai pengganti category
    if (!editingProduct.id || !newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.imageUrl || !newProduct.categoriesInput) {
      showModal('error', "Nama, Harga, Stok, URL Gambar, dan Kategori wajib diisi!");
      return;
    }

    try {
      // Proses categoriesInput menjadi array string
      const categoriesArray = newProduct.categoriesInput
        .split(',')
        .map(cat => cat.trim().toLowerCase())
        .filter(cat => cat !== ''); // Filter string kosong setelah trim

      const productDocRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productDocRef, {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        imageUrl: newProduct.imageUrl,
        description: newProduct.description || '',
        weight: newProduct.weight || '',
        origin: newProduct.origin || '',
        categories: categoriesArray, // Perbarui dengan array categories yang baru
        lastUpdated: serverTimestamp(), // Perbarui timestamp update
      });
      showModal('success', 'Produk berhasil diperbarui!');
      setEditingProduct(null);
      setIsAddingProduct(false);
      // Reset form
      setNewProduct({
        name: '', price: '', stock: '', imageUrl: '', description: '',
        weight: '', origin: '', categoriesInput: ''
      });
      fetchProducts(); // Refresh daftar produk
    } catch (err) {
      console.error("Error updating product:", err);
      showModal('error', "Gagal memperbarui produk. Silakan coba lagi.");
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const productDocRef = doc(db, 'products', productToDelete.id);
      await deleteDoc(productDocRef);
      showModal('success', `Produk "${productToDelete.name}" berhasil dihapus!`);
      setShowConfirmDeleteModal(false);
      setProductToDelete(null);
      fetchProducts(); // Refresh daftar produk
    } catch (err) {
      console.error("Error deleting product:", err);
      showModal('error', "Gagal menghapus produk. Silakan coba lagi.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // --- Filter & Sort Logic ---
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleStockFilterChange = (e) => {
    const value = e.target.value;
    setStockFilter(value);
    // Update URL param saat filter stok berubah
    if (value === 'all') {
      searchParams.delete('stock');
    } else {
      searchParams.set('stock', value);
    }
    navigate(`?${searchParams.toString()}`, { replace: true }); // Menggunakan navigate untuk update URL
  };
  const handleSortChange = (e) => setSortOption(e.target.value);

  let filteredAndSortedProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Filter berdasarkan array categories
    const matchesCategory = selectedCategory === 'all' || 
                            (product.categories && Array.isArray(product.categories) && 
                             product.categories.includes(selectedCategory.toLowerCase()));
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'available' && (product.stock && product.stock > 0)) ||
      (stockFilter === 'out-of-stock' && (product.stock === 0));
    return matchesSearch && matchesCategory && matchesStock;
  });

  if (sortOption === 'priceAsc') {
    filteredAndSortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === 'priceDesc') {
    filteredAndSortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortOption === 'nameAsc') {
    filteredAndSortedProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } else if (sortOption === 'nameDesc') {
    filteredAndSortedProducts.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
  } else if (sortOption === 'stockAsc') { // Sortir berdasarkan stok
    filteredAndSortedProducts.sort((a, b) => (a.stock || 0) - (b.stock || 0));
  } else if (sortOption === 'stockDesc') { // Sortir berdasarkan stok
    filteredAndSortedProducts.sort((a, b) => (b.stock || 0) - (a.stock || 0));
  }
  // Tambahkan sortir berdasarkan createdAt
  else if (sortOption === 'newest') {
    filteredAndSortedProducts.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return dateB - dateA; // Newest first
    });
  } else if (sortOption === 'oldest') {
    filteredAndSortedProducts.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return dateA - dateB; // Oldest first
    });
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d9ecb1] font-inter">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-[#99cc66] mb-4" size={48} />
          <div className="text-center text-xl font-semibold text-[#254222]">Memuat manajemen produk...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d9ecb1] font-inter">
        <div className="flex flex-col items-center p-8 bg-[#FFFDF5] rounded-lg shadow-lg">
          <XCircle className="text-red-600 mb-4" size={48} />
          <div className="text-center text-xl font-semibold text-red-600">{error}</div>
          <button
            onClick={fetchProducts}
            className="mt-6 py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                        bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    // Menggunakan background #d9ecb1 dan font-inter, dengan min-h-screen agar penuh
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl font-inter min-h-screen my-8">
      <h1 className="text-4xl font-extrabold text-[#254222] mb-8 text-center drop-shadow-sm">Manajemen Produk</h1>

      {/* Tombol Kembali, Tambah Produk Baru, dan Tampilkan/Sembunyikan Filter Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={handleGoBack}
          className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                      bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50 flex items-center justify-center w-full sm:w-auto"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Dashboard
        </button>
        <button
          onClick={() => {
            setIsAddingProduct(!isAddingProduct);
            setEditingProduct(null); // Reset editing state
            setNewProduct({ name: '', price: '', stock: '', imageUrl: '', description: '', weight: '', origin: '', categoriesInput: '' }); // Reset form
          }}
          className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                      bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50 flex items-center justify-center w-full sm:w-auto"
        >
          {isAddingProduct ? <XCircle className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
          {isAddingProduct ? 'Tutup Formulir' : 'Tambah Produk Baru'}
        </button>

        {/* Tombol Tampilkan/Sembunyikan Filter (hanya di mobile) */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                      bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50 flex items-center justify-center w-full sm:w-auto"
        >
          <Filter className="h-5 w-5 mr-2" />
          {showMobileFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
        </button>
      </div>

      {/* Formulir Tambah/Edit Produk */}
      {isAddingProduct && (
        <div className="bg-[#FFFDF5] p-8 rounded-xl shadow-xl mb-10 border border-[#cae4c5]">
          <h2 className="text-2xl font-bold text-[#254222] mb-6 text-center">
            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Package className="mr-2" size={18} /> Nama Produk <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Nama produk Anda"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="price" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <DollarSign className="mr-2" size={18} /> Harga <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Cth: 50000"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="stock" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Box className="mr-2" size={18} /> Stok <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Jumlah stok"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="imageUrl" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Image className="mr-2" size={18} /> URL Gambar <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Mis: [https://digimart.biz.id/gambar_produk_saya.jpg](https://digimart.biz.id/gambar_produk_saya.jpg)"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="categoriesInput" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Tag className="mr-2" size={18} /> Kategori Produk <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="categoriesInput"
                name="categoriesInput"
                value={newProduct.categoriesInput}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Contoh: makanan, snack, fashion (pisahkan dengan koma)"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="weight" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Weight className="mr-2" size={18} /> Berat Produk (Opsional)
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={newProduct.weight}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Cth: 250g, 1kg"
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="origin" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Globe className="mr-2" size={18} /> Asal Produk (Opsional)
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={newProduct.origin}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                placeholder="Cth: Aceh, Indonesia"
              />
            </div>
            {/* Input Rating dan Reviews Dihapus dari sini */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-[#254222] text-sm font-bold mb-2 flex items-center">
                <Text className="mr-2" size={18} /> Deskripsi Produk (Opsional)
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-[#254222] leading-tight focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
                rows="4"
                placeholder="Deskripsi lengkap produk Anda..."
              ></textarea>
            </div>

            <div className="md:col-span-2 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                              bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
              >
                {editingProduct ? 'Perbarui Produk' : 'Tambah Produk'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                    setNewProduct({ name: '', price: '', stock: '', imageUrl: '', description: '', weight: '', origin: '', categoriesInput: '' });
                  }}
                  className="w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                                bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
                >
                  Batalkan Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Filter dan Sortir */}
      {/* Gunakan kelas 'hidden' secara default di bawah breakpoint 'lg', dan tampilkan berdasarkan showMobileFilters */}
      <div className={`bg-[#FFFDF5] p-6 rounded-lg shadow-md mb-8 border border-[#cae4c5] lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold text-[#254222] mb-4 flex items-center">
          <Filter className="mr-2" size={20} /> Filter & Sortir Produk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Bar (tetap di awal) */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] text-[#254222] shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filter Kategori */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] bg-white text-[#254222] shadow-sm"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
            ))}
          </select>

          {/* Filter Stok */}
          <select
            value={stockFilter}
            onChange={handleStockFilterChange}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] bg-white text-[#254222] shadow-sm"
          >
            <option value="all">Semua Stok</option>
            <option value="available">Tersedia</option>
            <option value="out-of-stock">Stok Habis</option>
          </select>

          {/* Sortir */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] bg-white text-[#254222] shadow-sm"
          >
            <option value="default">Urutkan</option>
            <option value="nameAsc">Nama (A-Z)</option>
            <option value="nameDesc">Nama (Z-A)</option>
            <option value="priceAsc">Harga (Termurah)</option>
            <option value="priceDesc">Harga (Termahal)</option>
            <option value="stockAsc">Stok (Terendah)</option>
            <option value="stockDesc">Stok (Tertinggi)</option>
            <option value="newest">Terbaru</option> {/* Opsi Sortir Terbaru */}
            <option value="oldest">Terlama</option> {/* Opsi Sortir Terlama */}
          </select>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-[#FFFDF5] rounded-lg shadow-md border border-[#cae4c5]">
        {filteredAndSortedProducts.length === 0 && !loading && !error ? (
          <div className="p-8 text-center text-xl text-[#254222] font-semibold">
            Tidak ada produk yang ditemukan sesuai kriteria Anda.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#cae4c5]">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Nama Produk</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Harga</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Stok</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Gambar</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Kategori</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Deskripsi</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Berat</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Asal</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Rating</th>
                <th className="py-3 px-6 text-left text-xs font-bold text-[#254222] uppercase tracking-wider">Ulasan</th>
                <th className="py-3 px-6 text-center text-xs font-bold text-[#254222] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedProducts.map(product => (
                <tr
                  key={product.id}
                  className={`hover:bg-[#f2f7ed] transition-colors duration-150 ${product.stock === 0 ? 'bg-red-50' : ''}`}
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-[#254222]">{product.id.substring(0, 6)}...</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">{product.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                      onError={(e) => { e.target.onerror = null; e.target.src = '[https://placehold.co/64x64/cccccc/333333?text=N/A](https://placehold.co/64x64/cccccc/333333?text=N/A)'; }}
                    />
                  </td>
                  {/* Tampilkan kategori sebagai string dipisahkan koma */}
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">
                    {product.categories && Array.isArray(product.categories) ? product.categories.join(', ') : '-'}
                  </td>
                  <td className="py-4 px-6 max-w-xs truncate text-sm text-[#254222]" title={product.description}>
                    {product.description || '-'}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">{product.weight || '-'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">{product.origin || '-'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">{product.rating !== undefined ? product.rating : '-'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-[#254222]">{product.reviews !== undefined ? product.reviews : '-'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                        title="Edit Produk"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => confirmDelete(product)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Hapus Produk"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-[#99cc66]">
            <CheckCircle className="text-[#99cc66] mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Berhasil!</h3>
            <p className="text-[#254222] mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                          bg-[#99cc66] text-[#254222] hover:bg-[#7aaf4f] focus:outline-none focus:ring-2 focus:ring-[#99cc66]"
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-red-600">
            <XCircle className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Terjadi Kesalahan!</h3>
            <p className="text-[#254222] mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                          bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showConfirmDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-red-600">
            <CircleHelp className="text-[#6699cc] mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Konfirmasi Penghapusan</h3>
            <p className="text-[#254222] mb-6">
              Apakah Anda yakin ingin menghapus produk "<span className="font-semibold">{productToDelete.name}</span>"?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmDeleteModal(false)}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                            bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                            bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div> // Ini adalah tag penutup yang penting
  );
}

export default ProductManagementPage;
