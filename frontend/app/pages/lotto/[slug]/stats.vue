<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const VALID_SLUGS = ["539", "big-lotto", "power-lotto"]
const isValidSlug = VALID_SLUGS.includes(slug)
if (!isValidSlug) {
  if (import.meta.server) {
    await navigateTo("/", { redirectCode: 301 })
  } else {
    window.location.href = "/"
  }
}

const LOGO_MAP: Record<string, string> = {
  "539": "/images/logos/539lotto.png",
  "big-lotto": "/images/logos/lotto.png",
  "power-lotto": "/images/logos/power-lotto.png",
  bingo: "/images/logos/bingo-bingo.png",
  "49lotto": "/images/logos/49lotto.png",
  "39lotto": "/images/logos/39lotto.png",
  "4star": "/images/logos/4star.png",
  "3star": "/images/logos/3star.png"
}

const logoSrc = LOGO_MAP[slug] ?? "/images/logos/favicon.png"

const NAME_MAP: Record<string, string> = {
  "539": "今彩539",
  "big-lotto": "大樂透",
  "power-lotto": "威力彩",
  "49lotto": "49樂合彩",
  "39lotto": "39樂合彩",
  "4star": "4星彩",
  "3star": "3星彩"
}
const gameName = NAME_MAP[slug] ?? "台灣彩券"

useSeoMeta({
  title: `${gameName}各期開獎號碼統計分析 - 539樂透分析`,
  description: `查詢${gameName}各期統計數據，包含單雙比例、和值、均值、同尾數、首尾差、尾數和、首數和等專業分析，僅供參考。`,
  ogUrl: `https://www.539lto.co/lotto/${slug}/stats`
})
useHead({
  link: [{ rel: "canonical", href: `https://www.539lto.co/lotto/${slug}/stats` }]
})
</script>

<template>
  <LazyLotteryStats v-if="isValidSlug" :slug="slug" :logoSrc="logoSrc" />
</template>
