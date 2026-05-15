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

const { data } = await useAsyncData(`lottery-odd-even-${props.slug}`, () => getDraws(props.slug, limit.value), { watch: [limit] })

const gameName = computed(() => data.value?.name ?? "")
const rawRows = computed(() => data.value?.draw_list ?? [])
const positionCount = computed(() => rawRows.value[0]?.numbers.length ?? 5)
const hasSpecial = computed(() => rawRows.value.some((item) => item.special !== null))

//TODO:L
const rows = computed(() =>
  rawRows.value.map((item) => {
    const sorted = [...item.numbers].sort((a, b) => a - b)
    const positions = sorted.map((n) => ({ num: n, label: n % 2 === 0 ? "雙" : "單" }))
    const specialLabel = item.special !== null ? (item.special % 2 === 0 ? "雙" : "單") : null
    const allLabels = specialLabel ? [...positions, { label: specialLabel }] : positions
    const oddCount = allLabels.filter((p) => p.label === "單").length
    const evenCount = allLabels.length - oddCount
    return {
      term: item.term,
      draw_date: item.draw_date,
      numbers: item.numbers,
      special: item.special,
      positions,
      specialLabel,
      ratio: `${oddCount}:${evenCount}`
    }
  })
)

const oddEvenStats = computed(() => {
  const count = positionCount.value
  const posOdd = new Array(count).fill(0)
  const posEven = new Array(count).fill(0)
  let specialOdd = 0
  let specialEven = 0

  for (const row of rows.value) {
    for (let i = 0; i < row.positions.length; i++) {
      if (row.positions[i].label === "單") posOdd[i]++
      else posEven[i]++
    }
    if (row.specialLabel === "單") specialOdd++
    else if (row.specialLabel === "雙") specialEven++
  }

  const totalOdd = posOdd.reduce((s, v) => s + v, 0) + specialOdd
  const totalEven = posEven.reduce((s, v) => s + v, 0) + specialEven
  return { posOdd, posEven, specialOdd, specialEven, totalOdd, totalEven }
})

const chartLabels = computed(() => {
  const labels = []
  for (let i = 1; i <= positionCount.value; i++) labels.push(`基${i}`)
  if (hasSpecial.value) labels.push("特別號")
  return labels
})

const chartData = computed(() => {
  const stats = oddEvenStats.value
  const oddData = [...stats.posOdd, ...(hasSpecial.value ? [stats.specialOdd] : [])]
  const evenData = [...stats.posEven, ...(hasSpecial.value ? [stats.specialEven] : [])]
  return {
    labels: chartLabels.value,
    datasets: [
      { label: "單", data: oddData, backgroundColor: "#F58642" },
      { label: "雙", data: evenData, backgroundColor: "#59ADBC" }
    ]
  }
})

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
    }
  }
}
</script>

<template>
  <div class="bg-[#f0ede6]">
    <div class="max-w-[1200px] mx-auto px-2 sm:px-0 py-0">
      <LotteryPageHeader :logoSrc="logoSrc" :gameName="gameName" title="單雙比分析圖" v-model="limit" />
    </div>
    <div class="overflow-x-auto">
      <div class="max-h-[793px] overflow-y-auto max-w-max mx-auto p-2">
        <table class="mx-auto w-[800px] md:w-[1558px]" :style="{ borderCollapse: 'collapse', whiteSpace: 'nowrap' }">
          <thead>
            <tr style="color: white; text-align: center">
              <th class="text-[12px] md:text-[18px] md:w-[120px] w-[100px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                開獎期數
              </th>
              <th class="text-[12px] md:text-[18px] md:w-[120px] w-[100px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                開獎日期
              </th>
              <th class="text-[13px] md:text-[22px] w-[198px] md:w-[408px]" style="background: #59adbc; border: 1px solid #1e7888; padding: 10px 0px">
                開獎號碼
              </th>
              <th
                v-if="hasSpecial"
                class="text-[13px] md:text-[22px] w-[65px] md:w-[100px]"
                style="background: #1e7888; border: 1px solid #1e7888; padding: 10px 0px"
              >
                特別號
              </th>
              <th
                v-for="i in positionCount"
                :key="i"
                class="text-[13px] md:text-[22px] w-[65px] md:w-[100px]"
                :style="`background: ${i % 2 === 0 ? '#1e7888' : '#59adbc'}; border: 1px solid #1e7888; padding: 10px 0px`"
              >
                基{{ i }}
              </th>
              <th
                v-if="hasSpecial"
                class="text-[13px] md:text-[22px] w-[65px] md:w-[100px]"
                style="background: #1e7888; border: 1px solid #1e7888; padding: 10px 0px"
              >
                特
              </th>
              <th class="text-[13px] md:text-[22px] w-[80px] md:w-[125px]" style="background: #59adbc; border: 1px solid #1e7888; padding: 10px 0px">
                單雙比
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.term"
              class="text-center text-[13px] md:text-[24px] border-t border-[#007979]"
              :style="i % 2 === 0 ? 'background:#fff' : 'background:#a9d9ce'"
            >
              <td class="text-[15px] md:text-[18px] h-[60px] md:h-[80px] text-[#2b2b2b] border border-[#007979]">{{ row.term }}</td>
              <td class="text-[15px] md:text-[18px] text-[#2b2b2b] border border-[#007979]">{{ formatDate(row.draw_date).date }}</td>
              <td class="border border-[#007979]">
                <div class="flex items-center justify-center gap-[4px] md:gap-[10px]">
                  <span
                    v-for="n in row.numbers"
                    :key="n"
                    class="rounded-full inline-flex items-center justify-center font-bold border-2 border-black bg-white text-black w-[28px] h-[28px] text-[12px] md:w-[50px] md:h-[50px] md:text-[23px] shrink-0"
                  >
                    {{ String(n).padStart(2, "0") }}
                  </span>
                </div>
              </td>
              <td v-if="hasSpecial" class="border border-[#007979]">
                <span
                  v-if="row.special !== null"
                  class="rounded-full inline-flex items-center justify-center font-bold bg-[#ff4100] text-white w-[28px] h-[28px] text-[12px] md:w-[50px] md:h-[50px] md:text-[23px]"
                >
                  {{ String(row.special!).padStart(2, "0") }}
                </span>
              </td>
              <td
                v-for="(pos, j) in row.positions"
                :key="j"
                class="text-[15px] md:text-[23px] font-bold border border-[#007979]"
                :style="pos.label === '單' ? 'color: #F58642' : 'color: #59ADBC'"
              >
                {{ pos.label }}
              </td>
              <td
                v-if="hasSpecial"
                class="text-[15px] md:text-[23px] font-bold border border-[#007979]"
                :style="row.specialLabel === '單' ? 'color: #F58642' : 'color: #59ADBC'"
              >
                {{ row.specialLabel }}
              </td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.ratio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-4 pb-6">
      <h3 class="text-center text-[18px] md:text-[24px] font-bold mb-3" style="color: #59adbc">各項單雙次數統計</h3>
      <div class="flex justify-center gap-6 mb-3">
        <div class="flex items-center gap-1">
          <span class="inline-block w-4 h-4 rounded-sm bg-[#F58642]"></span>
          <span class="text-base font-bold text-[#F58642]">單數</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="inline-block w-4 h-4 rounded-sm bg-[#59ADBC]"></span>
          <span class="text-base font-bold text-[#59ADBC]">雙數</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="w-[800px] md:w-[1558px] mx-auto px-4">
          <ClientOnly>
            <div style="height: 280px">
              <Bar :data="chartData" :options="chartOptions" />
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
