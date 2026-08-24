import { resolve } from 'path';
import { defineConfig } from 'vite';

/**
 * xui 构建配置
 * - 入口：packages/index.js（聚合各组件）
 * - 产物：ESM (xui.js) + UMD (xui.umd.cjs)
 * - 样式：自动抽取为 dist/xui.css
 */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'xui',
      fileName: (format) => (format === 'es' ? 'xui.js' : 'xui.umd.cjs'),
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) return 'xui.css';
          return 'assets/[name][extname]';
        },
        exports: 'named',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {},
      less: {},
    },
  },
});
