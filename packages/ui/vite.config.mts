import path from 'node:path';
import { globSync } from 'glob';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: Object.fromEntries(
        globSync('src/**/index.ts').map(file => [
          path.relative(
            'src',
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      formats: ['es'],
    },
    outDir: path.resolve(process.cwd(), 'dist'),
    rollupOptions: {
      external: ['vue'],
    }
  },
});