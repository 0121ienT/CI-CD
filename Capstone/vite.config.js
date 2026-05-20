import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/ml-data-engineering/Capstone/" : "/",
  plugins: [react()],
});
