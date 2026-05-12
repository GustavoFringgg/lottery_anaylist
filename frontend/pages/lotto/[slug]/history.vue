<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const LOGO_MAP: Record<string, string> = {
  "539": "/images/logos/539lotto.png",
  "big-lotto": "/images/logos/lotto.png"
}

const logoSrc = LOGO_MAP[slug] ?? "/images/logos/favicon.png"

const NAME_MAP: Record<string, string> = {
  "539": "今彩539",
  "big-lotto": "大樂透"
}
const gameName = NAME_MAP[slug] ?? "台灣彩券"

useSeoMeta({
  title: `${gameName}歷史開獎號碼查詢 - 539樂透分析`,
  description: `查詢${gameName}完整歷史開獎號碼紀錄，資料每期自動更新，僅供參考。`,
  ogUrl: `https://www.539lto.co/lotto/${slug}/history`
})
useHead({
  link: [{ rel: "canonical", href: `https://www.539lto.co/lotto/${slug}/history` }]
})
</script>

<template>
  <LotteryHistory :slug="slug" :logoSrc="logoSrc" />
</template>
