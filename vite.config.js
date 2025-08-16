    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    // Import plugin Tailwind CSS khusus untuk Vite
    import tailwindcss from '@tailwindcss/vite'; // <-- Perhatikan perubahan ini!

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        react(),
        tailwindcss(), // <-- Aktifkan plugin Tailwind CSS untuk Vite di sini
      ],
      // Konfigurasi PostCSS di sini tidak lagi diperlukan secara eksplisit jika menggunakan @tailwindcss/vite
      // Namun, jika Anda memiliki plugin PostCSS lain di masa depan, Anda mungkin perlu mengaktifkannya di sini.
      // css: {
      //   postcss: {
      //     plugins: [
      //       autoprefixer(),
      //     ],
      //   },
      // },
    });
    