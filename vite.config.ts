import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/

// console.log(process.env.MOCK === "true");

export default defineConfig({
  plugins: [react(), removeMock()],
});

// 根据环境变量控制 mock-service-worker 代码
function removeMock() {
  return {
    name: "remove-mock",
    resolveId(id) {
      if (id.includes("mock/browser")) {
        return id;
      }
    },
    load(id) {
      if (id.includes("mock/browser") && process.env.MOCK !== "true") {
        return `export default {}`;
      }
    },
  };
}
