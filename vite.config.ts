import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
// https://vitejs.dev/config/

console.log(process.env.MSW === "true");

export default defineConfig({
  plugins: [
    react(),
    replace({
      "mock/browser": () =>
        process.env.MSW === "true" ? "mock/browser" : "_empty",
    }),
  ],
});
