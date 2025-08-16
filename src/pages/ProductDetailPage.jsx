// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebase'; // Impor auth
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard'; // Pastikan ini adalah ProductCard yang sudah di-update untuk bold minimalism jika ingin konsisten

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);

  // State untuk fitur Ulasan
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(''); // Tambahkan state ini untuk pesan sukses ulasan

  // Fungsi untuk mengambil detail produk dan ulasan
  useEffect(() => {
    const fetchProductAndData = async () => {
      if (!id) {
        navigate('/products');
        return; // Hentikan eksekusi lebih lanjut
      }
      try {
        // --- Ambil Detail Produk Utama ---
        const productDocRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productDocRef);

        if (productSnapshot.exists()) {
          const productData = { id: productSnapshot.id, ...productSnapshot.data() };
          setProduct(productData);
        } else {
          setError("Produk tidak ditemukan.");
          setLoading(false);
          return; // Hentikan jika produk tidak ditemukan
        }

        // --- Ambil Ulasan untuk Produk Ini ---
        const reviewsCollectionRef = collection(db, 'reviews');
        const q = query(reviewsCollectionRef, where('productId', '==', id));
        const reviewsSnapshot = await getDocs(q);
        const productReviews = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Urutkan ulasan dari terbaru ke terlama
        productReviews.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));
        setReviews(productReviews);

        // --- Ambil Produk Terkait (4 produk lain, acak) ---
        const productsCollectionRef = collection(db, 'products');
        const allProductsSnapshot = await getDocs(productsCollectionRef);
        const allProductsData = allProductsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.id !== id); // Exclude current product

        const shuffled = allProductsData.sort(() => 0.5 - Math.random());
        const slicedRelatedProducts = shuffled.slice(0, 4);
        setRelatedProducts(slicedRelatedProducts);

        setLoading(false);
      } catch (err) {
        console.error("ERROR: Kesalahan saat fetch data di ProductDetailPage:", err);
        setError("Gagal memuat detail produk. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchProductAndData();
  }, [id, navigate]); // id dan navigate sebagai dependency

  // Fungsi untuk menambah produk ke keranjang
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} telah ditambahkan ke keranjang!`);
  };

  // Fungsi untuk mengubah kuantitas
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  // Fungsi untuk submit ulasan baru
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess(''); // Reset success message

    if (newRating === 0) {
      setReviewError("Mohon berikan rating bintang.");
      return;
    }
    if (!newReviewText.trim()) {
      setReviewError("Ulasan tidak boleh kosong.");
      return;
    }

    setSubmittingReview(true);
    try {
      const reviewData = {
        productId: id,
        rating: newRating,
        comment: newReviewText.trim(),
        reviewerName: 'Pengguna Anonim', // Di masa depan, bisa dari user yang login
        createdAt: new Date().toISOString() // Simpan sebagai ISO string untuk konsistensi
      };

      // Tambahkan ulasan ke koleksi 'reviews'
      const reviewsCollectionRef = collection(db, 'reviews');
      await addDoc(reviewsCollectionRef, reviewData);
      console.log("LOG: Ulasan baru berhasil ditambahkan.");

      // Re-fetch semua ulasan untuk produk ini untuk perhitungan ulang rating
      const updatedReviewsSnapshot = await getDocs(query(reviewsCollectionRef, where('productId', '==', id)));
      const updatedProductReviews = updatedReviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("LOG: Mengambil ulang semua ulasan untuk perhitungan rating.");

      const totalRatings = updatedProductReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = updatedProductReviews.length > 0 ? (totalRatings / updatedProductReviews.length) : 0;

      // HANYA PERBARUI DOKUMEN PRODUK JIKA ADA ADMIN YANG LOGIN
      if (auth.currentUser) {
        const productDocRef = doc(db, 'products', id);
        await updateDoc(productDocRef, {
          rating: parseFloat(averageRating.toFixed(1)), // Simpan 1 angka di belakang koma
          reviews: updatedProductReviews.length
        });
        console.log("LOG: Rating dan jumlah ulasan produk diperbarui.");
      } else {
        console.warn("WARN: Rating produk tidak diperbarui karena tidak ada admin yang login. Ulasan berhasil dikirim.");
      }

      setReviewSuccess('Ulasan berhasil ditambahkan!');
      setNewRating(0); // Reset rating
      setNewReviewText(''); // Reset ulasan teks
      setReviews(updatedProductReviews.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0))); // Perbarui daftar ulasan di UI dengan ID
      setProduct(prev => ({ // Perbarui rating di state produk lokal (jika updateDoc dilakukan)
        ...prev, 
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: updatedProductReviews.length
      }));

    } catch (err) {
      console.error("ERROR: Kesalahan saat submit ulasan:", err);
      // Jika error terjadi di updateDoc (misalnya karena bukan admin), tetap beritahu ulasan terkirim
      if (err.code === 'permission-denied' && !auth.currentUser) {
        setReviewSuccess("Ulasan berhasil ditambahkan, namun rating produk hanya dapat diperbarui oleh admin.");
        setNewRating(0); // Reset rating
        setNewReviewText(''); // Reset ulasan teks
        // Re-fetch ulasan untuk update UI meskipun rating produk tidak diupdate
        const reviewsCollectionRef = collection(db, 'reviews');
        const q = query(reviewsCollectionRef, where('productId', '==', id));
        const reviewsSnapshot = await getDocs(q);
        const productReviews = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReviews(productReviews.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0)));
      } else {
        setReviewError("Gagal mengirim ulasan. Silakan coba lagi nanti.");
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  if (loading) {
    // Menggunakan main-accent
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat detail produk...</div>;
  }

  if (error) {
    // Menggunakan warna bawaan Tailwind (merah)
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  if (!product) {
    return (
      // Menggunakan dark-neutral
      <div className="text-center p-8 text-[#254222] font-inter">Produk tidak ditemukan atau terjadi kesalahan.</div>
    );
  }

  const isProductOutOfStock = (product.stock ?? 0) <= 0;

  return (
    // Menggunakan background #d9ecb1
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg flex flex-col gap-8 max-w-7xl font-inter">
      {/* Detail Produk Utama */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Section */}
        <div className="md:w-1/2">
          <img
            src={product.imageUrl || 'https://placehold.co/600x400/cccccc/333333?text=Product+Image'}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/cccccc/333333?text=Product+Image`; }}
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Menggunakan dark-neutral */}
            <h1 className="text-4xl font-extrabold text-[#254222] mb-2">{product.name}</h1>
            {/* Menggunakan main-accent */}
            <p className="text-3xl font-bold text-[#99cc66] mb-4">Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}</p>
            {/* Menggunakan dark-neutral */}
            <p className="text-[#254222] mb-6 leading-relaxed">{product.description || 'Tidak ada deskripsi tersedia.'}</p>

            {/* Menggunakan dark-neutral */}
            <div className="grid grid-cols-2 gap-4 text-[#254222] mb-6">
              <div>
                <span className="font-semibold">Stok:</span> {product.stock !== undefined ? (product.stock > 0 ? `${product.stock} Tersedia` : 'Habis') : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Berat:</span> {product.weight || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Asal:</span> {product.origin || 'N/A'}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                {product.rating !== undefined && product.rating > 0 ? (
                  <>
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="ml-2">({product.reviews || 0} ulasan)</span>
                  </>
                ) : (
                  <span>N/A (Belum ada ulasan)</span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart Button */}
          <div className="flex items-center space-x-4 mt-6">
            {/* Menggunakan dark-neutral */}
            <label htmlFor="quantity" className="text-lg font-semibold text-[#254222]">Jumlah:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              // Fokus ring dan border menggunakan main-accent
              className="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
              disabled={isProductOutOfStock}
            />
            <button
              onClick={handleAddToCart}
              className={`flex-grow py-3 px-6 rounded-lg text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${isProductOutOfStock 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  // Outline main-accent dengan hover mengisi dan teks dark-neutral
                  : 'bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:ring-[#99cc66]'
                }`
              }
              disabled={isProductOutOfStock}
            >
              {isProductOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Navigasi Cepat */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => navigate('/products')}
          // Tombol outline dark-neutral dengan hover mengisi dan teks primary-background
          className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
            bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:ring-[#254222]"
        >
          Lihat Semua Produk
        </button>
        <button
          onClick={() => navigate('/cart')}
          // Tombol outline main-accent dengan hover mengisi dan teks dark-neutral
          className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
            bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:ring-[#99cc66]"
        >
          Lihat Keranjang
        </button>
      </div>

      {/* Bagian Ulasan Pelanggan */}
      {/* Menggunakan background #FFFDF5 */}
      <div className="mt-12 bg-[#FFFDF5] p-8 rounded-lg shadow-md">
        {/* Menggunakan dark-neutral */}
        <h2 className="text-3xl font-bold text-[#254222] mb-6 text-center">Ulasan Pelanggan</h2>

        {/* Formulir Tambah Ulasan */}
        {/* Menggunakan background #FFFDF5 */}
        <div className="mb-8 p-6 bg-[#FFFDF5] rounded-lg shadow-sm border border-gray-200">
          {/* Menggunakan dark-neutral */}
          <h3 className="text-xl font-semibold text-[#254222] mb-4">Berikan Ulasan Anda</h3>
          {reviewSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 transition-all duration-300" role="alert">
              <span className="block sm:inline">{reviewSuccess}</span>
            </div>
          )}
          {reviewError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 transition-all duration-300" role="alert">
              <span className="block sm:inline">{reviewError}</span>
            </div>
          )}
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              {/* Menggunakan dark-neutral */}
              <label className="block text-[#254222] text-sm font-bold mb-2">Rating Bintang:</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${star <= newRating ? 'text-yellow-500' : 'text-gray-400'} transition-colors duration-200`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    onClick={() => setNewRating(star)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div>
              {/* Menggunakan dark-neutral */}
              <label htmlFor="reviewText" className="block text-[#254222] text-sm font-bold mb-2">
                Ulasan Anda:
              </label>
              <textarea
                id="reviewText"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows="4"
                // Fokus ring dan border menggunakan main-accent
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Tulis ulasan Anda di sini..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]" // Outline main-accent
              disabled={submittingReview}
            >
              {submittingReview ? 'Mengirim Ulasan...' : 'Kirim Ulasan'}
            </button>
          </form>
        </div>

        {/* Daftar Ulasan yang Ada */}
        {reviews.length === 0 ? (
          <p className="text-[#254222] text-center text-lg mt-8">Belum ada ulasan untuk produk ini.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              // Menggunakan background #FFFDF5
              <div key={review.id || index} className="bg-[#FFFDF5] p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {/* Menggunakan dark-neutral */}
                    <span className="font-semibold text-[#254222] mr-2">
                      {review.reviewerName || 'Pengguna Anonim'}
                    </span>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                {/* Menggunakan dark-neutral */}
                <p className="text-[#254222] leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Produk Terkait / Rekomendasi */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          {/* Menggunakan dark-neutral */}
          <h2 className="text-3xl font-bold text-[#254222] mb-6 text-center">Produk Lainnya Mungkin Anda Suka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
