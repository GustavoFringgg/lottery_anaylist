<script setup lang="ts">
useSeoMeta({
  title: "隱私權保護政策 - 539樂透分析",
  description: "539樂透分析重視您的隱私權，本頁說明我們如何收集、使用及保護您的個人資料。",
  ogUrl: "https://www.539lto.co/privacy-policy"
})
useHead({
  link: [{ rel: "canonical", href: "https://www.539lto.co/privacy-policy" }]
})

const clauses = [
  {
    title: "資料收集之類型",
    intro: "當您使用本站服務時，我們將依據服務功能，可能會收集以下資訊：",
    items: [
      {
        label: "非個人識別資訊",
        content: "包含您的瀏覽器類型、作業系統、存取時間、瀏覽頁面以及來源網域。這些資訊主要用於分析網站流量及優化使用者體驗。"
      },
      { label: "Cookie 技術", content: "本站使用 Cookie 來儲存您的偏好（例如自選號碼紀錄），以便在您下次訪問時提供更個人化的服務。" }
    ]
  },
  {
    title: "資料使用之目的",
    intro: "我們收集資訊的目的是為了：",
    items: [
      { label: "優化服務品質", content: "透過分析統計數據，改善樂透圖表與分析工具的呈現方式。" },
      { label: "個性化體驗", content: "紀錄使用者常點選頁面或篩選條件。" },
      { label: "安全性監控", content: "預防惡意攻擊，確保系統運行穩定。" }
    ]
  },
  {
    title: "資料保護與安全",
    content: "本站採取適當的技術手段保護您的個人資料，防止未經授權的存取、修改或洩漏。我們不會將您的個人資訊出售、交換或出租給任何第三方機構。"
  },
  {
    title: "Cookie 政策",
    content: "本站使用 Cookie 及類似技術以提升使用者體驗。您可透過瀏覽器設定拒絕 Cookie，但部分功能（如自選號碼紀錄）可能因此無法正常運作。"
  },
  {
    title: "第三方服務",
    content: "本站可能使用 Google Analytics 等第三方分析工具，這些服務有其獨立的隱私權政策。本站不對第三方之資料處理方式負責。"
  },
  {
    title: "隱私權政策之修訂",
    content: "本站保留隨時修改本隱私權政策之權利，修改後之條款將即時公告於本頁面。繼續使用本站即視為同意最新版本之隱私權政策。"
  }
]
</script>

<template>
  <div class="w-full max-w-[860px] mx-auto px-4 py-1">
    <h1 class="text-[40px] font-black text-center mb-6">隱私權保護政策</h1>
    <p class="font-bold text-[17px] text-center mb-8">歡迎訪問 539 樂翻天，本網站非常重視您的隱私權，並承諾保護您的個人資料。</p>

    <div class="flex flex-col gap-5">
      <div
        v-for="(clause, index) in clauses"
        :key="index"
        class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm border-l-4"
        style="border-left-color: #59adbc"
      >
        <h2 class="font-bold text-[20px] mb-3">{{ index + 1 }}. {{ clause.title }}</h2>

        <p v-if="clause.intro" class="text-[17px] leading-relaxed text-gray-600 mb-3">{{ clause.intro }}</p>

        <ul v-if="clause.items" class="space-y-2">
          <li v-for="item in clause.items" :key="item.label" class="flex gap-2 text-[17px] leading-relaxed text-gray-600">
            <span class="shrink-0">•</span>
            <span>
              <strong>{{ item.label }}：</strong>
              {{ item.content }}
            </span>
          </li>
        </ul>

        <p v-if="clause.content" class="text-[17px] leading-relaxed text-gray-600">{{ clause.content }}</p>
      </div>
    </div>
  </div>
</template>
