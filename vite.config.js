/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// console.log(import.meta.env);
// https://vitejs.dev/config/
// console.log()
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:8080",
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// });
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  // console.log(process.env.VITE_APP_BACKEND_URL);
  return defineConfig({
    plugins: [react()],

    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_APP_BACKEND_URL,
          secure: false,
        },
      },
    },
  });
};
