// src/firebase/firebase.js
// Mengimpor fungsi yang diperlukan dari Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Untuk Cloud Firestore
import { getAuth } from 'firebase/auth';     // Untuk Autentikasi Firebase

// TODO: Ganti dengan konfigurasi proyek web Firebase Anda sendiri
// Konfigurasi Firebase Anda dari konsol Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGtu4tyP4MZM7bV2hLnRKfBlvVE1GZMtk",
  authDomain: "umkm-storefront.firebaseapp.com",
  projectId: "umkm-storefront",
  storageBucket: "umkm-storefront.firebasestorage.app",
  messagingSenderId: "967939712529",
  appId: "1:967939712529:web:a65b578bdc8296e54db3b0"
  // measurementId: "YOUR_MEASUREMENT_ID" // Mungkin ada atau tidak ada
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor instance layanan Firebase yang akan Anda gunakan
const db = getFirestore(app); // Instance Firestore
const auth = getAuth(app);     // Instance Autentikasi

export { db, auth };
