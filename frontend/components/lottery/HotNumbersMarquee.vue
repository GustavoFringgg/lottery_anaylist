<script setup lang="ts">
const props = defineProps<{ slug?: string }>()

const { fetchIfNeeded, getHotBySlug, hotCache } = useHotNumbers()

await useAsyncData("hot-numbers", () => fetchIfNeeded())

const displayItems = computed(() => {
  if (props.slug) {
    const game = getHotBySlug(props.slug)
    if (!game) return []
    return [{ name: game.name, numbers: game.hot_numbers, special: game.hot_special, isPowerLotto: game.name === "威力彩" }]
  }

  if (!hotCache.value) return []
  return Object.values(hotCache.value).map((g) => ({
    name: g.name,
    numbers: g.hot_numbers,
    special: g.hot_special,
    isPowerLotto: g.name === "威力彩"
  }))
})
</script>

<template>
  <div
    v-if="displayItems.length"
    class="w-full overflow-hidden flex items-center h-[60px] md:h-[140px]"
    style="background: linear-gradient(to bottom, #59adbc, #caf7ff)"
  >
    <div class="animate-marquee whitespace-nowrap">
      <template v-for="i in 2" :key="i">
        <span class="font-black text-white mr-16 md:text-[70px] text-[40px]">前10期常出現號碼</span>
        <span v-for="item in displayItems" :key="`${i}-${item.name}`" class="font-black text-white mr-16 md:text-[70px] text-[40px]">
          {{ item.name }}
          <template v-if="item.isPowerLotto">
            第一區 {{ item.numbers.map((n) => String(n).padStart(2, "0")).join(" ") }}
            <template v-if="item.special && item.special.length">第二區 {{ item.special.map((n) => String(n).padStart(2, "0")).join(" ") }}</template>
          </template>
          <template v-else>
            {{ item.numbers.map((n) => String(n).padStart(2, "0")).join(" ") }}
          </template>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  display: inline-block;
  animation: marquee 40s linear infinite;
}
</style>
