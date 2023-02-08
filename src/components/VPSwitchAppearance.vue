<template>
  <VPSwitch
    class="VPSwitchAppearance"
    aria-label="toggle dark mode"
    :aria-checked="checked"
    @click="toggle"
  >
    <VPIconSun class="sun" />
    <VPIconMoon class="moon" />
  </VPSwitch>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import VPSwitch from "./VPSwitch.vue";
import VPIconSun from "./icons/VPIconSun.vue";
import VPIconMoon from "./icons/VPIconMoon.vue";
import { useThemeChange } from "../composables/theme";

const checked = ref(false);
const query = window.matchMedia("(prefers-color-scheme: light)");

onMounted(() => {
  checked.value = query.matches;
});

function toggle() {
  checked.value = !checked.value;
  if (!checked.value) {
    useThemeChange("dark");
  } else {
    useThemeChange("light");
  }
}
</script>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
