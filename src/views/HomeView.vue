<!--
 * @Author: GongWanNan
 * @Date: 2023-01-28 17:02:23
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-02-01 15:06:20
 * @Description: 
-->
<template>
  <HeaderMenu></HeaderMenu>
  <SideBar></SideBar>
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <TopTags></TopTags>
    <div class="content">
      <RouterView v-slot="{ Component, route }">
        <Transition
          :name="
            typeof route.meta.transition === 'string'
              ? route.meta.transition
              : 'fade'
          "
          mode="out-in"
        >
          <KeepAlive :include="tags.nameList">
            <Suspense>
              <template #default>
                <component
                  :is="Component"
                  :key="route.meta.usePathKey ? route.path : undefined"
                />
              </template>
              <template #fallback> Loading... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from "../store/sidebar";
import { useTagsStore } from "../store/tags";

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>

<style lang="scss" scoped>
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}

.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content-collapse {
  left: 65px;
}
</style>
