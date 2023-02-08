import sideMenu from '@assets/sideMenu.json';
<!--
 * @Author: GongWanNan
 * @Date: 2023-01-29 14:02:08
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-31 10:56:48
 * @Description: 
-->
<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :collapse="sidebar.collapse"
      :default-active="route.path"
      router
      unique-opened
      v-bind="menuTheme"
    >
      <template v-for="item in sideMenu">
        <template v-if="item.subs">
          <el-sub-menu
            :index="item.index"
            :key="item.index"
            v-permission="item.permission"
          >
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
                v-permission="item.permission"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index + 1"
                v-permission="item.permission"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            v-permission="item.permission"
          >
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from "@/store/sidebar";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import { useThemeStore } from "@/store/theme";
import { storeToRefs } from "pinia";
const sidebar = useSidebarStore();
const route = useRoute();
const { backgroundColor, textColor } = storeToRefs(useThemeStore());
const menuTheme = reactive({
  "background-color": backgroundColor,
  "text-color": textColor,
  "active-text-color": "#20a0ff",
});

const sideMenu = [
  {
    icon: "Odometer",
    index: "/dashboard",
    title: "系统首页",
    permission: "1",
  },
  {
    icon: "Calendar",
    index: "1",
    title: "表格相关",
    permission: "2",
    subs: [
      {
        index: "/table",
        title: "常用表格",
        permission: "2",
      },
      {
        index: "/import",
        title: "导入Excel",
        permission: "2",
      },
      {
        index: "/export",
        title: "导出Excel",
        permission: "2",
      },
    ],
  },
  {
    icon: "DocumentCopy",
    index: "/tabs",
    title: "tab选项卡",
    permission: "3",
  },
  {
    icon: "Edit",
    index: "3",
    title: "表单相关",
    permission: "4",
    subs: [
      {
        index: "/form",
        title: "基本表单",
        permission: "5",
      },
      {
        index: "/upload",
        title: "文件上传",
        permission: "6",
      },
      {
        index: "4",
        title: "三级菜单",
        permission: "7",
        subs: [
          {
            index: "/editor",
            title: "富文本编辑器",
            permission: "8",
          },
          {
            index: "/markdown",
            title: "markdown编辑器",
            permission: "9",
          },
        ],
      },
    ],
  },
  {
    icon: "Setting",
    index: "/icon",
    title: "自定义图标",
    permission: "10",
  },
  {
    icon: "PieChart",
    index: "/charts",
    title: "charts图表",
    permission: "11",
  },
  {
    icon: "Warning",
    index: "/permission",
    title: "权限管理",
    permission: "13",
  },
  {
    icon: "CoffeeCup",
    index: "/donate",
    title: "支持作者",
    permission: "14",
  },
];
</script>
<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
