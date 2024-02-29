import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: 'src/scanner.ts',
      name: 'scanner',
      fileName: 'scanner',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [/^node:.*$/],
    },
    minify: 'terser',
  },
});
