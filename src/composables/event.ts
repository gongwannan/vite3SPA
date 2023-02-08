/*
 * @Author: GongWanNan
 * @Date: 2023-01-06 10:06:06
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-06 18:15:30
 * @Description:
 */
import { onMounted, onUnmounted } from "vue";

function useEventListener<E extends keyof WindowEventMap>(
  selector: string | Element | (Window & typeof globalThis),
  event: E,
  callback: (this: Window, ev: WindowEventMap[E]) => any
): void {
  let target: any;
  if (typeof selector === "string") {
    target = document.querySelector(selector) || window;
  } else {
    target = selector;
  }
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}

export { useEventListener };
