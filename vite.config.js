import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        asistentes: path.resolve(__dirname, 'src/servicio-asistentes.html'),
        automatizacion: path.resolve(__dirname, 'src/servicio-automatizacion.html'),
      },
    },
  },
});
