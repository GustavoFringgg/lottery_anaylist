<script setup lang="ts">
//TODO: 這裏思考是否可以合併
const route = useRoute()
const slug = route.params.slug as string

// 如果不要開放使用 就在VALID_SLUGS[]
const VALID_SLUGS: string[] = ["539", "big-lotto"]
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
  title: `${gameName}歷史開獎號區分佈圖 - 539樂透分析`,
  description: `查詢${gameName}完整歷史開獎號碼區分佈圖，僅供參考。`,
  ogUrl: `https://www.539lto.co/lotto/${slug}/zone`
})
useHead({
  link: [{ rel: "canonical", href: `https://www.539lto.co/lotto/${slug}/zone` }]
})
</script>

<template>
  <LotteryZone v-if="isValidSlug" :slug="slug" :logoSrc="logoSrc" />
</template>
