// src/pages/ProductManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ProductManagementPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
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
    category: ''
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // State untuk filter & sortir
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState(searchParams.get('stock') || 'all');
  const [sortOption, setSortOption] = useState('default');
  const [categories, setCategories] = useState([]);


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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setStockFilter(searchParams.get('stock') || 'all');
  }, [searchParams]);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.imageUrl || !newProduct.category) {
      alert("Nama, Harga, Stok, URL Gambar, dan Kategori wajib diisi!");
      return;
    }

    try {
      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        rating: 0,
        reviews: 0
      };

      const productsCollectionRef = collection(db, 'products');
      await addDoc(productsCollectionRef, productToAdd);
      alert('Produk berhasil ditambahkan!');
      setNewProduct({
        name: '', price: '', stock: '', imageUrl: '', description: '',
        weight: '', origin: '', category: ''
      });
      setIsAddingProduct(false);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Gagal menambahkan produk. Silakan coba lagi.");
    }
  };

  const startEdit = (product) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(true);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description || '',
      weight: product.weight || '',
      origin: product.origin || '',
      category: product.category || ''
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct.id || !newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.imageUrl || !newProduct.category) {
      alert("Nama, Harga, Stok, URL Gambar, dan Kategori wajib diisi!");
      return;
    }

    try {
      const productDocRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productDocRef, {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        imageUrl: newProduct.imageUrl,
        description: newProduct.description || '',
        weight: newProduct.weight || '',
        origin: newProduct.origin || '',
        category: newProduct.category || ''
      });
      alert('Produk berhasil diperbarui!');
      setEditingProduct(null);
      setIsAddingProduct(false);
      setNewProduct({
        name: '', price: '', stock: '', imageUrl: '', description: '',
        weight: '', origin: '', category: ''
      });
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Gagal memperbarui produk. Silakan coba lagi.");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      try {
        const productDocRef = doc(db, 'products', id);
        await deleteDoc(productDocRef);
        alert('Produk berhasil dihapus!');
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Gagal menghapus produk. Silakan coba lagi.");
      }
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
    setSearchParams(searchParams);
  };
  const handleSortChange = (e) => setSortOption(e.target.value);

  let filteredAndSortedProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesStock = stockFilter === 'all' || 
                         (stockFilter === 'available' && (product.stock && product.stock > 0)) ||
                         (stockFilter === 'out-of-stock' && (product.stock === 0)); // FIX: Removed extra ')' here
    return matchesSearch && matchesCategory && matchesStock;
  });

  if (sortOption === 'priceAsc') {
    filteredAndSortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === 'priceDesc') {
    filteredAndSortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortOption === 'nameAsc') {
    filteredAndSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'nameDesc') {
    filteredAndSortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Ekstrak kategori unik dari produk
  const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];


  if (loading) {
    // Menggunakan main-accent
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat manajemen produk...</div>;
  }

  if (error) {
    // Menggunakan warna bawaan Tailwind (merah)
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-6xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Manajemen Produk</h1>

      {/* Tombol Kembali dan Tambah Produk Baru / Tutup Formulir */}
      <div className="flex justify-between items-center mb-6">
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
        <button
          onClick={() => {
            setIsAddingProduct(!isAddingProduct);
            setEditingProduct(null);
            setNewProduct({ name: '', price: '', stock: '', imageUrl: '', description: '', weight: '', origin: '', category: '' });
          }}
          // Tombol outline main-accent
          className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:ring-opacity-50"
        >
          {isAddingProduct ? 'Tutup Formulir' : 'Tambah Produk Baru'}
        </button>
      </div>

      {/* Formulir Tambah/Edit Produk */}
      {isAddingProduct && (
        // Menggunakan background #FFFDF5
        <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-md mb-8">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-xl font-semibold text-[#254222] mb-4">
            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="name" className="block text-[#254222] text-sm font-bold mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="price" className="block text-[#254222] text-sm font-bold mb-2">
                Harga
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="stock" className="block text-[#254222] text-sm font-bold mb-2">
                Stok
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="imageUrl" className="block text-[#254222] text-sm font-bold mb-2">
                URL Gambar
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Mis: https://digimart.biz.id/gambar_produk_saya.jpg"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="category" className="block text-[#254222] text-sm font-bold mb-2">
                Kategori Produk
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Contoh: Makanan, Minuman, Fashion"
                required
              />
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="description" className="block text-[#254222] text-sm font-bold mb-2">
                Deskripsi Produk (Opsional)
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                rows="3"
              ></textarea>
            </div>
            {/* Bidang tambahan: Weight (Berat) */}
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="weight" className="block text-[#254222] text-sm font-bold mb-2">
                Berat Produk (contoh: 250g, 1kg)
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={newProduct.weight}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              />
            </div>
            {/* Bidang tambahan: Origin (Asal) */}
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="origin" className="block text-[#254222] text-sm font-bold mb-2">
                Asal Produk (contoh: Aceh, Indonesia)
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={newProduct.origin}
                onChange={handleNewProductChange}
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
              />
            </div>
            <button
              type="submit"
              // Tombol outline main-accent
              className="w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                         bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
            >
              {editingProduct ? 'Perbarui Produk' : 'Tambah Produk'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                  setNewProduct({ name: '', price: '', stock: '', imageUrl: '', description: '', weight: '', origin: '', category: '' });
                }}
                // Tombol outline dark-neutral
                className="w-full mt-2 py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                           bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5]"
              >
                Batalkan Edit
              </button>
            )}
          </form>
        </div>
      )}

      {/* Tabel Produk */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#FFFDF5] border border-gray-200 rounded-lg"> {/* Background tabel #FFFDF5 */}
          <thead>
            <tr className="bg-[#cae4c5] text-[#254222] uppercase text-sm leading-normal"> {/* Header tabel secondary-neutral background, dark-neutral text */}
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nama Produk</th>
              <th className="py-3 px-6 text-left">Harga</th>
              <th className="py-3 px-6 text-left">Stok</th>
              <th className="py-3 px-6 text-left">Gambar</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-left">Deskripsi</th>
              <th className="py-3 px-6 text-left">Berat</th>
              <th className="py-3 px-6 text-left">Asal</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Ulasan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-[#254222] text-sm"> {/* Body tabel dark-neutral text */}
            {filteredAndSortedProducts.map(product => (
              <tr 
                key={product.id} 
                className={`border-b border-gray-200 hover:bg-[#f2f7ed] ${product.stock === 0 ? 'bg-red-50' : ''}`} // Hover background lebih terang
              >
                <td className="py-3 px-6 text-left">{product.id.substring(0, 6)}...</td>
                <td className="py-3 px-6 text-left font-medium">{product.name}</td>
                <td className="py-3 px-6 text-left">Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}</td>
                <td className="py-3 px-6 text-left">{product.stock}</td>
                <td className="py-3 px-6 text-left">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/cccccc/333333?text=N/A'; }} />
                </td>
                <td className="py-3 px-6 text-left">{product.category || '-'}</td>
                <td className="py-3 px-6 text-left max-w-xs truncate" title={product.description}>
                  {product.description || '-'}
                </td>
                <td className="py-3 px-6 text-left">{product.weight || '-'}</td>
                <td className="py-3 px-6 text-left">{product.origin || '-'}</td>
                <td className="py-3 px-6 text-left">{product.rating !== undefined ? product.rating : '-'}</td>
                <td className="py-3 px-6 text-left">{product.reviews !== undefined ? product.reviews : '-'}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button
                      onClick={() => startEdit(product)}
                      // Tombol outline kuning kecil
                      className="bg-transparent border-2 border-yellow-500 text-yellow-600 px-3 py-1 rounded-md text-xs hover:bg-yellow-500 hover:text-white transition-colors duration-300 transform active:scale-95"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      // Tombol outline merah kecil
                      className="bg-transparent border-2 border-red-600 text-red-600 px-3 py-1 rounded-md text-xs hover:bg-red-600 hover:text-white transition-colors duration-300 transform active:scale-95"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagementPage;
