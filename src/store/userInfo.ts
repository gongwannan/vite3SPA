/*
 * @Author: GongWanNan
 * @Date: 2023-01-29 09:51:11
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-29 10:14:32
 * @Description:
 */
import { defineStore } from "pinia";
import { reactive, computed } from "vue";

interface UserInfo {
  userName: string;
}
export const useUserInfoStore = defineStore("userInfo", () => {
  let userInfo: UserInfo = reactive({
    userName: "admin",
  });
  const userName = computed(() => userInfo.userName);
  function saveUser(params: UserInfo) {
    userInfo = params;
  }
  return { userInfo, userName, saveUser };
});
