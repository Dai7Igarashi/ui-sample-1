import path from 'node:path';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import { type ModuleFormat } from 'rollup';
import vue from '@vitejs/plugin-vue';

function getOutputFileName(format: ModuleFormat, entryName: string): string {
  const { dir, name } = path.parse(entryName);
  const filename = path.join(dir, name);
  const ext = format === 'es' ? 'mjs' : 'js';
  return `${filename}.${ext}`;
}

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(process.cwd(), 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: getOutputFileName,
    },
    rollupOptions: {
      input: glob.sync("src/**/index.ts"),
      output: {
        preserveModules: true,
        exports: 'named',
        dir: path.resolve(process.cwd(), 'dist'),
      },
      external: ['vue'],
    },
    emptyOutDir: true,
  },
});