// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mendefinisikan warna kustom
        'primary-background': '#ece2b1', // Krem Pucat Hangat
        'dark-neutral': '#254222',       // Hijau Gelap Sangat Pekat
        'main-accent': '#99cc66',        // Hijau Lumut Terang
        'secondary-neutral': '#cae4c5',  // Hijau Muda Pucat
      },
      fontFamily: { // Menambahkan definisi fontFamily untuk Inter
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
