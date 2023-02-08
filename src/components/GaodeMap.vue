<!--
 * @Author: gongwannan
 * @Date: 2021-08-30 11:00:05
 * @LastEditTime: 2023-01-17 10:11:13
 * @LastEditors: [GongWanNan]
 * @Description: GaodeMapComponent
-->
<template>
  <div id="container" :style="mapStyle"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef, withDefaults, onMounted } from "vue";
export interface Props {
  options?: {
    viewMode?: string; // 是否为3D地图模式
    zoom?: number; // 初始化地图级别
    center?: [number, number]; // 初始化地图中心点位置
  };
  mapStyle?: {
    height: string;
    width: string;
  };
}
const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {
      viewMode: "3D", // 是否为3D地图模式
      zoom: 5, // 初始化地图级别
      center: [105.602725, 105.602726], // 初始化地图中心点位置
    };
  },
  mapStyle: () => {
    return {
      height: "100vh",
      width: "100vw",
      background: "black",
    };
  },
});
const map = shallowRef(null);
function initMap() {
  AMapLoader.load({
    key: "8523fafcacb624c3a5f1f93ad93a2175",
    version: "2.0",
    plugins: ["AMap.Scale"],
  })
    .then((AMap: any) => {
      map.value = new AMap.Map("container", props.options);
    })
    .catch((e: Error) => {
      console.log(e);
    });
}
onMounted(() => {
  initMap();
});
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
}
</style>
