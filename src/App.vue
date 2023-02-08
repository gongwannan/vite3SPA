<!--
 * @Author: GongWanNan
 * @Date: 2022-12-25 12:19:41
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-31 10:51:04
 * @Description: 
-->
<script setup lang="ts">
import { RouterView } from "vue-router";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useThemeInit } from "./composables/theme";
import { onMounted } from "vue";
onMounted(() => {
  useThemeInit();
});
</script>

<template>
  <!-- use route.meta.keepAlive decide how to deal with routeComponents -->
  <main>
    <el-config-provider :locale="zhCn">
      <router-view v-slot="{ Component }">
        <keep-alive v-if="$route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </router-view>
    </el-config-provider>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}
</style>
