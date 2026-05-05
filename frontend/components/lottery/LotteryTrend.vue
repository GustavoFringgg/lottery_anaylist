<script setup lang="ts">
import { Bar } from "vue-chartjs"
import { formatDate } from "~/utils/formatDate"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{
  slug: string
  logoSrc: string
}>()

const { getDraws } = useLotteryApi()

const limit = ref(10)

type TrendRow = {
  term: string
  date: string
  drawnSet: Set<number>
  special: number | null
}

const { data } = await useAsyncData(`lottery-trend-${props.slug}`, () => getDraws(props.slug, limit.value), {
  watch: [limit]
})

const NUMBER_RANGE: Record<string, number> = {
  "539": 39,
  "big-lotto": 49,
  "power-lotto": 38,
  bingo: 80,
  "39lotto": 39,
  "49lotto": 49
}

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

function cellStyle(row: TrendRow, n: number) {
  if (row.special === n) return { background: "#FF0000", color: "white", fontWeight: "bold" } // 特別號
  if (row.drawnSet.has(n)) return { background: "#FFE868", color: "black", fontWeight: "bold" } // 開出的號碼
  return { background: "white" }
}

function headerCellStyle(n: number) {
  const group = Math.floor((n - 1) / 7)
  return group % 2 === 0 ? { background: "#59ADBC" } : { background: "#1E7888" }
}

const numberStats = computed(() => {
  const regular = new Array(maxNumber + 1).fill(0)
  const special = new Array(maxNumber + 1).fill(0)

  for (const item of data.value?.draw_list ?? []) {
    for (const n of item.numbers) {
      regular[n]++
    }
    if (item.special) {
      special[item.special]++
    }
  }

  return { regular, special }
})

const tableWidth = computed(() => 120 + 110 + 30 * maxNumber)

// chartData.js
const chartData = computed(() => ({
  labels: numberRange,
  datasets: [
    {
      label: "特別號出現次數",
      data: numberRange.map((n) => numberStats.value.special[n]),
      backgroundColor: "#F58642"
    },
    { label: "基本號出現次數", data: numberRange.map((n) => numberStats.value.regular[n]), backgroundColor: "#59ADBC" }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // 自訂高度
  plugins: {
    legend: {
      position: "top" as const
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      },
      border: {
        color: "#59ADBC",
        display: true
      },
      ticks: {
        color: "#59ADBC" as const,
        font: {
          size: 16,
          weight: "bold" as const
        }
      }
    },
    y: {
      stacked: true,
      min: 0,
      max: 10,
      border: {
        display: false,
        color: "#59ADBC",
        dash: [15, 5] as number[]
      },
      grid: {
        drawBorder: false
      },

      ticks: {
        stepSize: 2,
        color: "#F58642" as const,
        font: {
          size: 16,
          weight: "bold" as const
        }
      }
    }
  }
}
</script>

<template>
  <div class="bg-[#f0ede6]">
    <div class="max-w-[1200px] mx-auto px-2 sm:px-0 py-0">
      <LotteryPageHeader :logoSrc="logoSrc" :gameName="gameName" title="分布走勢圖" v-model="limit" />
    </div>
    <div class="mx-auto w-full max-w-[1700px] max-h-[508px]">
      <table class="mx-auto" style="border-collapse: collapse">
        <thead>
          <tr style="background: #ff4100; color: white; text-align: center">
            <th style="width: 120px; border: 1px solid #1e7888; border-right: none; padding: 10px 0">期數</th>
            <th style="width: 110px; border: 1px solid #1e7888; border-left: none; padding: 10px 0">日期</th>
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
    <div class="mx-auto mt-4" :style="{ width: tableWidth + 'px', height: '293px' }">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
