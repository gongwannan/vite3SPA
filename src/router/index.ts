/*
 * @Author: GongWanNan
 * @Date: 2022-12-25 12:19:41
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-30 15:26:36
 * @Description:router
 */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {
            title: "系统首页",
            permission: "1",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "@/views/subViews/DashboardView.vue"
            ),
        },
        {
          path: "/table",
          name: "table",
          meta: {
            title: "表格",
            permission: "2",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "@/views/subViews/TableView.vue"
            ),
        },
      ],
      meta: {
        transition: "slide-fade",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
  ],
});

export default router;
