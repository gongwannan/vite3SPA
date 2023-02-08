<!--
 * @Author: GongWanNan
 * @Date: 2023-01-28 17:04:14
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-02-01 09:23:27
 * @Description: 
-->
<template>
  <div class="header">
    <!-- 折叠侧边栏按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="sidebar.collapse">
        <Expand />
      </el-icon>
      <el-icon v-else>
        <Fold />
      </el-icon>
    </div>
    <div class="logo">Vue singlePage APP</div>
    <div class="header-right">
      <!-- 手动黑色白色主题切换 -->
      <VPSwitchAppearance></VPSwitchAppearance>
      <!-- 消息中心 -->
      <div class="btn-bell">
        <el-tooltip
          :effect="theme"
          :content="message.num ? `有${message.num}条未读消息` : `消息中心`"
          placement="bottom"
        >
          <el-icon>
            <Bell />
          </el-icon>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message.num">{{ message.num }}</span>
      </div>
      <!-- 用户头像 -->
      <el-avatar
        class="user-avatar"
        :size="30"
        :src="imgUrl ? imgUrl : '/src/assets/img/img.jpg'"
      ></el-avatar>
      <!-- 头像下拉菜单 -->
      <el-dropdown class="username" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" title="user name">
          {{ userInfo.userName }}
          <el-icon class="el-icon--right">
            <arrow-down></arrow-down>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logOut" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from "@/store/sidebar";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useUserInfoStore } from "../store/userInfo";
import { useThemeStore } from "@/store/theme";

interface Message {
  title: string;
  content: string;
}
interface AllMessage {
  num: number;
  arr: Message[];
}
const { userInfo } = storeToRefs(useUserInfoStore());
const sidebar = useSidebarStore();
const message: AllMessage = reactive({ num: 10, arr: [] });
const imgUrl = "";
const { theme } = storeToRefs(useThemeStore());
// methods
function collapseChange() {
  sidebar.handleCollapse();
}
function handleCommand() {}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  padding: 0 21px;
  cursor: pointer;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  width: 300px;
  float: right;
  padding-right: 50px;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}

.user-name {
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
