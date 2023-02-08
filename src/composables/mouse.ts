/*
 * @Author: GongWanNan
 * @Date: 2023-01-06 09:31:25
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-06 18:04:02
 * @Description: mouse composable
 */
import { useEventListener } from "./event";
import { ref } from "vue";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  useEventListener(window, "mousemove", (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  });
  return { x, y };
}
