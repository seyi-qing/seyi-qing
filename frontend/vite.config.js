import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React config. No extras needed — the project
// intentionally avoids a CSS framework so it stays easy to reskin.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
