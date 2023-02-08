import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeColor", {
  state: () => {
    const backgroundColor = getComputedStyle(document.body).getPropertyValue(
      "--vp-c-bg"
    );
    const textColor = getComputedStyle(document.body).getPropertyValue(
      "--vp-c-text-1"
    );
    return { backgroundColor, textColor };
  },
  getters: {
    theme: (state) => {
      return state.backgroundColor.includes("fff") ? "light" : "dark";
    },
  },
  actions: {
    changeBackgroundColor(val: string) {
      this.backgroundColor = val;
    },
    changeTextColor(val: string) {
      this.textColor = val;
    },
  },
});
