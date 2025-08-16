// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Komponen ProductCard menerima objek 'product' sebagai props
function ProductCard({ product }) {
  return (
    // Transformasi dan transisi halus pada hover untuk kesan bold minimalism
    <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer font-inter"> {/* Background #FFFDF5, font-inter */}
      {/* Gambar Produk - kini dengan tinggi tetap dan object-cover untuk simetri */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl || `https://placehold.co/300x192/cccccc/333333?text=${product.name.substring(0, 10)}...`}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x192/cccccc/333333?text=${product.name.substring(0, 10)}...`; }}
        />
      </Link>

      {/* Detail Produk */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Menggunakan dark-neutral */}
        <h3 className="text-lg font-bold text-[#254222] mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        {/* Menggunakan main-accent */}
        <p className="text-[#99cc66] mt-1 text-lg font-semibold">
          Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
        </p>
        {/* Tombol "Lihat Detail" dengan transisi warna dan efek aktif (outline biru) */}
        <Link
          to={`/product/${product.id}`}
          className="mt-4 w-full py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50 text-center inline-block
                     bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#254222]" // Aksen biru untuk tombol
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
