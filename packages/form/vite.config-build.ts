import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Vite config for library build only
 * Note: we need to name this file differently from default vite.config.ts, otherwise storybook would pick this up
 */
export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    ssr: true, // disable bundling of node_modules
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["storybook/internal/preview/runtime"],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    dts({
      rollupTypes: true,
    }),
  ],
});
