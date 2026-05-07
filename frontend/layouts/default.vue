<script setup lang="ts">
import { menuItems } from '~/constants'
const NuxtLinkComponent = resolveComponent("NuxtLink")
</script>

<template>
  <div class="min-h-screen bg-cream relative flex flex-col">
    <!-- Header -->
    <header style="background-color: #59adbc">
      <!-- 主 Logo -->
      <div class="flex items-center justify-center py-2.5">
        <NuxtLink to="/">
          <img src="../public/images/logos/539lotto_header.png" alt="539樂翻天" class="h-[44px] sm:h-[90px] w-auto object-contain" />
        </NuxtLink>
      </div>
      <!-- 白色分隔線 -->
      <div class="hidden sm:block w-[95%] h-px bg-white mx-auto"></div>
      <!-- 遊戲 Logo 導覽列 -->
      <nav class="hidden sm:flex items-center justify-center gap-8 px-4 py-3">
        <!-- TODO: 如果有所有 label 都有導航的話 要改使用 NuxtLink 處理 -->
        <component
          v-for="item in menuItems"
          :key="item.label"
          :is="item.to ? NuxtLinkComponent : 'span'"
          :to="item.to || undefined"
          class="flex flex-col items-center gap-1 group"
        >
          <img
            :src="item.logo"
            :alt="item.label"
            loading="lazy"
            class="w-[120px] h-[70px] object-contain group-hover:opacity-80 transition-opacity"
          />
          <span class="text-[20px] text-white font-medium">分析參考</span>
        </component>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1 px-2 py-3 sm:px-4">
      <slot />
    </main>

    <div class="text-center text-xl text-gray-500 px-4 py-3 leading-relaxed">
      <p>網站提供公益彩券開獎結果資訊與數據統計分析，僅供參考。所有開獎資訊應以官方公告為準。</p>
      <p>投注不過度，助人又樂己。未滿18歲不得購買或兌領彩券。</p>
    </div>

    <footer class="py-4 text-center text-xs text-white" style="background-color: #59adbc"></footer>
  </div>
</template>
