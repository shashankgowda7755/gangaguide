import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: path.resolve(import.meta.dirname, "client"),
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "client/src") } },
  define: { "import.meta.env.VITE_SITE_URL": JSON.stringify(process.env.SITE_URL ?? "") },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => (id.includes("node_modules/react") || id.includes("node_modules/scheduler") ? "react" : undefined),
      },
    },
  },
});
