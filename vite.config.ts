import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Icons from 'unplugin-icons/vite'
import Pages from 'vite-plugin-pages'
import IconsResolver from 'unplugin-icons/resolver'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      vueTemplate: true,
    }),
    Components({
      dirs: ['./src/components'],
      dts: true,
      deep: true,
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
        PrimeVueResolver()
      ],
    }),
    DefineOptions({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/],
    }),
    Icons({
      autoInstall: true,
    }),
    Pages({
      dirs: ['./src/pages'],
      onRoutesGenerated: routes => [
        ...routes,
      ],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3000,
  }
})
