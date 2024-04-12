import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_PUBLIC_URL": JSON.stringify(
      "/admin-panel-hadramaut-react.vercel.app/"
    ),
  },
});
