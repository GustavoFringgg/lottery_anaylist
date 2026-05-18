<script setup lang="ts">
import { menuItems } from "~/constants"
</script>

<template>
  <div class="grid grid-cols-2 gap-2 p-2 md:hidden w-full max-w-[1200px] mx-auto">
    <NuxtLink
      v-for="item in menuItems"
      :key="item.label"
      :to="item.to || '/'"
      class="flex items-center gap-3 px-3 py-2 rounded-lg"
      style="background-color: #3a96a6"
    >
      <NuxtImg :src="item.logo" :alt="item.label" width="80" loading="lazy" class="h-10 w-[80px] object-contain shrink-0" />
      <span class="text-white font-medium text-[16px]">分析參考</span>
    </NuxtLink>
  </div>
</template>
