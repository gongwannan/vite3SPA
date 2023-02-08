/*
 * @Author: GongWanNan
 * @Date: 2022-12-25 12:19:41
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-02-01 15:43:31
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { usePermissionStore } from "./store/permission";
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

// 注册elementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app 挂载 pinia 后再进行与store 有关的操作
app.use(pinia);
// 根据localStorage 信息 初始化主题
import("./composables/theme").then((module) => {
  if (localStorage.getItem("theme")) {
    module.useThemeChange(localStorage.getItem("theme") as "dark" | "light");
  }
});
// 自定义权限指令
const permission = usePermissionStore();
app.directive("permission", {
  mounted(el, binding) {
    if (!permission.currentPermission.includes(String(binding.value))) {
      el["hidden"] = true;
    }
  },
});
app.use(router);
app.mount("#app");
