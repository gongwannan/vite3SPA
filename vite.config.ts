/*
 * @Author: GongWanNan
 * @Date: 2022-12-25 12:19:41
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-29 09:39:48
 * @Description:
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // ElementComponentsPlus 按需引入
    AutoImport({ resolvers: ElementPlusResolver() }),
    Components({ resolvers: ElementPlusResolver() }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["vue"],
  },
});
