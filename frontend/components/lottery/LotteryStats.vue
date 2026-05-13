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
  const headers: { label: string }[] = [
    { label: "開獎號碼" },
    ...(hasSpecial.value ? [{ label: "特別號" }] : []),
    { label: "單雙比例" },
    { label: "和值" },
    { label: "均值" },
    { label: "同尾數" },
    { label: "首尾差" },
    { label: "尾數和" },
    { label: "首數和" }
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
      <div class="max-h-[793px] overflow-y-auto">
        <table class="mx-auto" :style="{ borderCollapse: 'collapse', whiteSpace: 'nowrap' }">
          <thead>
            <tr style="color: white; text-align: center">
              <th class="text-[12px] md:text-[18px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                期數
              </th>
              <th class="text-[12px] md:text-[18px]" style="background: #ff4100; border: 1px solid #1e7888; padding: 10px 0px">
                日期
              </th>
              <th
                v-for="h in statHeaders"
                :key="h.label"
                class="text-[13px] md:text-[22px]"
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
              <td class="text-[15px] md:text-[18px] h-[60px] md:h-[80px] text-[#2b2b2b] border border-[#007979]">{{ row.term }}</td>
              <td class="text-[15px] md:text-[18px] text-[#2b2b2b] border border-[#007979]">{{ formatDate(row.draw_date).date }}</td>
              <td class="border border-[#007979] w-[258px] md:w-[458px]">
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
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[120px]">{{ row.odd_even_ratio }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.total_sum }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.average.toFixed(1) }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.same_tail }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.head_tail_diff }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.tail_sum }}</td>
              <td class="text-[15px] md:text-[23px] font-bold border border-[#007979] w-[110px] md:w-[125px]">{{ row.head_sum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Pagination v-if="totalPages > 1" v-model:currentPage="currentPage" :totalPages="totalPages" />
  </div>
</template>
