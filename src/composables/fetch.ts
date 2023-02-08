/*
 * @Author: GongWanNan
 * @Date: 2023-01-06 11:07:49
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-06 11:49:09
 * @Description:
 */
import { ref, unref, isRef, watchEffect, type Ref } from "vue";

export function useFetch(url: string | Ref<string>) {
  const data = ref(null);
  const error = ref(null);
  function doFetch() {
    // 每次请求前重置数据
    data.value = null;
    error.value = null;

    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => {
        data.value = json;
      })
      .catch((err) => {
        error.value = err;
      });
  }
  // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }
  return { data, error };
}
