# DOKUMENTASI PROYEK AKHIR
# UMKM Storefront : Solusi E-Commerce Mandiri


## Aplikasi E-Commerce Frontend dengan React dan Firebase Backend

### Disusun Oleh:
## Miqdad Jubair




#### Proyek :
### Capstone Project Hacktiv8 & IBM Skillsbuild
#### URL : https://umkm-storefront.web.app
#### Link repositori Github : https://github.com/MiqdadJubair/umkm-storefront-app
#### Agustus 2025 


# Daftar Isi
## •	Bab I: Pendahuluan Proyek
### o	1.1 Judul Proyek
### o	1.2 Deskripsi Proyek
### o	1.3 Latar Belakang & Permasalahan
### o	1.4 Tujuan Proyek

## •	Bab II: Perancangan Fitur dan Arsitektur Aplikasi
### o	2.1 Fitur Utama Aplikasi
#### 	2.1.1 Fitur untuk Pengguna Admin (Pemilik UMKM)
#### 	2.1.2 Fitur untuk Pengguna Pelanggan
### o	2.2 Arsitektur Aplikasi

## •	Bab III: Desain Antarmuka Pengguna (UI) dan Pengembangan Komponen
### o	3.1 Struktur UI Aplikasi
#### 	3.1.1 Area Pelanggan (Public Facing)
#### 	3.1.2 Area Admin (Admin Dashboard)
### o	3.2 Pendekatan Pengembangan Komponen
### o	3.3 Implementasi Komponen Awal: Navbar dan Halaman Beranda
### o	3.4 Implementasi Desain UI dengan Palet Warna Bold Minimalism (Revisi)

## •	Bab IV: Integrasi Backend (Firebase) dan Manajemen Data
### o	4.1 Inisialisasi Proyek Firebase & Konfigurasi Awal
### o	4.2 Manajemen Produk (CRUD)
### o	4.3 Implementasi Autentikasi Admin
### o	4.4 Manajemen Pesanan (Firestore Integration)
### o	4.5 Fungsionalitas Keranjang Belanja Pelanggan (Client-Side)
### o	4.6 Proses Checkout Pelanggan

## •	Bab V: Pengujian, Deployment, dan Peningkatan Lanjutan
### o	5.1 Strategi Pengujian Aplikasi
### o	5.2 Strategi Deployment
#### 	5.2.1 Pilihan Platform Deployment
#### 	5.2.2 Proses Deployment ke Firebase Hosting
#### 	5.2.3 Link Deployment
### o	5.3 Peningkatan Lanjutan dan Fitur Masa Depan

## •	Bab VI: Kesimpulan
### o	6.1 Ringkasan Proyek dan Tujuan Tercapai
### o	6.2 Pencapaian Utama
### o	6.3 Peran Integrasi AI dalam Pengembangan
### o	6.4 Refleksi dan Pelajaran yang Didapat
### o	6.5 Dampak dan Potensi Masa Depan

## •	Bab VII: Panduan Penggunaan Aplikasi dan Pengujian
### o	7.1 Pengenalan
### o	7.2 Penggunaan Aplikasi untuk Pelanggan
### o	7.3 Penggunaan Aplikasi untuk Admin
### o	7.4 Tips untuk Pengujian




# Bab I: Pendahuluan Proyek

## 1.1 Judul Proyek

**UMKM Storefront: Solusi E-Commerce Mandiri**

## 1.2 Deskripsi Proyek

UMKM Storefront adalah sebuah aplikasi e-commerce mandiri yang dirancang khusus untuk memenuhi kebutuhan usaha mikro, kecil, dan menengah (UMKM) dalam mengelola penjualan, pembelian, dan stok produk secara digital. Aplikasi ini bertujuan untuk menyediakan platform yang terjangkau, mudah digunakan, dan intuitif, memungkinkan UMKM untuk memiliki kehadiran online yang profesional dan meningkatkan pengalaman belanja bagi pelanggan mereka. Dengan fitur manajemen produk, inventaris, dan transaksi, UMKM Storefront akan memberdayakan pelaku usaha untuk mengelola operasional e-commerce mereka secara efisien dari satu tempat.

## 1.3 Latar Belakang & Permasalahan

Di tengah pesatnya digitalisasi, UMKM seringkali menghadapi tantangan besar dalam beradaptasi dengan pasar online. Banyak dari mereka masih mengandalkan metode manual atau platform media sosial yang tidak terintegrasi untuk penjualan. Hal ini menimbulkan beberapa permasalahan krusial:

- **Manajemen Operasional yang Tidak Efisien:** Pencatatan penjualan, pembaruan stok, dan pelacakan pembelian yang dilakukan secara manual atau terpisah menyita waktu, rentan terhadap kesalahan, dan tidak scalable.
- **Keterbatasan Jangkauan & Visibilitas:** Bergantung pada platform pihak ketiga atau media sosial membatasi kontrol merek dan jangkauan pasar, serta menyulitkan UMKM untuk membangun identitas online mereka sendiri.
- **Biaya & Kompleksitas Platform Besar:** Solusi e-commerce yang komersial seringkali terlalu mahal dan kompleks bagi UMKM, yang memiliki sumber daya terbatas.
- **Pengalaman Pengguna yang Kurang Optimal:** Pelanggan mungkin mengalami kesulitan dalam melihat detail produk, melacak pesanan, atau melakukan transaksi yang mulus di platform yang tidak didedikasikan.

Permasalahan ini menghambat UMKM untuk memaksimalkan potensi penjualan mereka di era digital dan tetap kompetitif.

## 1.4 Tujuan Proyek

Proyek UMKM Storefront memiliki tujuan-tujuan spesifik sebagai berikut:

- **Menyediakan Platform E-Commerce yang Terjangkau:** Mengembangkan solusi e-commerce yang mandiri dan dapat diimplementasikan UMKM tanpa biaya lisensi yang besar atau kompleksitas teknis yang tinggi.
- **Mengotomatisasi Manajemen Operasional:** Mengimplementasikan fitur manajemen produk, stok, dan transaksi yang dapat mengurangi beban kerja manual UMKM.
- **Meningkatkan Pengalaman Belanja Pelanggan:** Merancang antarmuka pengguna yang intuitif dan responsif agar pelanggan UMKM memiliki pengalaman belanja online yang lancar dan menyenangkan.
- **Membangun Fondasi Teknis yang Solid:** Mengembangkan aplikasi dengan arsitektur modern (React, Firebase) untuk menunjukkan penguasaan full-stack development yang kuat.
- **Mendemonstrasikan Peran AI dalam Pengembangan:** Menunjukkan bagaimana AI (IBM Granite) digunakan selama fase pengembangan untuk mempercepat proses coding, debugging, dan documentation.

# Bab II: Perancangan Fitur dan Arsitektur Aplikasi

Bab ini akan menguraikan fitur-fitur utama yang akan diimplementasikan dalam aplikasi UMKM Storefront, serta gambaran umum arsitektur teknis yang akan mendukung fungsi-fungsi tersebut.

## 2.1 Fitur Utama Aplikasi

Aplikasi UMKM Storefront akan dirancang untuk melayani dua jenis pengguna utama dengan set fitur yang berbeda: **Pengguna Admin (Pemilik UMKM)** dan **Pengguna Pelanggan**.

### 2.1.1 Fitur untuk Pengguna Admin (Pemilik UMKM)

Fitur-fitur ini akan memberdayakan pemilik UMKM untuk mengelola operasional toko mereka secara efisien.

* **Autentikasi & Otorisasi Admin**: Sistem *login* dan *logout* yang aman khusus untuk pemilik UMKM.
* **Manajemen Produk**: Fungsionalitas **CRUD (Create, Read, Update, Delete)** untuk menambahkan, melihat, mengedit, dan menghapus detail produk (nama, deskripsi, harga, stok, gambar).
* **Manajemen Stok (Inventaris)**: Pembaruan stok secara otomatis setelah penjualan, dan kemampuan untuk melihat serta mengelola jumlah stok yang tersedia.
* **Manajemen Pesanan**: Melihat daftar pesanan yang masuk, status pesanan, dan detail pelanggan.

### 2.1.2 Fitur untuk Pengguna Pelanggan

Fitur-fitur ini akan memberikan pengalaman belanja yang mulus dan intuitif bagi pelanggan UMKM.

* **Daftar & Detail Produk**: Menampilkan semua produk yang tersedia, dengan kemampuan untuk melihat detail lengkap setiap produk.
* **Keranjang Belanja**: Fungsionalitas untuk menambahkan produk ke keranjang belanja, memperbarui jumlah, dan menghapus item dari keranjang.
* **Proses Checkout Sederhana**: Alur sederhana untuk menyelesaikan pembelian setelah produk ditambahkan ke keranjang.
* **Pencarian Produk**: Kemampuan untuk mencari produk berdasarkan nama atau kategori.

## 2.2 Arsitektur Aplikasi

Aplikasi UMKM Storefront akan dibangun dengan arsitektur *client-server* modern, memanfaatkan React untuk *frontend* dan Firebase sebagai *backend as a service* (BaaS).

* **Frontend**: Dibangun menggunakan **React** dengan **Vite** untuk *bundling* yang cepat, dan **Tailwind CSS v4** untuk *styling* yang responsif dan efisien.
* **Backend & Database**: Menggunakan **Firebase**, yang mencakup:
    * **Firebase Authentication**: Untuk manajemen pengguna dan otentikasi (Admin dan Pelanggan).
    * **Cloud Firestore**: Sebagai *database* NoSQL untuk menyimpan data produk, stok, pesanan, dan informasi pengguna.


# Bab III: Desain Antarmuka Pengguna (UI) dan Pengembangan Komponen

Bab ini akan menguraikan pendekatan desain antarmuka pengguna (UI) dan strategi pengembangan komponen yang akan diterapkan dalam pembangunan aplikasi UMKM Storefront. Pendekatan ini bertujuan untuk menciptakan UI yang intuitif, responsif, dan mudah dikelola melalui struktur komponen React yang modular.

## 3.1 Struktur UI Aplikasi

Berdasarkan fitur yang telah didefinisikan pada Bab II, aplikasi UMKM Storefront akan memiliki dua area utama untuk mengakomodasi interaksi pengguna yang berbeda:

### 3.1.1 Area Pelanggan (Public Facing)

Area ini dirancang untuk pengguna akhir atau pelanggan yang akan berinteraksi dengan toko *online*. Halaman-halaman utama meliputi:

* **Halaman Beranda (Home Page)**: Tampilan awal yang menampilkan *highlight* produk, promosi, atau kategori utama.
* **Daftar Produk (Product Listing Page)**: Halaman yang menyajikan daftar lengkap produk yang tersedia, dilengkapi dengan opsi pencarian dan filter.
* **Detail Produk (Product Detail Page)**: Halaman khusus untuk menampilkan informasi rinci mengenai satu produk, termasuk deskripsi, harga, dan opsi pembelian.
* **Keranjang Belanja (Cart Page)**: Antarmuka bagi pelanggan untuk meninjau, mengubah kuantitas, atau menghapus item sebelum melanjutkan ke proses *checkout*.
* **Halaman Checkout**: Alur terpandu untuk menyelesaikan proses pembelian.

### 3.1.2 Area Admin (Admin Dashboard)

Area ini khusus untuk pemilik UMKM, memungkinkan mereka mengelola operasional toko. Halaman-halaman utama meliputi:

* **Halaman Login Admin**: Antarmuka autentikasi yang aman untuk akses pemilik UMKM.
* **Dashboard Admin**: Gambaran umum kinerja toko, data penjualan, stok, dan ringkasan pesanan.
* **Manajemen Produk**: Fungsionalitas lengkap (**Create, Read, Update, Delete - CRUD**) untuk mengelola data produk, termasuk penambahan, pengeditan, dan penghapusan informasi produk.
* **Manajemen Stok (Inventaris)**: Tampilan dan kontrol untuk memantau serta memperbarui jumlah stok produk secara manual, selain pembaruan otomatis setelah penjualan.
* **Manajemen Pesanan**: Halaman untuk melihat daftar pesanan yang masuk, melacak statusnya, dan mengakses detail pesanan.

## 3.2 Pendekatan Pengembangan Komponen

Pengembangan UI aplikasi akan mengadopsi metodologi berbasis komponen menggunakan **React**. Setiap elemen UI, mulai dari yang terkecil hingga bagian yang kompleks, akan dienkapsulasi sebagai komponen React yang mandiri.

**Keuntungan pendekatan berbasis komponen:**

* **Modularitas**: Memecah UI menjadi bagian-bagian yang lebih kecil membuat kode lebih terorganisir dan mudah dipahami.
* **Reusabilitas**: Komponen yang dibuat dapat digunakan kembali di berbagai bagian aplikasi, mengurangi duplikasi kode dan mempercepat pengembangan.
* **Kemudahan Perawatan**: Perubahan atau perbaikan pada satu komponen dapat dilakukan secara independen tanpa memengaruhi bagian lain dari aplikasi.
* **Skalabilitas**: Memungkinkan penambahan fitur dan halaman baru dengan lebih mudah seiring pertumbuhan aplikasi.

## 3.3 Implementasi Komponen Awal: Navbar dan Halaman Beranda

Sebagai langkah awal dalam pengembangan komponen, Navbar (Navigation Bar) dan Halaman Beranda (Home Page) akan diimplementasikan. Kedua komponen ini merupakan elemen kunci yang akan muncul di awal interaksi pengguna dengan aplikasi.

### 3.3.1 Struktur File

* Buat folder baru bernama `components` di dalam direktori `src`. Struktur proyek akan menjadi `src/components/`.
* Di dalam folder `src/components`, buat file baru bernama `Navbar.jsx`.
* Buat folder baru bernama `pages` di dalam direktori `src`. Struktur proyek akan menjadi `src/pages/`.
* Di dalam folder `src/pages`, buat file baru bernama `HomePage.jsx`.

### 3.3.2 Kode Komponen Navbar

Kode berikut akan digunakan untuk komponen `Navbar.jsx`, dirancang dengan Tailwind CSS untuk tampilan yang bersih dan responsif:

```jsx
// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo atau Nama Aplikasi - menggunakan Link ke halaman utama */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          UMKM Storefront
        </Link>

        {/* Navigasi Utama - menggunakan Link untuk navigasi tanpa refresh */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors">Beranda</Link>
          <Link to="/products" className="hover:text-blue-200 transition-colors">Produk</Link>
          <Link to="/cart" className="hover:text-blue-200 transition-colors">Keranjang</Link>
          <Link to="/admin/login" className="hover:text-blue-200 transition-colors">Login Admin</Link>
          {/* Anda bisa menambahkan tautan lain di sini, seperti ke /admin/products atau /admin/orders */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

### 3.3.3 Kode Komponen HomePage

Kode berikut akan digunakan untuk komponen `HomePage.jsx`, yang akan menjadi konten utama pada halaman beranda pelanggan:

```
// src/pages/HomePage.jsx
import React from 'react';

function HomePage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
        Selamat Datang di Toko UMKM Favorit Anda!
      </h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Temukan berbagai produk unik dan berkualitas tinggi dari UMKM lokal favorit Anda. Kami hadir untuk memudahkan Anda berbelanja dan mendukung usaha kecil di seluruh Indonesia.
      </p>
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xl font-semibold">
        [Area untuk Gambar Banner atau Produk Unggulan]
      </div>
      <p className="mt-6 text-md text-gray-600 text-center">
        Jelajahi kategori kami atau cari produk favorit Anda sekarang juga!
      </p>
    </div>
  );
}

export default HomePage;
```

### 3.3.4 Integrasi Komponen ke Aplikasi Utama (App.jsx)
Setelah komponen Navbar dan HomePage dibuat, langkah selanjutnya adalah mengintegrasikannya ke dalam komponen utama aplikasi (src/App.jsx) agar dapat ditampilkan pada setiap halaman. Integrasi ini melibatkan impor kedua komponen tersebut dan penempatannya dalam struktur JSX dari App.jsx. Ini penting untuk memastikan komponen-komponen tersebut menjadi bagian dari render tree aplikasi.
Kode berikut menunjukkan modifikasi pada src/App.jsx untuk mengimpor dan menampilkan Navbar serta HomePage:
```
// src/App.jsx
import React from 'react';
import './index.css'; // Memastikan impor CSS utama yang berisi Tailwind
import Navbar from './components/Navbar'; // Mengimpor komponen Navbar
import HomePage from './pages/HomePage'; // Mengimpor komponen HomePage

function App() {
  return (
    // Struktur layout dasar aplikasi menggunakan Tailwind
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
      <Navbar /> {/* Menampilkan komponen Navbar di bagian atas halaman */}

      {/* Area konten utama aplikasi - kini menampilkan HomePage */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <HomePage /> {/* Menampilkan komponen HomePage di sini */}
      </main>
    </div>
  );
}

export default App;
```

### 3.3.5 Implementasi Komponen ProductCard dan Integrasi ke Halaman Beranda

Setelah fondasi aplikasi melalui Navbar dan kerangka HomePage dibangun, langkah selanjutnya adalah mengembangkan komponen ProductCard. Komponen ini akan merepresentasikan setiap produk secara individual, menampilkan informasi penting seperti nama, harga, dan gambar. Pendekatan ini mendukung reusabilitas dan efisiensi dalam menampilkan daftar produk.

#### 3.3.5.1 Struktur File

1.	Buat file baru bernama ProductCard.jsx di dalam direktori src/components/.

#### 3.3.5.2 Kode Komponen ProductCard

Kode berikut digunakan untuk komponen ProductCard.jsx. Komponen ini dirancang untuk menerima properti product (yang merupakan objek berisi detail produk) dan menampilkannya dengan styling yang responsif menggunakan Tailwind CSS.

#### 3.3.5.3 Integrasi ProductCard ke Halaman Beranda (HomePage.jsx)

Untuk menguji dan menampilkan fungsionalitas ProductCard, komponen ini diintegrasikan ke dalam HomePage.jsx. Ini dilakukan dengan mendefinisikan data produk contoh dan memetakan data tersebut untuk merender beberapa ProductCard dalam tata letak grid.
Kode berikut menunjukkan modifikasi pada src/pages/HomePage.jsx untuk mengimpor dan menampilkan ProductCard:

```
// src/pages/HomePage.jsx
import React from 'react';
import ProductCard from '../components/ProductCard'; // Impor komponen ProductCard

function HomePage() {
  // Data produk contoh untuk ditampilkan
  const sampleProducts = [
    { id: 1, name: 'Kopi Arabika Gayo', price: 75000, imageUrl: 'https://placehold.co/300x200/ADD8E6/000000?text=Kopi+Gayo' },
    { id: 2, name: 'Keripik Tempe Aneka Rasa', price: 25000, imageUrl: 'https://placehold.co/300x200/F0E68C/000000?text=Keripik+Tempe' },
    { id: 3, name: 'Batik Tulis Handmade', price: 250000, imageUrl: 'https://placehold.co/300x200/DDA0DD/000000?text=Batik+Tulis' },
    { id: 4, name: 'Sambal Roa Khas Manado', price: 45000, imageUrl: 'https://placehold.co/300x200/FFA07A/000000?text=Sambal+Roa' },
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
        Selamat Datang di Toko UMKM Favorit Anda!
      </h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Temukan berbagai produk unik dan berkualitas tinggi dari UMKM lokal favorit Anda. Kami hadir untuk memudahkan Anda berbelanja dan mendukung usaha kecil di seluruh Indonesia.
      </p>

      {/* Area untuk menampilkan daftar produk */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <p className="mt-6 text-md text-gray-600 text-center">
        Jelajahi kategori kami atau cari produk favorit Anda sekarang juga!
      </p>
    </div>
  );
}

export default HomePage;
```

### 3.3.6 Implementasi Komponen ProductDetailPage dan Integrasi

Setelah komponen ProductCard dan HomePage terbentuk, langkah selanjutnya adalah mengembangkan halaman khusus untuk menampilkan detail lengkap sebuah produk: ProductDetailPage. Halaman ini akan menyajikan informasi mendalam yang diperlukan pelanggan sebelum membuat keputusan pembelian.
#### 3.3.6.1 Struktur File

1.	Buat file baru bernama ProductDetailPage.jsx di dalam direktori src/pages/.

#### 3.3.6.2 Kode Komponen ProductDetailPage

Kode berikut digunakan untuk komponen ProductDetailPage.jsx. Untuk tujuan demonstrasi awal, halaman ini akan menampilkan data produk dummy. Dalam implementasi penuh, data ini akan diambil secara dinamis berdasarkan ID produk.

```
// src/pages/ProductDetailPage.jsx
import React from 'react';

function ProductDetailPage() {
  // Dummy product data for demonstration
  // In a real application, this data would come from a database based on product ID
  const product = {
    id: 1,
    name: 'Kopi Arabika Gayo Premium',
    price: 120000,
    description: 'Kopi Arabika Gayo berkualitas premium dengan aroma khas dan cita rasa kopi yang kompleks. Dipetik dari dataran tinggi Gayo, Aceh, Indonesia, dan diproses secara organik.',
    imageUrl: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Kopi+Gayo+Premium',
    stock: 50,
    weight: '250g',
    origin: 'Aceh, Indonesia',
    rating: 4.8,
    reviews: 120,
  };

  if (!product) {
    return (
      <div className="text-center p-8 text-gray-700">Produk tidak ditemukan.</div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-8 max-w-5xl">
      {/* Product Image Section */}
      <div className="md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-md object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Product+Image'; }} // Fallback
        />
      </div>

      {/* Product Details Section */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-700 mb-4">Rp {product.price.toLocaleString('id-ID')}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 text-gray-600 mb-6">
            <div>
              <span className="font-semibold">Stok:</span> {product.stock > 0 ? `${product.stock} Tersedia` : 'Habis'}
            </div>
            <div>
              <span className="font-semibold">Berat:</span> {product.weight}
            </div>
            <div>
              <span className="font-semibold">Asal:</span> {product.origin}
            </div>
            <div>
              <span className="font-semibold">Rating:</span> {product.rating} ({product.reviews} ulasan)
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
```

#### 3.3.6.3 Integrasi ProductDetailPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan ProductDetailPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, ProductDetailPage ditampilkan secara langsung sebagai ganti halaman lainnya.


### 3.3.7 Implementasi Komponen CartPage dan Integrasi

Setelah halaman detail produk, fungsionalitas keranjang belanja adalah langkah penting berikutnya dalam alur pembelian pelanggan. CartPage memungkinkan pelanggan untuk meninjau item yang telah mereka pilih, menyesuaikan kuantitas, atau menghapus item sebelum melanjutkan ke pembayaran.

#### 3.3.7.1 Struktur File

1.	Buat file baru bernama CartPage.jsx di dalam direktori src/pages/.

#### 3.3.7.2 Kode Komponen CartPage

Kode berikut digunakan untuk komponen CartPage.jsx. Untuk tujuan demonstrasi awal, halaman ini akan menampilkan data item keranjang dummy.

```
// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';

function CartPage() {
  // Data dummy untuk item di keranjang
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Kopi Arabika Gayo', price: 75000, quantity: 2, imageUrl: 'https://placehold.co/100x100/ADD8E6/000000?text=Kopi' },
    { id: 2, name: 'Keripik Tempe Aneka Rasa', price: 25000, quantity: 1, imageUrl: 'https://placehold.co/100x100/F0E68C/000000?text=Keripik' },
    { id: 3, name: 'Batik Tulis Handmade', price: 250000, quantity: 1, imageUrl: 'https://placehold.co/100x100/DDA0DD/000000?text=Batik' },
  ]);

  // Hitung total harga keranjang
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Keranjang Belanja Anda</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 p-10">Keranjang Anda kosong. Yuk, mulai belanja!</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors ml-4"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 pt-4 border-t-2 border-gray-200">
            <p className="text-xl font-bold text-gray-900">Total: Rp {calculateTotal().toLocaleString('id-ID')}</p>
            <button className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Lanjutkan ke Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
```

#### 3.3.7.3 Integrasi CartPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan CartPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, CartPage ditampilkan secara langsung sebagai ganti halaman lainnya.

### 3.3.8 Implementasi Komponen CheckoutPage dan Integrasi

Setelah keranjang belanja berfungsi, CheckoutPage adalah langkah logis berikutnya dalam alur pembelian pelanggan. Halaman ini memandu pelanggan untuk menyelesaikan transaksi mereka dengan mengumpulkan informasi pengiriman dan pilihan pembayaran.

#### 3.3.8.1 Struktur File

1.	Buat file baru bernama CheckoutPage.jsx di dalam direktori src/pages/.

#### 3.3.8.2 Kode Komponen CheckoutPage

Kode berikut digunakan untuk komponen CheckoutPage.jsx. Halaman ini mencakup ringkasan pesanan, formulir informasi pengiriman, dan pilihan metode pembayaran dummy.

```
// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bankTransfer', // Default payment method
  });

  // Dummy order summary (can be passed via props later)
  const orderSummary = [
    { name: 'Kopi Arabika Gayo', price: 75000, quantity: 2 },
    { name: 'Keripik Tempe Aneka Rasa', price: 25000, quantity: 1 },
    { name: 'Batik Tulis Handmade', price: 250000, quantity: 1 }, // Tambah contoh item
  ];
  const subtotal = orderSummary.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 20000; // Dummy shipping cost
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order submission using a custom modal/message box
    const message = `Pesanan Anda berhasil ditempatkan!\n\nDetail Pesanan:\n${orderSummary.map(item => `${item.name} x ${item.quantity}`).join('\n')}\n\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nInformasi Pengiriman:\nNama: ${formData.name}\nAlamat: ${formData.address}, ${formData.city}, ${formData.postalCode}\nMetode Pembayaran: ${formData.paymentMethod === 'bankTransfer' ? 'Transfer Bank' : 'E-Wallet'}`;
    
    // Using simple alert for now as per previous instructions to avoid complex modal UI
    // For a real app, replace with a custom modal component
    alert(message); 
    
    console.log('Order submitted:', { formData, orderSummary, total });
    // Redirect to a confirmation page or home
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ringkasan Pesanan */}
        <div className="border border-blue-200 rounded-lg p-6 bg-blue-50"> {/* Added styling */}
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Ringkasan Pesanan</h2> {/* Added styling */}
          {orderSummary.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-700 mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div className="flex justify-between text-gray-800 font-medium mt-4 pt-2 border-t border-gray-300"> {/* Added styling */}
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-medium mb-2">
            <span>Ongkos Kirim</span>
            <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-blue-700 border-t pt-2 mt-2">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Informasi Pengiriman */}
        <div className="border border-green-200 rounded-lg p-6 bg-green-50"> {/* Added styling */}
          <h2 className="text-xl font-semibold text-green-800 mb-4">Informasi Pengiriman</h2> {/* Added styling */}
          <div className="mb-4"> {/* Added margin bottom for spacing */}
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4"> {/* Added margin bottom for spacing */}
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Alamat Lengkap</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="mb-4"> {/* Added margin bottom for spacing */}
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">Kota</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4"> {/* Added margin bottom for spacing */}
              <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">Kode Pos</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="border border-purple-200 rounded-lg p-6 bg-purple-50"> {/* Added styling */}
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Metode Pembayaran</h2> {/* Added styling */}
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="bankTransfer"
              checked={formData.paymentMethod === 'bankTransfer'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="bankTransfer" className="text-gray-700">Transfer Bank</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="eWallet"
              name="paymentMethod"
              value="eWallet"
              checked={formData.paymentMethod === 'eWallet'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="eWallet" className="text-gray-700">E-Wallet</label>
          </div>
        </div>

        {/* Tombol Selesaikan Pesanan */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Selesaikan Pesanan
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
```

#### 3.3.8.3 Integrasi CheckoutPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan CheckoutPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, CheckoutPage ditampilkan secara langsung sebagai ganti halaman lainnya.


### 3.3.9 Implementasi Komponen AdminLoginPage dan Integrasi

Setelah menyelesaikan komponen untuk alur pelanggan, fokus beralih ke area admin, dimulai dengan halaman login. AdminLoginPage adalah pintu gerbang bagi pemilik UMKM untuk mengakses fitur manajemen toko.

#### 3.3.9.1 Struktur File

1.	Buat file baru bernama AdminLoginPage.jsx di dalam direktori src/pages/.

#### 3.3.9.2 Kode Komponen AdminLoginPage

Kode berikut digunakan untuk komponen AdminLoginPage.jsx. Komponen ini menyediakan formulir login dasar dengan styling Tailwind CSS untuk email dan kata sandi. Untuk tujuan demonstrasi awal, ia memiliki logika login dummy.

```
// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic for now
    if (email === 'admin@umkm.com' && password === 'password123') {
      alert('Login Berhasil! (Ini adalah dummy login)');
      console.log('Admin logged in:', { email });
      // In a real app, you would redirect to the admin dashboard
    } else {
      alert('Email atau kata sandi salah. (Ini adalah dummy login)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Login Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="admin@umkm.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password123"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
```

#### 3.3.9.3 Integrasi AdminLoginPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan AdminLoginPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, AdminLoginPage ditampilkan secara langsung sebagai ganti halaman lainnya.


### 3.3.10 Implementasi Komponen AdminDashboardPage dan Integrasi

Setelah implementasi halaman login admin, Admin Dashboard adalah komponen penting berikutnya yang menjadi pusat kendali bagi pemilik UMKM. Halaman ini menyediakan gambaran umum tentang metrik utama dan tautan akses cepat ke fitur manajemen lainnya.

#### 3.3.10.1 Struktur File

1.	Buat file baru bernama AdminDashboardPage.jsx di dalam direktori src/pages/.

#### 3.3.10.2 Kode Komponen AdminDashboardPage

Kode berikut akan digunakan untuk komponen AdminDashboardPage.jsx, menampilkan statistik dummy dan tautan navigasi:
```
// src/pages/AdminDashboardPage.jsx
import React from 'react';

function AdminDashboardPage() {
  // Dummy data for dashboard metrics
  const dashboardMetrics = [
    { title: 'Total Penjualan', value: 'Rp 12.500.000', icon: '💰' },
    { title: 'Jumlah Pesanan', value: '75', icon: '📦' },
    { title: 'Produk Terdaftar', value: '45', icon: '🏷️' },
    { title: 'Stok Habis', value: '3', icon: '⚠️' },
  ];

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Dashboard Admin</h1>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardMetrics.map((metric, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <span className="text-4xl">{metric.icon}</span>
            <div>
              <p className="text-lg text-gray-600">{metric.title}</p>
              <h2 className="text-2xl font-bold text-blue-700">{metric.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Links */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg text-center font-semibold hover:bg-green-600 transition-colors">
            Manajemen Produk
          </a>
          <a href="#" className="bg-purple-500 text-white py-3 px-6 rounded-lg text-lg text-center font-semibold hover:bg-purple-600 transition-colors">
            Manajemen Pesanan
          </a>
          {/* Add more admin links here */}
        </div>
      </div>

      {/* Placeholder for recent activities or charts */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md h-64 flex items-center justify-center text-gray-500 text-lg">
        [Area untuk Aktivitas Terbaru atau Grafik Statistik]
      </div>
    </div>
  );
}

export default AdminDashboardPage;
```

#### 3.3.10.3 Integrasi AdminDashboardPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan AdminDashboardPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, AdminDashboardPage ditampilkan secara langsung sebagai ganti halaman lainnya.


### 3.3.11 Implementasi Komponen OrderManagementPage dan Integrasi

Sebagai komponen terakhir yang diperlukan untuk menyelesaikan alur admin, Manajemen Pesanan menyediakan antarmuka bagi pemilik UMKM untuk memantau dan mengelola pesanan pelanggan. Ini memungkinkan peninjauan detail pesanan dan pembaruan status pesanan.

#### 3.3.11.1 Struktur File

1.	Buat file baru bernama OrderManagementPage.jsx di dalam direktori src/pages/.

#### 3.3.11.2 Kode Komponen OrderManagementPage

Kode berikut digunakan untuk komponen OrderManagementPage.jsx. Halaman ini menampilkan daftar pesanan dummy dalam format tabel, dengan opsi untuk melihat detail dan memperbarui status pesanan.

```
// src/pages/OrderManagementPage.jsx
import React, { useState } from 'react';

function OrderManagementPage() {
  // Dummy order data for management
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Budi Santoso', total: 170000, status: 'Diproses', date: '2024-08-10' },
    { id: 'ORD002', customer: 'Siti Aminah', total: 250000, status: 'Selesai', date: '2024-08-09' },
    { id: 'ORD003', customer: 'Joko Susilo', total: 95000, status: 'Tertunda', date: '2024-08-09' },
    { id: 'ORD004', customer: 'Maria Chandra', total: 400000, status: 'Diproses', date: '2024-08-08' },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
    alert(`Status pesanan ${id} diperbarui menjadi: ${newStatus} (Dummy)`);
  };

  const handleViewDetails = (order) => {
    alert(`Melihat detail pesanan: ${order.id} oleh ${order.customer} (Fungsionalitas sebenarnya akan ada halaman detail pesanan)`);
    console.log('View order details:', order);
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Manajemen Pesanan</h1>

      {/* Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID Pesanan</th>
              <th className="py-3 px-6 text-left">Pelanggan</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left font-medium">{order.id}</td>
                <td className="py-3 px-6 text-left">{order.customer}</td>
                <td className="py-3 px-6 text-left">Rp {order.total.toLocaleString('id-ID')}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold
                    ${order.status === 'Diproses' ? 'bg-blue-200 text-blue-800' :
                      order.status === 'Selesai' ? 'bg-green-200 text-green-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{order.date}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md text-xs hover:bg-gray-600 transition-colors"
                    >
                      Detail
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="bg-white border border-gray-300 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Tertunda">Tertunda</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
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

export default OrderManagementPage;
```

#### 3.3.11.3 Integrasi OrderManagementPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan OrderManagementPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, OrderManagementPage ditampilkan secara langsung sebagai ganti halaman lainnya.


### 3.3.12 Implementasi Komponen ProductManagementPage dan Integrasi

Manajemen Produk adalah salah satu fitur inti bagi admin, memungkinkan mereka untuk menambah, melihat, mengedit, dan menghapus produk di toko.

#### 3.3.12.1 Struktur File

1.	Buat file baru bernama ProductManagementPage.jsx di dalam direktori src/pages/.

#### 3.3.12.2 Kode Komponen ProductManagementPage

Kode berikut akan digunakan untuk komponen ProductManagementPage.jsx. Ini akan membuat kerangka halaman manajemen produk dengan tabel dummy dan tombol untuk menambah produk, serta opsi edit dan hapus.

```
// src/pages/ProductManagementPage.jsx
import React, { useState } from 'react';

function ProductManagementPage() {
  // Dummy product data for management
  const [products, setProducts] = useState([
    { id: 1, name: 'Kopi Arabika Gayo', price: 75000, stock: 150, category: 'Minuman' },
    { id: 2, name: 'Keripik Tempe Aneka Rasa', price: 25000, stock: 200, category: 'Makanan Ringan' },
    { id: 3, name: 'Batik Tulis Handmade', price: 250000, stock: 30, category: 'Fashion' },
  ]);

  const handleDelete = (id) => {
    // Gunakan confirm() untuk konfirmasi penghapusan (akan diganti dengan modal kustom di aplikasi nyata)
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('Produk berhasil dihapus! (Dummy)');
    }
  };

  const handleEdit = (product) => {
    alert(`Mengedit produk: ${product.name} (Fungsionalitas sebenarnya akan ada form edit)`);
    console.log('Edit product:', product);
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Manajemen Produk</h1>

      {/* Add Product Button */}
      <div className="flex justify-end mb-6">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Tambah Produk Baru
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nama Produk</th>
              <th className="py-3 px-6 text-left">Harga</th>
              <th className="py-3 px-6 text-left">Stok</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">{product.id}</td>
                <td className="py-3 px-6 text-left font-medium">{product.name}</td>
                <td className="py-3 px-6 text-left">Rp {product.price.toLocaleString('id-ID')}</td>
                <td className="py-3 px-6 text-left">{product.stock}</td>
                <td className="py-3 px-6 text-left">{product.category}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition-colors"
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
```

#### 3.3.12.3 Integrasi ProductManagementPage ke Aplikasi Utama (App.jsx)

Untuk menampilkan ProductManagementPage, komponen ini diimpor dan diintegrasikan ke dalam src/App.jsx. Untuk tujuan pengujian sementara, ProductManagementPage ditampilkan secara langsung sebagai ganti halaman lainnya.


## 3.4 Implementasi Sistem Routing Aplikasi

Setelah semua komponen halaman UI utama telah dikembangkan, langkah selanjutnya adalah mengimplementasikan sistem routing untuk memungkinkan navigasi yang mulus antar halaman tanpa memuat ulang aplikasi penuh. Ini adalah karakteristik kunci dari aplikasi Single-Page Application (SPA).

### 3.4.1 Instalasi React Router Dom

Untuk mengelola routing di aplikasi React, react-router-dom adalah library standar. Instalasi dilakukan melalui manajer paket npm:
```
Bash
npm install react-router-dom
```

#### 3.4.2 Modifikasi App.jsx untuk Routing Global

Setelah react-router-dom terinstal, komponen utama src/App.jsx dimodifikasi untuk mengintegrasikan routing. Ini melibatkan penggunaan BrowserRouter, Routes, dan Route untuk mendefinisikan jalur URL dan komponen halaman yang sesuai.

Kode berikut menunjukkan struktur final src/App.jsx yang mengimplementasikan routing untuk semua halaman yang telah dibangun:
```
// src/App.jsx
import React from 'react';
import './index.css';
import Navbar from './components/Navbar';

// Mengimpor semua halaman yang telah kita buat (untuk tujuan testing, hanya satu yang aktif)
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductManagementPage from './pages/ProductManagementPage'; // Mengimpor komponen ProductManagementPage
import OrderManagementPage from './pages/OrderManagementPage';

function App() {
  return (
    // Struktur layout dasar aplikasi menggunakan Tailwind
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Untuk menguji halaman tertentu, komen halaman lain dan biarkan satu saja aktif */}
        {/* <HomePage /> */}
        {/* <ProductListingPage /> */}
        {/* <ProductDetailPage /> */}
        {/* <CartPage /> */}
        {/* <CheckoutPage /> */}
        {/* <AdminLoginPage /> */}
        {/* <AdminDashboardPage /> */}
        {/* <OrderManagementPage /> */}
        <ProductManagementPage /> {/* Saat ini menampilkan halaman Manajemen Produk */}
      </main>
    </div>
  );
}

export default App;
```

### 3.4.3 Mengaktifkan Navigasi Antar Halaman

Setelah React Router dikonfigurasi di App.jsx, langkah penting selanjutnya adalah memperbarui komponen-komponen yang berfungsi sebagai tautan navigasi (seperti Navbar dan ProductCard) untuk memanfaatkan Link dari react-router-dom. Penggunaan Link menggantikan tag <a> HTML biasa untuk memungkinkan navigasi yang lancar tanpa memuat ulang halaman penuh.

#### 3.4.3.1 Pembaruan Komponen Navbar

Komponen Navbar.jsx diubah untuk menggunakan <Link to="..."> pada semua item navigasi utamanya, memastikan pengalaman single-page application yang sesungguhnya.
```
JavaScript
// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Mengimpor komponen Link dari react-router-dom

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo atau Nama Aplikasi - menggunakan Link ke halaman utama */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          UMKM Storefront
        </Link>

        {/* Navigasi Utama - menggunakan Link untuk navigasi tanpa refresh */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors">Beranda</Link>
          <Link to="/products" className="hover:text-blue-200 transition-colors">Produk</Link>
          <Link to="/cart" className="hover:text-blue-200 transition-colors">Keranjang</Link>
          <Link to="/admin/login" className="hover:text-blue-200 transition-colors">Login Admin</Link>
          {/* Anda bisa menambahkan tautan lain di sini, seperti ke /admin/products atau /admin/orders */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

#### 3.4.3.2 Pembaruan Komponen ProductCard

Tombol "Lihat Detail" dan gambar produk di komponen ProductCard.jsx juga diperbarui untuk menggunakan <Link to="...">. Ini memungkinkan pengguna untuk mengklik kartu produk atau tombol detail dan langsung diarahkan ke ProductDetailPage yang relevan, melewati ID produk melalui URL.
```
JavaScript
// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

// Komponen ProductCard menerima objek 'product' sebagai props
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Gambar Produk - juga bisa diklik untuk melihat detail */}
      <Link to={`/product/${product.id}`}> {/* Link ke halaman detail produk */}
        {/* Placeholder image: https://placehold.co/{width}x{height}/{background color in hex}/{text color in hex}?text={text} */}
        <img
          src={product.imageUrl || `https://placehold.co/300x200/cccccc/333333?text=${product.name.substring(0, 10)}...`}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/cccccc/333333?text=${product.name.substring(0, 10)}...`; }} // Fallback jika gambar error
        />
      </Link>

      {/* Detail Produk */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-gray-700 mt-1">
          Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
        </p>
        {/* Tombol "Lihat Detail" menggunakan Link */}
        <Link 
          to={`/product/${product.id}`} 
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center inline-block" // text-center and inline-block added for styling Link as a button
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
```


## 3.5 Kesimpulan Bab III: UI Aplikasi yang Fungsional dan Terdokumentasi

Bab III telah menjadi fase yang sangat intensif dan krusial dalam pengembangan UMKM Storefront. Pada bab ini, aplikasi telah berhasil merancang dan mengimplementasikan semua komponen antarmuka pengguna (UI) utama, baik untuk alur pelanggan maupun area admin. Setiap komponen telah dibangun dengan prinsip modularitas React dan styling responsif menggunakan Tailwind CSS, memastikan fondasi yang kuat dan maintainable.

Pencapaian utama dalam bab ini meliputi:
* **Pengembangan Komponen Dasar:** Mulai dari Navbar sebagai elemen navigasi global, hingga ProductCard sebagai unit visual produk, semuanya telah dirancang untuk reusabilitas.
* **Penyelesaian Halaman Sisi Pelanggan:** HomePage yang menarik, ProductListingPage yang menampilkan produk, ProductDetailPage untuk detail mendalam, CartPage untuk manajemen keranjang, dan CheckoutPage untuk finalisasi pembelian, semuanya kini telah tersedia.
*	**Penyelesaian Halaman Sisi Admin:** AdminLoginPage sebagai gerbang akses, AdminDashboardPage sebagai pusat informasi, ProductManagementPage untuk kontrol produk, dan OrderManagementPage untuk pelacakan pesanan, kini telah terstruktur.
*	**Implementasi Sistem Routing yang Berfungsi Penuh:** Melalui integrasi React Router Dom, semua halaman ini telah berhasil dihubungkan, memungkinkan navigasi yang mulus dan pengalaman single-page application (SPA) yang sebenarnya. Secara spesifik, setiap tautan di Navbar dan tombol "Lihat Detail" di ProductCard kini berfungsi dengan benar, secara dinamis mengarahkan pengguna ke halaman yang relevan tanpa full page reload. Ini merupakan kemajuan penting dalam mencapai aplikasi web yang interaktif dan responsif.

Dengan penyelesaian Bab III, aplikasi memiliki **fondasi UI yang kuat, fungsional, dan dapat dinavigasi**, siap untuk terhubung dengan backend nyata. Pencapaian ini merupakan langkah signifikan menuju realisasi penuh **UMKM Storefront**.



# Bab IV: Integrasi Backend (Firebase) dan Manajemen Data

Bab ini menandai transisi aplikasi UMKM Storefront dari sebuah prototype UI statis menjadi platform e-commerce fungsional yang terintegrasi dengan layanan backend. Fokus utama bab ini adalah implementasi Firebase sebagai Backend as a Service (BaaS) untuk menangani autentikasi pengguna dan manajemen data produk serta pesanan secara dinamis.

## 4.1 Inisialisasi Proyek Firebase & Konfigurasi Awal

Langkah fundamental untuk mengaktifkan fungsionalitas backend adalah inisialisasi dan konfigurasi proyek Firebase.

### 4.1.1 Penyiapan Proyek Firebase di Konsol

Sebuah proyek baru telah dibuat di Firebase Console, dengan penamaan yang relevan (misalnya, "UMKM Storefront"). Ini menjadi pusat kontrol untuk semua layanan Firebase yang akan digunakan.

### 4.1.2 Pengaktifan Layanan Firebase

Dua layanan inti Firebase telah diaktifkan dalam proyek:
* **Firebase Authentication:** Diaktifkan untuk mendukung manajemen identitas pengguna, khususnya untuk sistem login dan logout admin menggunakan metode Email/Password.
* **Cloud Firestore:** Diaktifkan sebagai database NoSQL yang fleksibel dan scalable untuk menyimpan semua data aplikasi, seperti produk, pesanan, dan detail terkait.

### 4.1.3 Instalasi dan Konfigurasi Firebase SDK

Firebase SDK diinstal dalam proyek React, dan konfigurasi Firebase (API Key, Project ID, dll.) diinisialisasi dalam file src/firebase/firebase.js. File ini mengekspor instance db (Firestore) dan auth (Authentication), membuatnya dapat diakses secara global di seluruh aplikasi.


## 4.2 Manajemen Produk (CRUD)

Bagian admin aplikasi membutuhkan kemampuan penuh untuk mengelola daftar produk. Implementasi Create, Read, Update, Delete (CRUD) untuk produk dilakukan melalui interaksi dengan koleksi products di Cloud Firestore.

### 4.2.1 Pengambilan dan Tampilan Produk (Read)

Komponen ProductManagementPage.jsx diatur untuk mengambil data produk dari koleksi products di Firestore menggunakan getDocs. Data ini kemudian ditampilkan dalam format tabel yang mudah dibaca, menggantikan data dummy sebelumnya.

### 4.2.2 Penambahan Produk Baru (Create)

Sebuah formulir input terintegrasi dalam ProductManagementPage.jsx memungkinkan admin untuk memasukkan detail produk baru. Data dari formulir ini kemudian disimpan sebagai dokumen baru dalam koleksi products menggunakan fungsi addDoc dari Firestore. Bidang-bidang yang ditambahkan meliputi: name, price, stock, imageUrl, description, weight, origin, rating, dan reviews.

### 4.2.3 Pembaruan Produk (Update)

Fungsionalitas edit diimplementasikan dalam ProductManagementPage.jsx dengan memuat data produk yang dipilih ke dalam formulir yang sama yang digunakan untuk penambahan produk. Perubahan pada formulir ini kemudian disimpan kembali ke dokumen yang relevan di Firestore menggunakan fungsi updateDoc.

### 4.2.4 Penghapusan Produk (Delete)

Tombol "Hapus" ditambahkan pada setiap baris produk di ProductManagementPage.jsx. Ketika diklik, setelah konfirmasi pengguna, dokumen produk yang sesuai dihapus dari koleksi products di Firestore menggunakan fungsi deleteDoc.

### 4.2.5 Aturan Keamanan Firestore untuk Produk

Aturan keamanan Firestore telah dikonfigurasi untuk koleksi products untuk mengizinkan operasi baca (allow read: if true;) secara publik (untuk halaman produk pelanggan), namun membatasi operasi tulis (allow write: if request.auth != null;) hanya untuk pengguna yang telah terautentikasi (admin), memastikan integritas data.


## 4.3 Implementasi Autentikasi Admin

Untuk mengamankan area admin dan operasi manajemen data yang sensitif, sistem autentikasi Firebase telah diintegrasikan.

### 4.3.1 Pengaktifan Metode Email/Password

Metode Sign-in Email/Password diaktifkan di Firebase Authentication Console. Sebuah akun admin awal (misalnya, admin@umkm.com) juga dibuat secara manual di Firebase Console untuk tujuan pengujian.

### 4.3.2 Fungsi Login Admin

Komponen AdminLoginPage.jsx dimodifikasi untuk menggunakan signInWithEmailAndPassword dari Firebase Authentication. Setelah login berhasil, admin diarahkan ke AdminDashboardPage.jsx. Penanganan error untuk kredensial yang salah juga diimplementasikan.

### 4.3.3 Fungsi Logout Admin

Tombol "Logout" ditambahkan ke AdminDashboardPage.jsx. Ketika diklik, fungsi signOut dari Firebase Authentication dipanggil, mengakhiri sesi admin dan mengarahkan kembali ke AdminLoginPage.jsx.

### 4.3.4 Perlindungan Rute Admin (Protected Routes)

Sebuah komponen ProtectedRoute.jsx dibuat untuk membungkus rute-rute admin (/admin/dashboard, /admin/products, /admin/orders). Komponen ini memeriksa status autentikasi pengguna menggunakan onAuthStateChanged. Jika pengguna tidak terautentikasi, mereka otomatis diarahkan ke AdminLoginPage.jsx, memastikan bahwa halaman admin hanya dapat diakses oleh pihak yang berwenang. Integrasi ProtectedRoute dilakukan di App.jsx.

### 4.3.5 Pembaruan Aturan Keamanan Firestore (Revisi)

Aturan keamanan Firestore diperketat kembali setelah autentikasi diimplementasikan. Untuk koleksi products dan koleksi orders, allow write: if request.auth != null; diterapkan, memastikan hanya admin yang login yang dapat mengubah data ini.


## 4.4 Manajemen Pesanan (Firestore Integration)

Halaman Manajemen Pesanan admin di OrderManagementPage.jsx ditingkatkan dari tampilan dummy menjadi fungsionalitas nyata yang terhubung ke Firestore.

### 4.4.1 Struktur Data Pesanan

Diasumsikan setiap dokumen pesanan dalam koleksi orders memiliki bidang seperti customerName, totalAmount, status, orderDate, dan array items yang berisi detail produk yang dipesan (name, quantity, price, imageUrl). Data pesanan dummy juga telah ditambahkan secara manual di Firestore Console untuk tujuan pengujian.

### 4.4.2 Pengambilan dan Tampilan Pesanan (Read)

OrderManagementPage.jsx kini mengambil daftar pesanan dari koleksi orders Firestore menggunakan getDocs. Pesanan ditampilkan dalam tabel, menggantikan data dummy, dengan kemampuan untuk diurutkan berdasarkan tanggal.

### 4.4.3 Pembaruan Status Pesanan (Update)

Admin dapat memperbarui status pesanan (misalnya, dari 'Tertunda' menjadi 'Diproses' atau 'Selesai') langsung dari tabel manajemen pesanan menggunakan dropdown. Fungsi updateDoc digunakan untuk memperbarui bidang status di Firestore.

### 4.4.4 Penghapusan Pesanan (Delete)

Tombol "Hapus" juga disertakan, memungkinkan admin untuk menghapus dokumen pesanan dari koleksi orders di Firestore menggunakan deleteDoc setelah konfirmasi.

### 4.4.5 Detail Item Pesanan dengan Modal

Fungsionalitas tombol "Detail" pada setiap pesanan ditingkatkan. Ketika diklik, sebuah modal (pop-up) akan muncul, menampilkan ringkasan pesanan dan daftar lengkap items yang dipesan (nama produk, kuantitas, harga). Ini memerlukan struktur array items yang benar di dokumen pesanan Firestore.



## 4.5 Fungsionalitas Keranjang Belanja Pelanggan (Client-Side)

Bagian ini berfokus pada pengalaman belanja pelanggan, khususnya pengelolaan keranjang belanja.

### 4.5.1 Menambah Produk ke Keranjang dari Halaman Detail Produk

ProductDetailPage.jsx kini dilengkapi dengan tombol "Tambah ke Keranjang" yang berfungsi penuh. Ketika diklik, produk yang dipilih dengan kuantitas yang ditentukan ditambahkan ke keranjang belanja.

### 4.5.2 Manajemen State Keranjang dengan React Context API

Untuk memastikan persistensi dan aksesibilitas state keranjang di seluruh aplikasi, React Context API diimplementasikan:
* File src/context/CartContext.jsx dibuat untuk mendefinisikan CartContext, CartProvider, dan custom hook useCart.
* CartProvider membungkus seluruh aplikasi di App.jsx, membuat state keranjang (dan fungsi-fungsi pengelolanya: addToCart, updateQuantity, removeItem, clearCart, calculateTotal) tersedia untuk semua komponen anak.
* Persistensi localStorage: CartContext secara otomatis memuat state keranjang dari localStorage saat inisialisasi dan menyimpannya kembali ke localStorage setiap kali state keranjang berubah, mengatasi masalah persistensi yang diamati sebelumnya.

### 4.5.3 Tampilan dan Interaksi Keranjang di CartPage.jsx

Komponen CartPage.jsx telah direvisi untuk sepenuhnya memanfaatkan useCart hook. Sekarang:
* Ini menampilkan daftar produk di keranjang secara dinamis dari state global.
* Pengguna dapat memperbarui kuantitas setiap item menggunakan tombol '+' dan '-'.
* Pengguna dapat menghapus item dari keranjang.
* Total harga keranjang dihitung secara real-time.

### 4.5.4 Penanganan Stok Habis yang Lebih Baik

Pada ProductDetailPage.jsx, perilaku tombol "Tambah ke Keranjang" telah disempurnakan. Jika product.stock adalah 0, null, atau undefined, input kuantitas dan tombol "Tambah ke Keranjang" akan dinonaktifkan, dan teks tombol akan berubah menjadi "Stok Habis" untuk memberikan feedback yang jelas kepada pelanggan.



## 4.6 Proses Checkout Pelanggan

Alur checkout yang komprehensif diimplementasikan untuk memungkinkan pelanggan menyelesaikan pembelian mereka.

### 4.6.1 Modifikasi CheckoutPage.jsx
CheckoutPage.jsx diubah menjadi formulir checkout fungsional:
* Ini mengambil item dari keranjang dan menampilkan ringkasan pesanan menggunakan useCart hook.
* Formulir disediakan untuk mengumpulkan informasi pelanggan penting seperti nama, email, telepon, dan alamat.
* Pembuatan Pesanan di Firestore: Ketika formulir disubmit, sebuah dokumen pesanan baru yang berisi detail pelanggan, item yang dipesan, dan total harga, dibuat dan disimpan ke koleksi orders Firestore menggunakan addDoc. Status awal pesanan diatur ke 'Tertunda'.
* Pengosongan Keranjang: Setelah pesanan berhasil dibuat di Firestore, keranjang belanja pelanggan secara otomatis dikosongkan menggunakan fungsi clearCart dari CartContext.
* Pemberitahuan dan Redireksi: Pelanggan menerima alert konfirmasi keberhasilan pesanan dan kemudian diarahkan kembali ke halaman daftar produk untuk pengalaman berbelanja berkelanjutan. Penanganan error juga disertakan.


## Kesimpulan Bab IV

Bab IV telah berhasil mengintegrasikan aplikasi UMKM Storefront dengan Firebase Authentication dan Cloud Firestore, mengubahnya menjadi platform e-commerce yang dinamis dan fungsional. Fungsionalitas manajemen produk, sistem autentikasi admin yang aman, manajemen pesanan real-time, dan alur belanja pelanggan yang lengkap (mulai dari keranjang belanja persisten hingga proses checkout yang sukses) telah berhasil diimplementasikan. Dengan selesainya bab ini, fondasi teknis yang kokoh untuk operasional e-commerce telah terbentuk, siap untuk penyempurnaan dan fitur tambahan di bab berikutnya.





# Bab V: Pengujian, Deployment, dan Peningkatan Lanjutan

Bab ini merinci tahapan krusial setelah pengembangan fungsionalitas inti aplikasi UMKM Storefront: pengujian menyeluruh, persiapan untuk deployment agar aplikasi dapat diakses publik, dan identifikasi area untuk peningkatan di masa mendatang.


## 5.1 Strategi Pengujian Aplikasi

Pengujian adalah fase vital untuk memastikan kualitas, fungsionalitas, dan keandalan aplikasi. Pendekatan pengujian untuk UMKM Storefront akan mencakup beberapa tingkatan:

### 5.1.1 Pengujian Unit (Unit Testing)

Meskipun tidak diimplementasikan secara eksplisit dalam contoh kode ini, dalam proyek yang lebih besar, pengujian unit akan berfokus pada validasi fungsi individual atau komponen React secara terisolasi. Ini memastikan setiap bagian kecil kode bekerja seperti yang diharapkan.

### 5.1.2 Pengujian Integrasi (Integration Testing)

Pengujian integrasi akan memverifikasi interaksi antara berbagai komponen dan layanan, seperti:
* **Interaksi UI dengan Context API:** Memastikan penambahan/penghapusan produk dari keranjang atau pembaruan kuantitas secara akurat mencerminkan perubahan state di CartContext.
* **Interaksi Frontend-Backend (Firebase):** Menguji apakah operasi CRUD pada produk, pesanan, dan pengaturan toko berhasil berkomunikasi dengan Cloud Firestore. Ini termasuk verifikasi data yang disimpan dan diambil secara konsisten.
* **Alur Pengguna:** Menguji alur lengkap seperti:
  * Login admin yang berhasil dan gagal.
  * Proses penambahan produk ke keranjang, checkout, hingga konfirmasi pesanan.
  * Pengubahan status pesanan oleh admin.

### 5.1.3 Pengujian End-to-End (E2E Testing)

Pengujian E2E akan mensimulasikan skenario pengguna riil dari awal hingga akhir, misalnya:

* Pelanggan mencari produk, menambahkannya ke keranjang, mengisi detail checkout, dan membuat pesanan.
* Admin login, menambah produk baru, melihatnya di daftar produk, dan memperbarui status pesanan yang masuk. Alat seperti Cypress atau Playwright dapat digunakan untuk otomatisasi pengujian E2E.

### 5.1.4 Pengujian Responsivitas & Kompatibilitas Browser

Aplikasi akan diuji pada berbagai ukuran layar (desktop, tablet, mobile) dan browser populer (Chrome, Firefox, Safari, Edge) untuk memastikan layout yang responsif dan pengalaman pengguna yang konsisten.

### 5.1.5 Pengujian Kinerja (Performance Testing)

Mengukur kecepatan pemuatan halaman, responsivitas interaksi UI, dan efisiensi pengambilan data dari Firebase, terutama saat volume data meningkat.

### 5.1.6 Pengujian Keamanan

Meskipun Firebase menyediakan keamanan built-in, pengujian akan dilakukan untuk memastikan:
* Aturan keamanan Firestore berfungsi dengan benar, mencegah akses tidak sah ke data sensitif.
* Autentikasi admin aman dari serangan umum seperti brute-force (melalui fitur keamanan Firebase).

### 5.1.7 Pelajaran yang Didapat dan Perbaikan Iteratif

Selama proses pengembangan dan penyempurnaan aplikasi UMKM Storefront, beberapa tantangan dan trial and error muncul, yang kemudian diselesaikan melalui pendekatan iteratif. Ini menunjukkan pentingnya pengujian dan feedback yang berkelanjutan:
* Konsistensi Palet Warna: Awalnya, penerapan palet warna bold minimalism tidak sepenuhnya konsisten di seluruh halaman dan komponen. Misalnya, elemen seperti garis pemisah, outline pada harga, dan tombol-tombol kecil sering kali menggunakan warna default Tailwind atau memiliki kontras yang kurang optimal. Solusinya adalah melakukan revisi manual yang teliti pada setiap komponen (seperti HomePage, ProductListingPage, ProductDetailPage, CartPage, AdminDashboardPage, AdminSettingsPage, dan ProductCard), menyesuaikan setiap class Tailwind dengan nilai heksadesimal spesifik dari palet (misalnya, bg-[#d9ecb1], text-[#254222], border-[#99cc66]) untuk mencapai keseragaman visual.
* Keterbacaan Kontras: Pada beberapa kesempatan, kombinasi warna yang dipilih untuk latar belakang dan teks menghasilkan kontras yang rendah, membuat elemen sulit dibaca (contoh: harga dengan latar belakang gelap). Solusinya adalah menyesuaikan warna teks agar memiliki kontras yang memadai dengan latar belakangnya, bahkan jika itu berarti menyimpang sedikit dari warna teks utama untuk memastikan aksesibilitas dan keterbacaan (misalnya, menggunakan text-[#FFFDF5] pada bg-[#254222] untuk harga di CartPage).
* Kejelasan Garis Pemisah: Garis pemisah antar elemen, terutama di CartPage dan tabel manajemen, awalnya terlalu tipis atau berwarna abu-abu terang sehingga sulit terlihat. Perbaikan dilakukan dengan meningkatkan ketebalan garis (border-t-4 atau border-b-2) dan menggelapkan warnanya menjadi border-[#254222] (dark-neutral) untuk memberikan penekanan yang lebih sesuai dengan tema bold minimalism.
* Desain Tombol Berulang: Tombol-tombol di berbagai halaman awalnya memiliki styling yang bervariasi. Pendekatan ini diperbaiki dengan mendefinisikan pola outline button yang konsisten (misalnya, border-2 border-[warna] text-[warna] hover:bg-[warna] hover:text-[warna kontras]) dan menerapkannya secara seragam, memberikan tampilan yang kohesif di seluruh aplikasi.
* Transisi UI yang Halus: Untuk meningkatkan pengalaman pengguna, transisi halus (transition-all duration-300) ditambahkan pada elemen interaktif seperti input, card, dan tombol, menciptakan feedback visual yang lebih responsif.

Pelajaran dari proses ini adalah bahwa desain visual yang konsisten memerlukan perhatian yang cermat pada setiap detail dan kesediaan untuk beriterasi berdasarkan feedback visual.

## 5.2 Strategi Deployment

Setelah pengujian berhasil, aplikasi akan dideploy agar dapat diakses oleh pengguna akhir melalui internet.

### 5.2.1 Pilihan Platform Deployment

Beberapa opsi populer untuk deployment aplikasi React dengan Firebase sebagai backend:
* Firebase Hosting: Pilihan yang paling direkomendasikan karena integrasi mulus dengan proyek Firebase lainnya, dukungan SSL gratis, dan CDN global untuk kinerja cepat.
* Vercel / Netlify: Platform hosting modern yang menyediakan deployment otomatis dari repository Git, dukungan SSL, dan CDN. Cocok untuk aplikasi React.
* Penyedia Cloud Lain (AWS Amplify, Google Cloud App Engine): Pilihan yang lebih kompleks namun menawarkan fleksibilitas dan kontrol lebih besar.

### 5.2.2 Proses Deployment ke Firebase Hosting

Proses deployment aplikasi UMKM Storefront ke Firebase Hosting dilakukan dengan langkah-langkah berikut:

1.	Persiapan Proyek:
 	 * Pastikan semua perubahan kode telah disimpan dan tidak ada error yang mencegah aplikasi berjalan di lingkungan pengembangan.
   * Verifikasi bahwa proyek Firebase telah dikonfigurasi dengan benar di src/firebase/firebase.js dan layanan Authentication serta Cloud Firestore telah diaktifkan di Firebase Console.
2.	Instalasi Firebase CLI:
   * Jika belum terinstal secara global, gunakan perintah berikut di terminal:
   `npm install -g firebase-tools`
3.	Login ke Firebase:
   * Buka terminal di folder akar proyek (D:\Hacktiv8\Code\Capstone project\storefront\umkm-storefront>).
   * Jalankan perintah login:
   `firebase login`
   * Ikuti instruksi autentikasi yang muncul di browser. Pastikan untuk mengizinkan Firebase CLI mengakses akun Google yang terhubung dengan proyek Firebase Anda. (Catatan: Proses ini mungkin memerlukan penyesuaian Path sistem atau penanganan error spawn cmd ENOENT seperti yang telah dibahas dalam pengembangan).
4.	Inisialisasi Firebase Hosting:
   * Di terminal dalam folder akar proyek, inisialisasi konfigurasi hosting:
`firebase init hosting`
 * Ikuti prompt berikut:
   * 	"Are you ready to proceed?" -> Y
   * 	"Which Firebase features do you want to set up for this directory?" -> Pilih Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys (gunakan Spacebar untuk memilih, Enter untuk konfirmasi).
   * 	"Please select a project:" -> Pilih Use an existing project, lalu pilih nama proyek Firebase Anda dari daftar (misalnya, umkm-storefront).
   * 	"What do you want to use as your public directory?" -> Ketik dist (ini adalah output build Vite).
   * 	"Configure as a single-page app (rewrite all urls to /index.html)?" -> Y
   * 	"Set up automatic deploys with GitHub?" -> N (untuk deployment manual).
* Proses ini akan membuat file firebase.json dan .firebaserc.
5.	Build Aplikasi React untuk Produksi:
* Pastikan Anda berada di folder akar proyek, lalu jalankan perintah build:
`npm run build`
* Ini akan mengkompilasi dan mengoptimalkan kode aplikasi Anda, menghasilkan folder dist yang berisi semua file yang siap untuk di-deploy.
6.	Deploy Aplikasi:
* Akhirnya, unggah file-file dari folder dist ke Firebase Hosting:
`firebase deploy --only hosting`
* Setelah proses selesai, terminal akan menampilkan "Hosting URL" (misalnya, https://umkm-storefront.web.app), yang merupakan tautan publik ke aplikasi Anda.

### 5.2.3 Link Deployment

•	Hosting URL: https://umkm-storefront.web.app.

•	Project Console: https://console.firebase.google.com/project/umkm-storefront/overview (Ganti dengan URL konsol proyek Anda).

## 5.3 Peningkatan Lanjutan dan Fitur Masa Depan

UMKM Storefront dirancang dengan fondasi yang kuat dan dapat diperluas. Berikut adalah beberapa potensi peningkatan dan fitur yang dapat ditambahkan di masa depan:

## 5.3.1 Fitur Pelanggan

•	**Pencarian Produk Lanjutan:** Filter berdasarkan harga, kategori ganda, ketersediaan, dan ulasan.

•	**Sistem Notifikasi:** Memberi tahu pelanggan tentang status pesanan (email atau notifikasi in-app).

•	**Favorit/Wishlist:** Pelanggan dapat menyimpan produk yang mereka minati.

•	**Histori Pesanan Pelanggan:** Pelanggan dapat melihat riwayat pesanan mereka setelah login.

•	**Akun Pengguna:** Pendaftaran dan login pelanggan untuk personalisasi.

•	**Sistem Ulasan Produk Lanjutan:** Fitur moderator ulasan untuk admin, foto ulasan.

•	**Integrasi Pembayaran Gateway:** Menggunakan layanan pembayaran pihak ketiga (Midtrans, Stripe, Doku) untuk proses pembayaran yang otomatis dan beragam.

•	**Dukungan Multi-bahasa:** Menambah pilihan bahasa untuk jangkauan pasar yang lebih luas.

•	**Penyesuaian Biaya Pengiriman Dinamis:** Saat ini biaya pengiriman adalah fixed. Di masa depan, ini bisa ditingkatkan dengan:

    o	Integrasi API layanan logistik (misalnya, JNE, Pos Indonesia) untuk menghitung biaya berdasarkan jarak atau berat.

    o	Opsi pengiriman yang bervariasi (reguler, ekspres) dengan tarif berbeda.

    o	Pengaturan biaya pengiriman manual yang fleksibel oleh admin.

### 5.3.2 Fitur Admin

•	**Manajemen Kategori:** Admin dapat menambah, mengedit, dan menghapus kategori produk.

•	**Manajemen Pengguna (Admin):** Admin utama dapat menambah atau menghapus akun admin lainnya.

•	**Laporan & Analitik Penjualan:** Dashboard yang lebih canggih dengan grafik penjualan, produk terlaris, dan tren.

•	**Manajemen Promo & Kupon:** Admin dapat membuat dan mengelola diskon atau kode kupon.

•	**Notifikasi Pesanan Baru:** Pemberitahuan real-time kepada admin ketika ada pesanan baru.

•	**Integrasi Pengiriman:** Melacak pesanan dengan API layanan pengiriman.

•	**Manajemen Media:** Mengelola gambar produk di Cloud Storage (menggantikan penggunaan URL eksternal atau placeholder).

•	**Optimasi SEO:** Pengaturan meta tag dan sitemap dinamis.

### 5.3.3 Optimasi Kinerja & Skalabilitas

•	**SSR (Server-Side Rendering) / SSG (Static Site Generation):** Untuk kinerja awal yang lebih cepat dan SEO yang lebih baik (menggunakan Next.js atau Gatsby).

•	**Optimasi Gambar:** Menggunakan layanan CDN atau teknik kompresi gambar.

•	**Caching Strategi:** Memanfaatkan caching di frontend dan backend.

•	**Indeks Firestore Lanjutan:** Mengoptimalkan kueri database yang kompleks.

## Kesimpulan Bab V

Bab ini menggarisbawahi pentingnya pengujian untuk memastikan kualitas aplikasi sebelum deployment. Dengan Firebase Hosting, proses deployment menjadi efisien dan terintegrasi. Selain itu, UMKM Storefront memiliki potensi besar untuk tumbuh dan berkembang dengan penambahan fitur-fitur baru, baik untuk meningkatkan pengalaman pelanggan maupun efisiensi manajemen operasional admin. Pelajaran yang didapat dari perbaikan iteratif menunjukkan bahwa perhatian pada detail dan penyesuaian berkelanjutan adalah kunci untuk mencapai kualitas visual dan fungsional yang tinggi. Ini memastikan aplikasi dapat terus beradaptasi dengan kebutuhan pasar dan pengguna yang berkembang.


# Bab VI: Kesimpulan

Bab ini memberikan gambaran menyeluruh tentang proyek UMKM Storefront yang telah selesai, merangkum perjalanan dari konsep hingga implementasi. Ini meninjau tujuan awal proyek, fitur-fitur kunci yang telah berhasil diwujudkan, serta refleksi singkat mengenai proses pengembangan dan pelajaran yang didapat.

## 6.1 Ringkasan Proyek dan Tujuan Tercapai

Visi utama UMKM Storefront adalah menyediakan solusi e-commerce yang terjangkau dan mudah digunakan bagi usaha mikro, kecil, dan menengah (UMKM). Aplikasi ini dirancang untuk mengatasi tantangan operasional UMKM, meningkatkan jangkauan pasar, dan memberikan pengalaman belanja yang mulus bagi pelanggan. Melalui proyek ini, aplikasi berhasil mewujudkan tujuan utamanya dengan menyediakan platform yang mendukung manajemen produk, inventaris, dan transaksi secara digital, memberdayakan pelaku usaha untuk mengelola kehadiran online mereka secara efisien dari satu tempat.


## 6.2 Pencapaian Utama

Proyek UMKM Storefront telah berhasil mengimplementasikan beberapa fitur krusial yang membentuk fondasi kuat bagi operasional e-commerce:

•	**Antarmuka Pengguna (UI) yang Responsif dan Intuitif:** Desain bold minimalism berhasil diterapkan secara konsisten di seluruh halaman pelanggan dan admin, menciptakan pengalaman visual yang seragam, menarik, dan mudah dinavigasi. Responsivitas di berbagai perangkat memastikan aksesibilitas yang luas.

•	**Integrasi Backend yang Andal dengan Firebase:** Pemanfaatan Firebase Authentication dan Cloud Firestore telah menyediakan sistem login admin yang aman, manajemen produk (CRUD) yang dinamis, serta sistem manajemen pesanan real-time. Ini memungkinkan UMKM untuk mengelola data dan operasional dengan efisien.

•	**Fungsionalitas Keranjang Belanja yang Persisten:** Dengan implementasi React Context API dan localStorage, item keranjang belanja pelanggan kini dapat bertahan bahkan setelah sesi browser ditutup, meningkatkan pengalaman belanja yang nyaman dan tidak terputus.

•	**Alur Pembelian End-to-End:** Proses pembelian dari pemilihan produk, penyesuaian kuantitas di keranjang, hingga checkout dan konfirmasi pesanan telah diwujudkan dengan lancar, termasuk penanganan dasar untuk biaya pengiriman.

•	**Basis Kode Terkelola di GitHub:** Seluruh kode sumber proyek ini telah di-push dan tersedia di repository GitHub, memastikan manajemen versi, kolaborasi potensial di masa depan, dan transparansi dalam pengembangan.


## 6.3 Peran Integrasi AI dalam Pengembangan

Proses pengembangan **UMKM Storefront** secara aktif mendemonstrasikan bagaimana **integrasi AI dapat berfungsi sebagai co-developer** yang kuat dan efisien. Dalam proyek ini, penggunaan model AI Gemini berperan signifikan dalam membantu untuk  mengoperasikan kemampuan model AI IBM Granite, yang berkontribusi secara efektif dan efisien dalam berbagai aspek pengembangan software. Fungsi-fungsi penting yang dijalankan oleh model AI tersebut meliputi:

•	**Generasi Kode Otomatis:** Berdasarkan instruksi yang diberikan, model AI menghasilkan segmen kode awal yang fungsional untuk struktur halaman, komponen (ProductCard, Navbar), dan logika fungsionalitas kompleks (seperti operasi CRUD, integrasi keranjang dengan Context API), secara signifikan mempercepat proses coding yang repetitif.

•	**Penerapan Styling dan Desain:** Kemampuan model AI untuk memahami instruksi desain abstrak dan menerjemahkannya ke dalam kelas Tailwind CSS yang spesifik dan akurat sangat krusial dalam menerapkan palet warna bold minimalism secara konsisten di seluruh aplikasi, memastikan keseragaman visual.

•	**Debugging dan Pemecahan Masalah:** Saat error sintaksis atau logika muncul dalam kode (misalnya, kesalahan pada ProductManagementPage.jsx), model AI mampu mengidentifikasi akar masalah dan menyajikan perbaikan kode yang tepat, secara substansial mengurangi waktu debugging.

•	**Generasi Dokumentasi Teknis:** Seluruh dokumentasi proyek, mulai dari Bab I hingga Bab V, dihasilkan menggunakan kemampuan text generation model AI. Ini mencakup penyusunan penjelasan teknis, ringkasan proses, dan catatan mengenai pelajaran yang didapat selama pengembangan.

•	**Saran dan Peningkatan Fitur:** Model AI juga mampu memberikan ide dan saran untuk fitur-fitur masa depan (seperti penyesuaian biaya pengiriman dinamis, manajemen kategori yang lebih canggih, atau analitik penjualan), membantu dalam perencanaan dan arah pengembangan produk.

Peran AI dalam proyek ini adalah bukti nyata bagaimana teknologi ini dapat **mempercepat proses development, meningkatkan efisiensi, dan memfasilitasi pembuatan dokumentasi teknis** yang komprehensif. Namun, efektivitas kolaborasi dengan AI sangat bergantung pada **kemampuan pengguna untuk berinteraksi dan mengendalikan AI secara efektif** untuk mencapai tujuan yang diinginkan. Banyaknya trial and error yang mungkin terjadi selama proses pengembangan menyoroti kebutuhan esensial untuk **memahami apa yang ingin dicapai dan memberikan perintah atau prompt yang jelas, spesifik, dan aplikatif** kepada model AI. Kemampuan ini sangat penting untuk menavigasi potensi error dan memastikan hasil yang sesuai dengan tujuan proyek.

## 6.4 Refleksi dan Pelajaran yang Didapat

Pengembangan UMKM Storefront adalah proses iteratif yang penuh pembelajaran. Selain tantangan dalam mencapai konsistensi visual palet warna, keterbacaan kontras, kejelasan garis pemisah, dan standarisasi desain tombol, proyek ini juga menghadapi pembelajaran lain yang signifikan:

•	**Penyiapan Lingkungan Awal:** Memastikan semua dependensi (npm install) dan konfigurasi (firebase.js) sudah benar di awal proyek adalah krusial. Kesalahan kecil di tahap ini dapat menyebabkan error yang sulit diidentifikasi di kemudian hari.

•	**Batasan dan Aturan Platform:** Pemahaman akan aturan dan batasan tertentu dari lingkungan pengembangan (misalnya, iFrame Canvas yang membatasi window.alert() atau navigator.clipboard) sangat penting. Ini memaksa penggunaan solusi alternatif (seperti modal kustom atau document.execCommand('copy')) yang lebih tangguh dan sesuai dengan lingkungan.

•	**Persistensi Data Klien:** Isu awal terkait keranjang belanja yang tidak menyimpan data setelah refresh halaman mengajarkan pentingnya persistensi state menggunakan mekanisme seperti localStorage dan React Context API. Ini memastikan pengalaman pengguna yang mulus tanpa kehilangan data penting.

•	**Manajemen Ketergantungan (Dependencies):** Memahami alur data dan ketergantungan antar komponen (misalnya, ProductDetailPage yang bergantung pada data dari Firestore) adalah kunci. Loading state dan penanganan error yang tepat perlu diimplementasikan untuk memberikan feedback yang baik kepada pengguna.

•	**Pentingnya Debugging Iteratif:** Proses debugging yang melibatkan identifikasi error spesifik (seperti kesalahan sintaksis pada ProductManagementPage.jsx), analisis pesan error, dan pengujian solusi secara bertahap, adalah inti dari pengembangan software yang tangguh.

Pelajaran dari proses ini menekankan bahwa pengembangan yang sukses tidak hanya tentang menulis kode, tetapi juga tentang adaptasi, pemecahan masalah, dan pemahaman mendalam terhadap ekosistem teknologi yang digunakan.

## 6.5 Dampak dan Potensi Masa Depan

**UMKM Storefront** memiliki potensi besar untuk memberikan dampak positif signifikan bagi pelaku UMKM. Dengan menyediakan platform e-commerce yang mandiri dan fungsional, aplikasi ini dapat membantu mereka meningkatkan visibilitas online, mengelola operasional dengan lebih efisien, dan pada akhirnya, mendorong pertumbuhan bisnis.

Untuk masa depan, aplikasi ini dapat terus dikembangkan dengan penambahan fitur-fitur canggih seperti:

•	**Penyesuaian Biaya Pengiriman Dinamis:** Mengintegrasikan API layanan logistik untuk perhitungan biaya yang akurat berdasarkan jarak, berat, atau opsi pengiriman.

•	**Integrasi Pembayaran Gateway:** Menghubungkan dengan penyedia pembayaran pihak ketiga untuk otomatisasi transaksi dan pilihan pembayaran yang lebih beragam.

•	**Sistem Manajemen Kategori dan Varian Produk:** Memungkinkan admin untuk mengorganisir produk dengan lebih terstruktur.

•	**Analitik dan Laporan Penjualan Mendalam:** Memberikan insight bisnis yang lebih baik kepada admin.

•	**Fitur Notifikasi Pelanggan dan Admin:** Otomatisasi komunikasi tentang status pesanan atau pesanan baru.

**UMKM Storefront**, yang dibangun dengan fondasi yang kokoh dan dukungan AI, siap untuk beradaptasi dengan kebutuhan pasar yang terus berkembang dan menjadi alat yang berharga bagi UMKM dalam perjalanan digital mereka.




# Bab VII: Panduan Penggunaan Aplikasi dan Pengujian

Bab ini menyediakan panduan komprehensif tentang cara menggunakan aplikasi UMKM Storefront, baik dari perspektif pelanggan maupun admin. Selain itu, bab ini juga menyertakan tips spesifik untuk memandu proses pengujian aplikasi, memastikan semua fitur inti berfungsi sebagaimana mestinya.

## 7.1 Pengenalan

UMKM Storefront dirancang untuk menjadi platform e-commerce yang intuitif dan efisien. Aplikasi ini memiliki dua antarmuka utama:

•	**Antarmuka Pelanggan:** Untuk berbelanja produk, melihat detail, mengelola keranjang, dan melakukan checkout.

•	**Antarmuka Admin:** Untuk pemilik UMKM mengelola produk, pesanan, dan pengaturan toko.

Panduan ini akan membawa Anda melalui alur kerja utama dari kedua antarmuka tersebut.


## 7.2 Penggunaan Aplikasi untuk Pelanggan

Area ini dirancang untuk pengalaman belanja yang mulus.

### 7.2.1 Menjelajahi Produk

1.	**Akses Halaman Produk:** Buka aplikasi dan navigasikan ke "Produk" melalui bilah navigasi (Navbar).

2.	**Melihat Daftar Produk:** Anda akan melihat daftar semua produk yang tersedia dalam format grid card.

3.	**Pencarian:** Gunakan bilah pencarian di bagian atas daftar produk untuk mencari produk berdasarkan nama.

4.	**Filter dan Sortir:** Gunakan dropdown "Urutkan Berdasarkan...", "Semua Kategori", dan "Semua Stok" untuk menyaring atau mengurutkan produk (misalnya, berdasarkan harga, nama, atau ketersediaan stok).

5.	**Melihat Detail Produk:** Klik pada gambar produk atau tombol "Lihat Detail" pada kartu produk untuk melihat informasi lebih lanjut tentang produk tersebut (deskripsi, berat, asal, rating, ulasan).

### 7.2.2 Menambah Produk ke Keranjang

1.	**Di Halaman Detail Produk:** Setelah melihat detail produk, masukkan jumlah yang diinginkan di kolom "Jumlah".

2.	**Tambah ke Keranjang:** Klik tombol "Tambah ke Keranjang". Sebuah alert konfirmasi akan muncul.

3.	**Periksa Stok:** Perhatikan status stok. Jika produk "Stok Habis", tombol "Tambah ke Keranjang" akan dinonaktifkan.

### 7.2.3 Mengelola Keranjang Belanja

1.	**Akses Keranjang:** Navigasikan ke "Keranjang" melalui bilah navigasi.

2.	**Melihat Item Keranjang:** Anda akan melihat daftar semua produk yang telah Anda tambahkan ke keranjang.

3.	**Mengubah Kuantitas:** Gunakan tombol "+" atau "-" di samping setiap item untuk menyesuaikan jumlah produk. Perhatikan bahwa kuantitas tidak bisa kurang dari 1.

4.	**Menghapus Item:** Klik tombol "Hapus" untuk menghilangkan produk dari keranjang Anda. Konfirmasi akan diminta.

5.	**Total Belanja:** Lihat ringkasan total pembayaran Anda di bagian bawah halaman.

6.	**Lanjut Belanja / Kembali:** Gunakan tombol "Lanjut Belanja" untuk kembali ke daftar produk atau tombol "Kembali" untuk ke halaman sebelumnya.

7.	**Lanjutkan ke Checkout:** Klik tombol "Lanjutkan ke Checkout" untuk memulai proses pembelian.


### 7.2.4 Proses Checkout dan Konfirmasi Pesanan

1.	**Isi Informasi Pengiriman:** Di halaman checkout, lengkapi formulir "Informasi Pengiriman" dengan data yang valid (Nama Lengkap, Nomor Telepon, Alamat Lengkap, dan Email opsional).

2.	**Pilih Metode Pembayaran:** Pilih salah satu metode pembayaran yang tersedia: Transfer Bank, E-Wallet, atau Cash On Delivery (COD).

3.	**Ringkasan Pesanan:** Tinjau ringkasan pesanan, termasuk subtotal, biaya pengiriman, dan total pembayaran akhir.

4.	**Buat Pesanan:** Klik tombol "Buat Pesanan Sekarang". Jika berhasil, Anda akan melihat pesan konfirmasi dan diarahkan ke halaman konfirmasi pesanan.

5.	**Halaman Konfirmasi Pesanan:**
* Lihat **ID Pesanan** dan detail pesanan Anda.
* Untuk Transfer Bank/E-Wallet: Akan ada **instruksi pembayaran** dan tombol **"Salin"** untuk nomor rekening. Gunakan tombol **"Kirim Bukti Transfer"** (WhatsApp) untuk konfirmasi ke admin.
* Untuk COD: Ada tombol **"Chat untuk Info COD"** (WhatsApp) untuk menghubungi admin.
* Klik **"Lanjut Belanja"** untuk kembali ke daftar produk.

## 7.3 Penggunaan Aplikasi untuk Admin

Area ini dirancang untuk pemilik UMKM mengelola operasional toko mereka.

### 7.3.1 Login dan Logout Admin

1.	**Akses Halaman Login:** Buka aplikasi dan klik **"Login Admin"** di Navbar.

2.	**Login:** Masukkan **Email** (gunakan admin@umkm.com) dan **Kata Sandi** (umkm99). Klik **"Login"**.

3.	**Dashboard Admin:** Setelah berhasil login, Anda akan diarahkan ke Dashboard Admin.

4.	**Logout:** Untuk keluar, klik tombol **"Logout"** di Dashboard Admin.

### 7.3.2 Mengelola Produk (Manajemen Produk)

1.	**Akses Manajemen Produk:** Dari Dashboard Admin, klik **"Manajemen Produk"**.

2.	**Melihat Daftar Produk:** Anda akan melihat tabel semua produk yang terdaftar.

3.	**Tambah Produk Baru:**
* Klik tombol **"Tambah Produk Baru"**.
* Isi semua detail produk yang diperlukan di formulir yang muncul (Nama, Harga, Stok, URL Gambar, Kategori, Deskripsi opsional, Berat, Asal).
* Klik **"Tambah Produk"** untuk menyimpan.
4.	**Edit Produk:**
   o	Pada baris produk di tabel, klik tombol **"Edit"**.
  	o	Formulir produk akan terisi dengan detail produk yang dipilih.
  	o	Ubah informasi yang diperlukan dan klik **"Perbarui Produk"** untuk menyimpan perubahan.
  	o	Klik **"Batalkan Edit"** untuk keluar dari mode edit tanpa menyimpan.
5.	**Hapus Produk:**
* Pada baris produk di tabel, klik tombol **"Hapus"**.
* Konfirmasi penghapusan akan diminta. Klik **"OK"** jika yakin.

### 7.3.3 Mengelola Pesanan (Manajemen Pesanan)

1.	**Akses Manajemen Pesanan:** Dari Dashboard Admin, klik **"Manajemen Pesanan".**

2.	**Melihat Daftar Pesanan:** Tabel akan menampilkan semua pesanan yang masuk.

3.	**Mengubah Status Pesanan:** Pada kolom **"Status"**, gunakan dropdown untuk mengubah status pesanan (misalnya, dari 'Tertunda' menjadi 'Diproses' atau 'Selesai').

4.	**Melihat Detail Pesanan:** Klik tombol **"Detail"** pada baris pesanan untuk melihat informasi lengkap pesanan di dalam modal pop-up, termasuk detail pelanggan, item, subtotal, biaya pengiriman, dan total.

5.	**Menghapus Pesanan:** Klik tombol **"Hapus"** pada baris pesanan. Konfirmasi akan diminta.

### 7.3.4 Mengelola Pengaturan Toko

1.	**Akses Pengaturan Toko:** Dari Dashboard Admin, klik **"Pengaturan Toko"**.

2.	**Perbarui Informasi Umum Toko:** Isi atau perbarui nama toko, nama pemilik, nomor telepon pemilik, dan nomor WhatsApp admin.

3.	**Perbarui Informasi Rekening Bank:** Isi atau perbarui nama bank, nomor rekening, dan nama pemilik rekening.

4.	**Ubah Kata Sandi Admin:** Gunakan formulir terpisah untuk memperbarui kata sandi login admin Anda (memerlukan kata sandi baru minimal 6 karakter).

5.	**Simpan Pengaturan:** Klik tombol **"Simpan Pengaturan"** untuk menyimpan semua perubahan. Pesan sukses atau error akan muncul.


## 7.4 Tips untuk Pengujian (Bagi Penguji Proyek)

Untuk memastikan semua fungsionalitas berjalan dengan baik, mohon lakukan pengujian berikut:

### 7.4.1 Pengujian Frontend (Pelanggan)

•	**Navigasi:** Pastikan semua tautan di Navbar berfungsi dengan benar (Beranda, Produk, Keranjang, Login Admin).

•	**Daftar Produk:**
- Verifikasi semua produk dimuat dari Firestore.
-  Uji fungsi pencarian, sortir (nama, harga), dan filter (kategori, stok) bekerja dengan benar.
- Pastikan ProductCard menampilkan informasi yang benar.

•	**Detail Produk**:
- Klik setiap ProductCard dan verifikasi halaman detail menampilkan informasi produk yang benar.
- Uji input kuantitas: tidak bisa kurang dari 1.
- Uji tombol "Tambah ke Keranjang" berfungsi.
- Verifikasi tombol "Stok Habis" muncul dan dinonaktifkan jika stok 0.
- Uji pengiriman ulasan baru (berikan rating dan komentar). Perhatikan apakah success message muncul.
- Periksa apakah ulasan baru muncul di daftar ulasan.
- Pastikan "Produk Lainnya Mungkin Anda Suka" menampilkan produk terkait (jika ada).

•	**Keranjang Belanja**:
- Pastikan item yang ditambahkan dari halaman detail muncul di keranjang.
- Uji tombol + dan - untuk mengubah kuantitas.
- Uji tombol "Hapus" berfungsi dan menghapus item.
- Verifikasi total harga dihitung dengan benar.
- Periksa persistensi keranjang: tutup tab browser dan buka kembali, pastikan item masih ada.
- Uji tombol "Lanjut Belanja" dan "Lanjutkan ke Checkout".

•	**Checkout:**
- Isi semua bidang formulir pengiriman. Uji validasi email dan nomor telepon.
- Pilih metode pembayaran yang berbeda.
- Klik "Buat Pesanan Sekarang".
- Verifikasi Anda diarahkan ke halaman konfirmasi pesanan.

•	**Konfirmasi Pesanan:**
- Pastikan detail pesanan (ID, nama, alamat, total, metode pembayaran, item) benar.
- Uji tombol "Salin" (untuk transfer bank) menyalin nomor rekening dengan benar.
- Uji tombol WhatsApp berfungsi dan membuka link dengan pesan yang benar sesuai metode pembayaran.
- Uji tombol "Lanjut Belanja".

### 7.4.2 Pengujian Backend & Admin

•	**Login Admin:**
- Coba login dengan kredensial yang benar (admin@umkm.com, umkm999). Pastikan berhasil diarahkan ke Dashboard.
- Coba login dengan kredensial yang salah. Pastikan pesan error muncul.
- Uji "Lupa kata sandi?". Masukkan email, dan verifikasi alert muncul.

•	**Logout Admin:** Klik tombol **"Logout"** di Dashboard atau Navbar. Pastikan Anda kembali ke halaman login dan tidak dapat mengakses halaman admin tanpa login lagi.

•	**Dashboard Admin:**
- Verifikasi metrik (Total Penjualan, Jumlah Pesanan, Produk Terdaftar, Stok Habis) menampilkan data yang benar dari Firestore.
- Uji tautan cepat (Manajemen Produk, Manajemen Pesanan, Pengaturan Toko) berfungsi.

•	**Manajemen Produk:**
- Tambah Produk: Tambahkan produk baru dengan semua detail. Verifikasi produk muncul di tabel.
- Edit Produk: Edit detail produk yang sudah ada (misalnya, harga, stok, deskripsi, kategori). Verifikasi perubahan tersimpan.
- Hapus Produk: Hapus produk dari daftar. Verifikasi produk hilang dari tabel dan halaman daftar produk pelanggan.
- Uji filter dan sortir di halaman admin.

•	**Manajemen Pesanan:**
- Verifikasi semua pesanan dimuat dari Firestore.
- Uji dropdown status pesanan: Ubah status pesanan (misalnya, 'Tertunda' ke 'Diproses'). Verifikasi perubahan tersimpan.
- Uji tombol "Detail" menampilkan informasi pesanan yang benar (termasuk item dan biaya pengiriman) dalam modal.
- Uji tombol "Hapus" menghapus pesanan.

•	**Pengaturan Toko:**
- Verifikasi pengaturan toko dimuat dengan benar.
- Ubah nama toko, nomor WhatsApp, detail bank. Simpan. Verifikasi perubahan tersimpan dan tampil di Navbar/halaman konfirmasi pesanan.
- Uji fitur "Ubah Kata Sandi Admin". Masukkan kata sandi baru (minimal 6 karakter). Pastikan berhasil diubah. Coba login dengan kata sandi baru.

### 7.4.3 Pengujian Responsivitas

•	Uji setiap halaman pada ukuran layar yang berbeda (desktop, tablet, mobile) dengan mengubah ukuran jendela browser. Pastikan layout tetap rapi dan elemen tidak tumpang tindih.
