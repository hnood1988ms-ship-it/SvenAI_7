// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import react from "@vitejs/plugin-react";
// @ts-ignore
import fs from "node:fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import { defineConfig } from "vite";
// @ts-ignore
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const plugins = [react(), tailwindcss(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(__dirname),
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
