// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Harap pastikan jalur berikut sesuai dengan struktur folder proyek Anda.
// Misalnya:
// Jika firebase.js berada di 'src/firebase/firebase.js', maka jalurnya adalah '../firebase/firebase.js'
// Jika CartContext.jsx berada di 'src/context/CartContext.jsx', maka jalurnya adalah '../context/CartContext.jsx'
// Jika ProductCard.jsx berada di 'src/components/ProductCard.jsx', maka jalurnya adalah '../components/ProductCard.jsx'
import { db, auth } from '../firebase/firebase.js';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { ArrowRight, Phone } from 'lucide-react'; // Menghapus Mail karena email kontak dihapus

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
  const [reviewSuccess, setReviewSuccess] = '';

  // NEW: Panggil usePageTitle
  usePageTitle("Detail Produk");

  // NEW STATE: State untuk mengontrol tampilan semua ulasan
  const [showAllReviews, setShowAllReviews] = useState(false);
  // Jumlah ulasan yang ditampilkan secara default
  const REVIEW_DISPLAY_LIMIT = 3;

  // State untuk notifikasi kustom
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success'); // 'success' or 'error'

  // Fungsi untuk menampilkan notifikasi kustom
  const displayNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 3000);
  };

  // Fungsi untuk mengambil detail produk dan ulasan
  useEffect(() => {
    const fetchProductAndData = async () => {
      if (!id) {
        navigate('/products');
        return;
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
          return;
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
  }, [id, navigate]);

  // Fungsi untuk menambah produk ke keranjang
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    displayNotification(`${quantity} ${product.name} telah ditambahkan ke keranjang!`, 'success');
  };

  // Fungsi untuk mengubah kuantitas (dari input manual)
  const handleQuantityChange = (e) => {
    const inputValue = e.target.value; // Dapatkan nilai input sebagai string

    // Jika input kosong, biarkan state quantity kosong (tapi pastikan addToCart tidak dipanggil dengan ini)
    if (inputValue === '') {
      setQuantity('');
      return;
    }

    // Ubah ke integer. Jika tidak valid (misal: "a", atau hanya tanda "-"), set ke 1
    let parsedValue = parseInt(inputValue, 10);
    if (isNaN(parsedValue)) {
      parsedValue = 1; // Default ke 1 jika input bukan angka
    }

    // Pastikan kuantitas tidak kurang dari 1, dan tidak lebih dari stok jika ada batasnya
    // Asumsi: Kita tidak memiliki max stock limit yang keras di sini, hanya min 1
    setQuantity(Math.max(1, parsedValue));
  };

  // Fungsi untuk submit ulasan baru
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');

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
        reviewerName: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email || 'Pengguna' : 'Pengguna Anonim', // Bisa dari user yang login
        createdAt: new Date().toISOString()
      };

      const reviewsCollectionRef = collection(db, 'reviews');
      await addDoc(reviewsCollectionRef, reviewData);
      console.log("LOG: Ulasan baru berhasil ditambahkan.");

      const updatedReviewsSnapshot = await getDocs(query(reviewsCollectionRef, where('productId', '==', id)));
      const updatedProductReviews = updatedReviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("LOG: Mengambil ulang semua ulasan untuk perhitungan rating.");

      const totalRatings = updatedProductReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = updatedProductReviews.length > 0 ? (totalRatings / updatedProductReviews.length) : 0;

      // HANYA PERBARUI DOKUMEN PRODUK JIKA ADA USER YANG LOGIN (Bukan hanya admin, karena ulasan umum)
      if (auth.currentUser) {
        const productDocRef = doc(db, 'products', id);
        await updateDoc(productDocRef, {
          rating: parseFloat(averageRating.toFixed(1)),
          reviews: updatedProductReviews.length
        });
        console.log("LOG: Rating dan jumlah ulasan produk diperbarui.");
      } else {
        console.warn("WARN: Rating produk tidak diperbarui karena tidak ada user yang login saat submit ulasan ini.");
      }

      setReviewSuccess('Ulasan berhasil ditambahkan!');
      displayNotification('Ulasan berhasil ditambahkan!', 'success');
      setNewRating(0);
      setNewReviewText('');
      setReviews(updatedProductReviews.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0)));
      setProduct(prev => ({
        ...prev,
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: updatedProductReviews.length
      }));

    } catch (err) {
      console.error("ERROR: Kesalahan saat submit ulasan:", err);
      // Removed specific permission-denied logic if auth.currentUser. This logic seems to be specific to an admin update, but review submission should be open to all.
      setReviewError("Gagal mengirim ulasan. Silakan coba lagi nanti.");
      displayNotification("Gagal mengirim ulasan. Silakan coba lagi nanti.", 'error');
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

  // Calculate average rating and total reviews for summary display
  const totalReviewsCount = reviews.length;
  const averageProductRating = useMemo(() => {
    if (totalReviewsCount === 0) return 0;
    const totalRatingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRatingSum / totalReviewsCount).toFixed(1);
  }, [reviews, totalReviewsCount]);

  // Determine which reviews to display
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, REVIEW_DISPLAY_LIMIT);

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat detail produk...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center p-8 text-[#254222] font-inter">Produk tidak ditemukan atau terjadi kesalahan.</div>
    );
  }

  const isProductOutOfStock = (product.stock ?? 0) <= 0;

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-[#d9ecb1] rounded-lg shadow-lg flex flex-col gap-8 max-w-7xl font-inter relative">
      {/* Custom Notification */}
      {showNotification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-xl text-white text-center font-semibold transition-all duration-300 ${
          notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notificationMessage}
        </div>
      )}

      {/* Detail Produk Utama */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Section */}
        <div className="md:w-1/2">
          <img
            src={product.imageUrl || 'https://placehold.co/600x400/cccccc/333333?text=Product+Image'}
            alt={product.name}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/cccccc/333333?text=Product+Image`; }}
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#254222] mb-2">{product.name}</h1>
            <p className="text-2xl sm:text-3xl font-bold text-[#99cc66] mb-4">Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}</p>
            <p className="text-base sm:text-lg text-[#254222] mb-6 leading-relaxed">{product.description || 'Tidak ada deskripsi tersedia.'}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#254222] mb-6">
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
          <div className="flex flex-row items-center gap-4 mt-6 flex-wrap">
            <label htmlFor="quantity" className="text-lg font-semibold text-[#254222] flex-shrink-0">Jumlah:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 py-3 px-3 border border-gray-500 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] transition-all duration-300"
              disabled={isProductOutOfStock}
            />
            <button
              onClick={handleAddToCart}
              className={`flex-auto py-3 px-6 rounded-lg text-lg sm:text-xl font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${isProductOutOfStock
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:ring-[#99cc66]'
                }`}
              disabled={isProductOutOfStock}
            >
              {isProductOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Navigasi Cepat */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate('/products')}
          className="py-2 px-4 text-base sm:py-3 sm:px-6 sm:text-lg rounded-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity50
            bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:ring-[#254222]"
        >
          Lihat Semua Produk
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="py-2 px-4 text-base sm:py-3 sm:px-6 sm:text-lg rounded-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
            bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:ring-[#99cc66]"
        >
          Lihat Keranjang
        </button>
      </div>

      {/* Bagian Ulasan Pelanggan */}
      <div className="mt-12 bg-[#FFFDF5] p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#254222] mb-6 text-center">Ulasan Pelanggan</h2>

        {/* Formulir Tambah Ulasan */}
        <div className="mb-8 p-4 sm:p-6 bg-[#FFFDF5] rounded-lg shadow-sm border border-gray-200">
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
              <label className="block text-[#254222] text-sm font-bold mb-2">Rating Bintang:</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-7 w-7 sm:h-8 sm:w-8 cursor-pointer ${star <= newRating ? 'text-yellow-500' : 'text-gray-400'} transition-colors duration-200`}
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
              <label htmlFor="reviewText" className="block text-[#254222] text-sm font-bold mb-2">
                Ulasan Anda:
              </label>
              <textarea
                id="reviewText"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#254222] leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]"
                placeholder="Tulis ulasan Anda di sini..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
              disabled={submittingReview}
            >
              {submittingReview ? 'Mengirim Ulasan...' : 'Kirim Ulasan'}
            </button>
          </form>
        </div>

        {/* Ringkasan Ulasan */}
        {totalReviewsCount > 0 && (
            <div className="mb-6 text-center text-[#254222]">
                <h3 className="text-xl font-semibold mb-2">Rating Keseluruhan</h3>
                <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-[#99cc66] mr-2">{averageProductRating}</span>
                    <div className="flex">{renderStars(Math.round(parseFloat(averageProductRating)))}</div>
                </div>
                <p className="text-lg">Berdasarkan {totalReviewsCount} ulasan</p>
            </div>
        )}

        {/* Daftar Ulasan yang Ada */}
        {reviews.length === 0 ? (
          <p className="text-[#254222] text-center text-lg mt-8">Belum ada ulasan untuk produk ini.</p>
        ) : (
          <div className="space-y-6">
            {displayedReviews.map((review, index) => (
              <div key={review.id || index} className="bg-[#FFFDF5] p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                  <div className="flex items-center mb-2 sm:mb-0">
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
                <p className="text-[#254222] leading-relaxed">{review.comment}</p>
              </div>
            ))}

            {/* Tombol Lihat Semua Ulasan */}
            {reviews.length > REVIEW_DISPLAY_LIMIT && !showAllReviews && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                    bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
                >
                  Lihat Semua {reviews.length} Ulasan ({reviews.length - REVIEW_DISPLAY_LIMIT} lainnya)
                </button>
              </div>
            )}
            {/* Optional: Tombol Sembunyikan Ulasan */}
            {reviews.length > REVIEW_DISPLAY_LIMIT && showAllReviews && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                    bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5]"
                >
                  Sembunyikan Ulasan
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Produk Terkait / Rekomendasi */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#254222] mb-6 text-center">Produk Lainnya Mungkin Anda Suka</h2>
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