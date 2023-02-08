/*
 * @Author: GongWanNan
 * @Date: 2022-12-25 12:19:41
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-30 14:01:25
 * @Description:
 */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
  },
});
