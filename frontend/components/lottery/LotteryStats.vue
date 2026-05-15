<script setup lang="ts">
import { formatDate } from "~/utils/formatDate"
// 1. props
const props = defineProps<{
  slug: string
  logoSrc: string
}>()

//  2. 資料來源
const { getStats } = useLotteryApi()
const PAGE_SIZE = 10
const limit = ref(10)
const currentPage = ref(1)

const { data } = await useAsyncData(`lottery-stats-${props.slug}`, () => getStats(props.slug, limit.value), { watch: [limit] })
const rows = computed(() => data.value?.draw_list ?? [])
const gameName = computed(() => data.value?.name ?? "")
const hasSpecial = computed(() => rows.value.some((row) => row.special !== null))

const statHeaders = computed(() => {
  const headers: { label: string; width: string }[] = [
    { label: "開獎號碼", width: "w-[198px] md:w-[408px]" },
    ...(hasSpecial.value ? [{ label: "特別號", width: "w-[65px] md:w-[125px]" }] : []),
    { label: "單雙比例", width: "w-[80px] md:w-[125px]" },
    { label: "和值", width: "w-[65px] md:w-[125px]" },
    { label: "均值", width: "w-[65px] md:w-[125px]" },
    { label: "同尾數", width: "w-[90px] md:w-[150px]" },
    { label: "首尾差", width: "w-[65px] md:w-[125px]" },
    { label: "尾數和", width: "w-[65px] md:w-[125px]" },
    { label: "首數和", width: "w-[65px] md:w-[125px]" }
  ]
  return headers.map((h, i) => ({ ...h, bg: i % 2 === 0 ? "#59adbc" : "#1e7888" }))
})

// 4. 分頁
const totalPages = computed(() => Math.ceil(rows.value.length / PAGE_SIZE))

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return rows.value.slice(start, start + PAGE_SIZE)
})
</script>

<template>
  <div class="bg-[#f0ede6]">
    <div class="max-w-[1200px] mx-auto px-2 sm:px-0 py-0">
      <LotteryPageHeader :logoSrc="logoSrc" :gameName="gameName" title="各期統計分析" v-model="limit" />
    </div>
    <div class="overflow-x-auto">
      <div class="max-h-[793px] overflow-y-auto max-w-max mx-auto p-2">
        <table class="min-w-max" :style="{ borderCollapse: 'collapse', whiteSpace: 'nowrap' }">
          <thead>
            <tr style="color: white; text-align: center">
              <th class="text-[12px] md:text-[18px] w-[85px] md:w-[125px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                期數
              </th>
              <th class="text-[12px] md:text-[18px] w-[85px] md:w-[125px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                日期
              </th>
              <th
                v-for="h in statHeaders"
                :key="h.label"
                :class="['text-[13px] md:text-[22px]', h.width]"
                :style="`background: ${h.bg}; border: 1px solid #1e7888;`"
              >
                {{ h.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in pagedRows"
              :key="row.term"
              class="text-center text-[13px] md:text-[24px] border-t border-[#007979]"
              :style="i % 2 === 0 ? 'background:#fff' : 'background:#a9d9ce'"
            >
              <td class="text-[15px] md:text-[18px] h-[60px] md:h-[80px] text-[#2b2b2b] border border-[#007979]">
                {{ row.term }}
              </td>
              <td class="text-[15px] md:text-[18px] text-[#2b2b2b] border border-[#007979]">
                {{ formatDate(row.draw_date).date }}
              </td>
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
              <td v-if="hasSpecial" class="border border-[#007979] w-[92px]">
                <span
                  v-if="row.special !== null"
                  class="rounded-full inline-flex items-center justify-center font-bold bg-[#ff4100] text-white w-[28px] h-[28px] text-[12px] md:w-[50px] md:h-[50px] md:text-[23px]"
                >
                  {{ String(row.special).padStart(2, "0") }}
                </span>
              </td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.odd_even_ratio }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.total_sum }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.average.toFixed(1) }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.same_tail }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.head_tail_diff }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.tail_sum }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979]">{{ row.head_sum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Pagination v-if="totalPages > 1" v-model:currentPage="currentPage" :totalPages="totalPages" />
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
