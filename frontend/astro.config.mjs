import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  vite: {
    server: {
      proxy: {
        '/api/haskell': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => '/calculate'
        },
        '/api/python': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          rewrite: (path) => '/calculate'
        },
        '/api/ocaml': {
          target: 'http://localhost:3003',
          changeOrigin: true,
          rewrite: (path) => '/calculate'
        },
        '/api/php': {
          target: 'http://localhost:3004',
          changeOrigin: true,
          rewrite: (path) => '/'
        }
      }
    }
  }
});