<!--
 * @Author: GongWanNan
 * @Date: 2023-01-04 17:14:45
 * @LastEditors: [GongWanNan]
 * @LastEditTime: 2023-01-11 15:21:21
 * @Description: 
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const x = ref(1);
const y = ref(2);
const update = (e: any) => {
  x.value = e.pageX;
  y.value = e.pageY;
};
onMounted(() => {
  window.addEventListener("mousemove", update);
});
onUnmounted(() => {
  window.addEventListener("mousemove", update);
});
</script>
<template>
  <slot name="mouse" :x="x" :y="y"></slot>
</template>
