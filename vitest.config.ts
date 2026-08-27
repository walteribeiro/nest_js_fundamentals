import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
  plugins: [
    // SWC é necessário para emitir os metadados de decorators usados pela DI do Nest
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
