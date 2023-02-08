/*
 * @Author: GongWanNan
 * @Date: 2023-01-28 13:59:07
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-29 14:48:41
 * @Description:
 */
import { defineStore } from "pinia";
import { useUserInfoStore } from "./userInfo";

interface ObjectList {
  [key: string]: string[];
}
export const usePermissionStore = defineStore("permission", {
  state: () => {
    return {
      leftMenu: [],
      defaultList: <ObjectList>{
        admin: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
        ],
        user: ["1", "2", "3", "11", "13", "14", "15"],
      },
    };
  },
  getters: {
    currentPermission: (state) => {
      const { userName } = useUserInfoStore();
      if (["admin", "user"].includes(userName)) {
        return state.defaultList[userName];
      } else {
        return state.leftMenu;
      }
    },
  },
});
