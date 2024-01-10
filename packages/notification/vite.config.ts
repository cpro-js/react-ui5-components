import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    ssr: true, // disable bundling of node_modules
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
});
