import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        asistentes: path.resolve(__dirname, 'servicio-asistentes.html'),
        automatizacion: path.resolve(__dirname, 'servicio-automatizacion.html'),
        'service-page': path.resolve(__dirname, 'js/service-page.js'),
      },
    },
  },
});
