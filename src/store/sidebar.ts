/*
 * @Author: GongWanNan
 * @Date: 2023-01-28 13:59:07
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-28 17:56:41
 * @Description:
 */
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => {
    return {
      collapse: false,
    };
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});
