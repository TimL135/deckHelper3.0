///<reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/

export default defineConfig({
  build: {
    outDir: './docs',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
      manifest: {
        background_color: '#000000',
        theme_color: '#7E1F86',
        name: 'deckBuilderHelper2.5',
        short_name: 'deckHelper2.5',
        start_url: '/deckBuildHelper2.0/',
        display: 'standalone',
        icons: [
          {
            src: '![cardBackside](public/img/cardBackside.png)',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  server: {
    port: 8080,
    host: true,
    hmr: {
      host: 'localhost',
    },
  },
  base: './',
});
