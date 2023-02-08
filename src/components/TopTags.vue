<!--
 * @Author: GongWanNan
 * @Date: 2023-01-29 15:20:02
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-02-01 09:33:58
 * @Description: 
-->
<template>
  <div class="tags" v-if="tags.show">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tags.list"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <el-icon @click="closeTag(index)"><Close /></el-icon>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useTagsStore } from "@/store/tags";

const router = useRouter(),
  route = useRoute(),
  tags = useTagsStore();
function isActive(path: string) {
  return route.path === path;
}
// 监听tagsStore list变化存储到本地
tags.$subscribe(() => {
  localStorage.setItem("tagList", JSON.stringify(tags.list));
});
// 关闭单个标签
function closeTag(index: number) {
  const delItem = tags.list[index];
  tags.delTagsItem(index);
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
  if (item) {
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push("/");
  }
}
// 设置标签
const setTags = (route: any) => {
  const isExist = tags.list.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    if (tags.list.length >= 8) tags.delTagsItem(0);
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    });
  }
};
setTags(route);
onBeforeRouteUpdate((to) => {
  setTags(to);
});

// 关闭全部标签
const closeAll = () => {
  tags.clearTags();
  router.push("/");
};
// 关闭其他标签
const closeOther = () => {
  const curItem = tags.list.filter((item) => {
    return item.path === route.fullPath;
  });
  tags.closeTagsOther(curItem);
};
const handleTags = (command: string) => {
  command === "other" ? closeOther() : closeAll();
};
</script>

<style lang="scss" scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  padding-right: 120px;
  box-shadow: 0 5px 10px var(--vp-c-bg-soft-down);
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  display: flex;
  align-items: center;
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  border: 1px solid #e9eaec;
  padding: 0 5px 0 12px;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  box-shadow: -3px 0 15px 3px var(--vp-c-bg-soft-down);
  z-index: 10;
}
// active inactive
.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li.active .tags-li-title {
  color: #fff;
}
.tags-li.active {
  border: 1px solid #409eff;
  background-color: #409eff;
}
</style>
