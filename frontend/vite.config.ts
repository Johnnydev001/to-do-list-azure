import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  preview: {
    host: true,
    port: 5173,
  },
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react()],
  envDir: "./",
});
