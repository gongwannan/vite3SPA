import { useThemeStore } from "@/store/theme";

const getBackgroundColor = () => {
  return getComputedStyle(document.body).getPropertyValue("--vp-c-bg");
};
const getTextColor = () => {
  return getComputedStyle(document.body).getPropertyValue("--vp-c-text-1");
};
const classList = document.documentElement.classList;

export function useThemeChange(key: "dark" | "light") {
  classList[key === "dark" ? "add" : "remove"]("dark");
  // 将主题信息存储到localStorage 中
  localStorage.setItem("theme", key);
  const { changeBackgroundColor, changeTextColor } = useThemeStore();
  changeBackgroundColor(getBackgroundColor());
  changeTextColor(getTextColor());
}
export function useThemeInit() {
  const { changeBackgroundColor, changeTextColor } = useThemeStore();
  // 获取当前默认主题，并且在主题更改时跟随变化
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  if (themeMedia.matches) {
    classList.remove("dark");
  } else {
    classList.add("dark");
  }
  changeBackgroundColor(getBackgroundColor());
  changeTextColor(getTextColor());
  themeMedia.addEventListener("change", () => {
    changeBackgroundColor(getBackgroundColor());
    changeTextColor(getTextColor());
  });
}
