<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const VALID_SLUGS = ["539", "big-lotto", "power-lotto", "bingo", "49lotto", "39lotto", "4star", "3star"]
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
  title: `${gameName}各期開獎號碼分布走勢圖 - 539樂透分析`,
  description: `${gameName}歷史開獎號碼分布走勢圖，視覺化呈現各號碼出現頻率與趨勢，僅供參考`,
  ogUrl: `https://www.539lto.co/lotto/${slug}/trend`
})
useHead({
  link: [{ rel: "canonical", href: `https://www.539lto.co/lotto/${slug}/trend` }]
})
</script>

<template>
  <LotteryTrend v-if="isValidSlug" :slug="slug" :logoSrc="logoSrc" />
</template>
