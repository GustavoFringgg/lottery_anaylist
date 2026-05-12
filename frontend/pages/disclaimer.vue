<script setup lang="ts">
useSeoMeta({
  title: "免責聲明 - 539樂透分析",
  description: "本站所提供之開獎號碼、歷史數據及分析資訊僅供參考，不構成任何投注建議，詳閱免責聲明。",
  ogUrl: "https://www.539lto.co/disclaimer"
})
useHead({
  link: [{ rel: "canonical", href: "https://www.539lto.co/disclaimer" }]
})

const clauses = [
  {
    title: "資訊僅供參考",
    content:
      "本網站（以下稱本站）所提供之所有樂透開獎號碼、歷史數據、統計圖表及分析預測資訊，僅供使用者作為數據觀察之參考。本站並非官方彩券發行機構，亦不具備任何官方背景。"
  },
  {
    title: "數據準確性與即時性",
    html: '本站致力於確保所載資訊之準確性與即時性，唯所有數據均自動抓取自<a href="https://www.taiwanlottery.com/" target="_blank" rel="noopener noreferrer" class="underline">台灣彩券官方網站</a>，不保證完全無誤或毫無延遲。若因系統錯誤、網路延遲等原因導致資訊偏差，本站不承擔任何更正、補償或賠償責任。開獎結果請以台灣彩券公告之正式結果為最終確認依據。'
  },
  {
    title: "投注風險與責任限制",
    content:
      "樂透投注屬於機率性行為。本站所提供之「趨勢分析」、「熱門號碼」或「數據統計」均為基於歷史資料之數學運算結果，不代表對未來中獎結果之保證。使用者應自行評估投注風險。因參考本站資訊而進行之投注行為所導致的任何財務損失，本站概不負責。本站嚴禁任何形式的非法博弈行為，並提醒使用者應透過合法官方管道購買彩券。"
  },
  {
    title: "服務中斷與第三方連結",
    content:
      "本站保留隨時更新、修改或暫停服務之權利。對於因不可抗力因素（如伺服器故障、網路攻擊或電信中斷）導致的資訊遺失或無法存取，本站不承擔相關法律責任。此外，本站可能包含導向第三方官方網站之連結，該等網站之內容與隱私政策由該站自行負責。"
  },
  {
    title: "智慧財產權",
    content: "本站所有原創內容（包含但不限於版面設計、圖表、文字說明）均受著作權法保護。未經本站書面授權，不得擅自重製、散佈或做任何商業用途。"
  },
  {
    title: "合規警語與理性投注",
    html: '本站支持合法公益彩券，並嚴格遵守相關法規：<strong class="text-red-600">未滿 18 歲者，不得購買或兌領彩券。</strong>投注不過度，助人又樂己。請維持理性投注，切勿因參與博弈影響個人及家庭生活。'
  },
  {
    title: "條款變更",
    content: "本站保留隨時修改本免責聲明之權利，修改後之條款將即時公告於本頁面。繼續使用本站即視為同意最新版本之免責聲明。"
  }
]
</script>

<template>
  <div class="w-full max-w-[860px] mx-auto px-4 py-1">
    <h1 class="text-[40px] font-black text-center mb-8">免責聲明</h1>

    <div class="flex flex-col gap-5">
      <div
        v-for="(clause, index) in clauses"
        :key="index"
        class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm border-l-4"
        style="border-left-color: #59adbc"
      >
        <h2 class="font-bold text-[20px] mb-2">{{ index + 1 }}. {{ clause.title }}</h2>
        <p v-if="clause.html" class="text-[17px] leading-relaxed text-gray-600" v-html="clause.html" />
        <p v-else class="text-[17px] leading-relaxed text-gray-600">{{ clause.content }}</p>
      </div>
    </div>
  </div>
</template>
