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
  title: `${gameName}號碼分布走勢圖 - 539樂透分析`,
  description: `${gameName}歷史開獎號碼分布走勢圖，視覺化呈現各號碼出現頻率與趨勢，僅供參考。`,
  ogUrl: `https://www.539lto.co/lotto/${slug}/trend`
})
useHead({
  link: [{ rel: "canonical", href: `https://www.539lto.co/lotto/${slug}/trend` }]
})
</script>

<template>
  <LotteryTrend :slug="slug" :logoSrc="logoSrc" />
</template>
