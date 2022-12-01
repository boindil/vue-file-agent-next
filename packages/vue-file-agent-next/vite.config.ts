/// <reference types="vitest" />

import {defineConfig, PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {visualizer} from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

const config = defineConfig({
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/VueFileAgent.ts'),
      name: 'vue-file-agent-next',
      fileName: (format) => `vue-file-agent-next.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: `vue-file-agent-next.[ext]`, //without this, it generates build/styles.css
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  css: {preprocessorOptions: {scss: {charset: false}}},

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    visualizer() as PluginOption, // generates admin/stats.html on pnpm run build
    dts({skipDiagnostics: false}),
  ],

  server: {
    host: true,
  },

  test: {
    // globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
    },
  },
})

export default config
