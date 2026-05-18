<script setup lang="ts">
import { Bar } from "vue-chartjs"
import { formatDate } from "~/utils/formatDate"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

if (import.meta.client) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels)
}

const props = defineProps<{
  slug: string
  logoSrc: string
}>()

const { getDraws } = useLotteryApi()
const limit = ref(10)

type ZoneRow = {
  term: string
  date: string
  drawnSet: Set<number>
  special: number | null
}

const { data } = await useAsyncData(`lottery-zone-${props.slug}`, () => getDraws(props.slug, limit.value), {
  watch: [limit]
})

type ZoneDef = { start: number; end: number; color: string }
type ZoneConfig = { title: string; zones: ZoneDef[] }

const ZONE_CONFIG: Record<string, ZoneConfig> = {
  "539": {
    title: "三分區分布圖",
    zones: [
      { start: 1, end: 13, color: "#F6AD00" },
      { start: 14, end: 26, color: "#F58642" },
      { start: 27, end: 39, color: "#72C3EF" }
    ]
  },
  "big-lotto": {
    title: "七分區分布圖",
    zones: [
      { start: 1, end: 7, color: "#F6AD00" },
      { start: 8, end: 14, color: "#F58642" },
      { start: 15, end: 21, color: "#BC6834" },
      { start: 22, end: 28, color: "#007979" },
      { start: 29, end: 35, color: "#004A4A" },
      { start: 36, end: 42, color: "#4C99C2" },
      { start: 43, end: 49, color: "#006094" }
    ]
  }
}

const NUMBER_RANGE: Record<string, number> = {
  "539": 39,
  "big-lotto": 49,
  "power-lotto": 38,
  bingo: 80,
  "39lotto": 39,
  "49lotto": 49
}

const zoneConfig = ZONE_CONFIG[props.slug]
const maxNumber = NUMBER_RANGE[props.slug] ?? 0
const numberRange = Array.from({ length: maxNumber }, (_, i) => i + 1)
const gameName = computed(() => data.value?.name ?? "")

const rows = computed(() =>
  (data.value?.draw_list ?? []).map((item) => ({
    term: item.term,
    date: formatDate(item.draw_date).date,
    drawnSet: new Set(item.numbers),
    special: item.special ?? null
  }))
)

const tableWidth = computed(() => 120 + 110 + 30 * maxNumber)

function getZoneColor(n: number): string {
  const zone = zoneConfig?.zones.find((z) => n >= z.start && n <= z.end)
  return zone?.color ?? "#ffffff"
}

function cellStyle(row: ZoneRow, n: number) {
  if (row.special === n) return { background: "#FF0000", color: "white", fontWeight: "bold" }
  if (row.drawnSet.has(n)) return { background: getZoneColor(n), color: "white", fontWeight: "bold" }
  return { background: "white" }
}

function headerCellStyle(n: number) {
  return { background: getZoneColor(n), color: "white" }
}

const zoneStats = computed(() => {
  const counts = new Array(zoneConfig?.zones.length ?? 0).fill(0)
  for (const item of data.value?.draw_list ?? []) {
    const allNumbers = [...item.numbers, ...(item.special != null ? [item.special] : [])]
    for (const n of allNumbers) {
      const idx = zoneConfig?.zones.findIndex((z) => n >= z.start && n <= z.end) ?? -1
      if (idx !== -1) counts[idx]++
    }
  }
  return counts
})

const chartData = computed(() => ({
  labels: zoneConfig?.zones.map((z) => `${z.start}-${z.end}`) ?? [],
  datasets: [
    {
      data: zoneStats.value,
      backgroundColor: zoneConfig?.zones.map((z) => z.color) ?? []
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    datalabels: {
      color: "#ffffff",
      font: { size: 20, weight: "bold" as const },
      formatter: (value: number) => (value > 0 ? value : "")
    }
  },
  scales: {
    x: {
      grid: { display: false },
      border: { color: "#59ADBC", display: true },
      ticks: { color: "#333", font: { size: 16, weight: "bold" as const } }
    },
    y: {
      min: 0,
      border: { display: false, dash: [10, 5] as number[] },
      grid: { color: "#59ADBC", drawBorder: false },
      ticks: { stepSize: 2, color: "#F58642" as const, font: { size: 16, weight: "bold" as const } }
      // stepSize Chart.js 會自動往上取最近的偶數刻度
    }
  }
}
</script>

<template>
  <div class="bg-[#f0ede6]">
    <div class="max-w-[1200px] mx-auto px-2 sm:px-0 py-0">
      <LotteryPageHeader :logoSrc="logoSrc" :gameName="gameName" :title="zoneConfig?.title ?? '分區分布圖'" v-model="limit" />
    </div>
    <div class="overflow-x-auto">
      <div class="mx-auto max-w-max max-h-[508px] overflow-y-auto p-2">
        <table class="mx-auto" :style="{ borderCollapse: 'collapse', minWidth: tableWidth + 'px' }">
          <thead>
            <tr style="background: #ff4100; color: white; text-align: center">
              <th style="border: 1px solid #1e7888; border-right: none; padding: 10px 0" class="md:w-[120px] w-[100px]">開獎期數</th>
              <th style="border: 1px solid #1e7888; border-left: none; padding: 10px 0" class="md:w-[120px] w-[100px]">開獎日期</th>
              <th
                v-for="n in numberRange"
                :key="n"
                :style="[headerCellStyle(n), 'width: 30px; font-size: 12px; border: 1px solid #1e7888; padding: 10px 0']"
              >
                {{ n }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.term" style="text-align: center; font-size: 13px">
              <td style="border: 1px solid #1e7888; background: #ffffff; padding: 8px 0; color: #2b2b2b; font-weight: bold">{{ row.term }}</td>
              <td style="border: 1px solid #1e7888; background: #ffffff; padding: 8px 0; color: #2b2b2b; font-weight: bold">{{ row.date }}</td>
              <td v-for="n in numberRange" :key="n" :style="[cellStyle(row, n), 'border:1px solid #1E7888;padding: 10px 0']">
                {{ row.drawnSet.has(n) || row.special === n ? n : "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-4 pb-6">
      <h3 class="text-center text-[18px] md:text-[24px] font-bold mb-3" style="color: #59adbc">各區間號碼開出群組統計</h3>
      <div class="overflow-x-auto">
        <div class="mx-auto px-4 chart-container" :style="{ '--chart-width': tableWidth + 'px', height: '280px' }">
          <ClientOnly>
            <Bar :data="chartData" :options="chartOptions" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 500px;
}
@media (min-width: 768px) {
  .chart-container {
    width: var(--chart-width);
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f0ede6;
}
::-webkit-scrollbar-thumb {
  background: #59adbc;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #1e7888;
}
</style>
