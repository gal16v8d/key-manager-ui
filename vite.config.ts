import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      port: 5174,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          //changeOrigin: true,
          secure: false,
        },
        '/auth': {
          target: env.VITE_API_URL,
          //changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
