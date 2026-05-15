<script setup lang="ts">
type Feature = { label: string; value: string }

//TODO: 透過slug選擇開放功能 如果全部開發完畢記得更換
const FEATURES_BY_SLUG: Record<string, Feature[]> = {
  "539": [
    { label: "歷年開獎號碼", value: "history" },
    { label: "分布走勢圖", value: "trend" },
    { label: "各期統計分析", value: "stats" }
  ],
  "big-lotto": [
    { label: "歷年開獎號碼", value: "history" },
    { label: "分布走勢圖", value: "trend" },
    { label: "各期統計分析", value: "stats" }
  ],
  "power-lotto": [{ label: "歷年開獎號碼", value: "history" }]
}

const DEFAULT_FEATURES: Feature[] = [{ label: "歷年開獎號碼", value: "history" }]

const options = [10, 20, 30]

const props = defineProps<{
  logoSrc: string
  gameName: string
  title: string
}>()

const limit = defineModel<number>({ required: true })

const router = useRouter()
const route = useRoute()

const features = computed(() => {
  const slug = route.params.slug as string
  return FEATURES_BY_SLUG[slug] ?? DEFAULT_FEATURES
})

const activeFeature = computed(() => route.path.split("/").pop() ?? "")

const activeLabel = computed(() => features.value.find((f) => f.value === activeFeature.value)?.label)

const featureOpen = ref(false)
const limitOpen = ref(false)

function toggleFeature() {
  featureOpen.value = !featureOpen.value
  limitOpen.value = false
}

function toggleLimit() {
  limitOpen.value = !limitOpen.value
  featureOpen.value = false
}

function selectFeature(value: string) {
  featureOpen.value = false
  const slug = route.params.slug as string
  router.push(`/lotto/${slug}/${value}`)
}

function selectLimit(value: number) {
  limit.value = value
  limitOpen.value = false
}
</script>

<template>
  <div>
    <h1 class="sr-only">{{ gameName }}</h1>

    <!-- Logo 置中 -->
    <div class="flex justify-center mb-4">
      <NuxtImg :src="logoSrc" :alt="gameName" width="200" loading="eager" class="h-[61px] sm:h-[80px] w-auto object-contain" />
    </div>

    <!-- 卡片：title + 兩個下拉 -->
    <div class="rounded-[20px] px-6 py-4 mb-4" style="background-color: #59adbc">
      <h2 class="text-center font-bold text-[#ffe868] sm:text-[30px] text-[20px] mb-3">{{ title }}</h2>
      <hr class="border-[#007979] mb-[24px] mt-[15px]" />

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <!-- 分析類型 -->
        <div class="flex items-center gap-2 flex-1">
          <span class="font-bold text-[#ffe868] sm:text-[20px] text-[16px] shrink-0">分析類型</span>
          <div class="relative flex-1">
            <button
              class="appearance-none w-full px-4 pr-10 rounded-[5px] font-bold text-[#333] bg-white cursor-pointer md:text-[20px] text-[16px] sm:h-[54px] h-[33px] text-left"
              @click="toggleFeature"
            >
              {{ activeLabel }}
            </button>
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#333] text-xs">{{ featureOpen ? "▲" : "▼" }}</span>
            <div v-if="featureOpen" class="absolute left-0 top-full mt-1 bg-white border border-[#007979] rounded z-20 min-w-full shadow">
              <button
                v-for="f in features"
                :key="f.value"
                class="w-full text-left px-4 py-2 sm:text-[20px] text-[16px] hover:bg-gray-100 transition"
                :style="activeFeature === f.value ? 'color:#2db38d; font-weight:bold' : 'color:#545454'"
                @click="selectFeature(f.value)"
              >
                {{ f.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 期號範圍 -->
        <div class="flex items-center gap-2 flex-1">
          <span class="font-bold text-[#ffe868] sm:text-[20px] text-[16px] shrink-0">期號範圍</span>
          <div class="relative flex-1">
            <button
              class="appearance-none w-full px-4 pr-10 rounded-[5px] font-bold text-[#333] bg-white cursor-pointer md:text-[20px] text-[16px] sm:h-[54px] h-[33px] text-left"
              @click="toggleLimit"
            >
              前{{ limit }}期
            </button>
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#333] text-xs">{{ limitOpen ? "▲" : "▼" }}</span>
            <div v-if="limitOpen" class="absolute left-0 top-full mt-1 bg-white border border-[#007979] rounded z-20 min-w-full shadow">
              <button
                v-for="opt in options"
                :key="opt"
                class="w-full text-left px-4 py-2 md:text-[20px] text-[16px] hover:bg-gray-100 transition"
                :style="limit === opt ? 'color:#2db38d; font-weight:bold' : 'color:#545454'"
                @click="selectLimit(opt)"
              >
                前{{ opt }}期
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
