<script setup lang="ts">
useSeoMeta({
  title: "支持公益 理性投注 - 台灣彩券理性投注指南",
  description: "理性投注 4 大原則：訂定預算、量力而為、轉移注意力、不要借貸。",
  ogUrl: "https://www.539lto.co/responsible-gambling"
})
useHead({
  link: [{ rel: "canonical", href: "https://www.539lto.co/responsible-gambling" }]
})

const tips = [
  { title: "訂定預算", icon: "/images/responsible-gambling/icon-budget.png", desc: ["訂定投注預算", "並按預算進行投注"] },
  { title: "量力而為", icon: "/images/responsible-gambling/icon-affordable.png", desc: ["僅以自己所能", "負擔的金額進行投注"] },
  { title: "轉移注意力", icon: "/images/responsible-gambling/icon-distraction.png", desc: ["多與親人互動", "從事其他休閒娛樂"] },
  { title: "不要借貸", icon: "/images/responsible-gambling/icon-no-debt.png", desc: ["不要為了投注", "而進行借貸或非法行為"] }
]

const orgs = [
  { name: "財團法人張老師基金會", phone: "電話直撥1980" },
  { name: "生命線協談專線", phone: "電話直撥1995" },
  { name: "馬偕協談中心", phone: "02-25433535轉2010" },
  { name: "董氏基金會心理衛生組", phone: "02-27766133轉2\n07-2814721~2" },
  { name: "宇宙光全人關懷網", phone: "02-23632107" }
]
</script>

<template>
  <!-- Hero 區 -->
  <section class="w-full text-center" ">
    <p class="font-black mb-1" style="color: #ed8b2f;font-size: 25px;">投注不過度 助人又樂己</p>
    <h1 class="px-3 py-2 rounded font-black text-[20px] md:text-[67px]" style="color: #59adbc;">支持公益 理性投注</h1>
  </section>

  <!-- Body 主區塊 -->
  <div class="mx-auto px-4 py-4" style="max-width: 1200px">
    <!-- Section 1: 四件事 -->
    <h2 class="text-center font-black text-[20px] md:text-[50px] mb-8" style="color: #59adbc">關於理性投注 您該知道的4件事...</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6" style="margin-bottom: 32px">
      <div v-for="tip in tips" :key="tip.title" class="flex flex-col items-center gap-3">
        <div
          class="w-full flex flex-col items-center justify-center px-5 gap-4 h-40 md:h-64"
          style="background-color: #ffe868; border-radius: 15px"
        >
          <img :src="tip.icon" :alt="tip.title" class="object-contain w-16 h-16 md:w-28 md:h-28" />
          <p class="font-bold" style="color: #379cad; font-size: 20px">{{ tip.title }}</p>
        </div>
        <p class="text-sm text-center leading-relaxed" style="color: #1a1a1a">
          <span v-for="(line, i) in tip.desc" :key="i" class="block text-[15px] md:text-[18px]" >{{ line }}</span>
        </p>
      </div>
    </div>

    <!-- Section 2: 諮詢機構 -->
    <h2 class="text-center font-black mb-6 text-[20px] md:text-[30px]" style="color: #59adbc">您也可以透過以下管道與專業人員傾談</h2>

    <!-- 桌機版：兩欄表格 -->
    <div class="hidden md:block" style="border: 3px solid #59adbc; border-radius: 16px; overflow: hidden">
      <!-- 表頭 -->
      <div class="grid grid-cols-2" style="background-color: #59adbc">
        <div class="py-5 text-center font-black text-xl" style="color: #ffe868">機構名稱</div>
        <div class="py-5 text-center font-black text-xl" style="color: #ffe868; border-left: 1px solid rgba(255, 255, 255, 0.3)">機構電話</div>
      </div>
      <!-- 資料列 -->
      <div
        v-for="(org, i) in orgs"
        :key="org.name"
        class="grid grid-cols-2"
        :style="{
          borderBottom: i < orgs.length - 1 ? '3px solid #59adbc' : 'none',
          backgroundColor: 'white'
        }"
      >
        <div class="py-5 flex items-center justify-center font-bold" style="color: #f58642; font-size: 30px">{{ org.name }}</div>
        <div
          class="py-5 flex items-center justify-center whitespace-pre-line"
          style="color: #727272; border-left: 3px solid #59adbc; font-size: 30px"
        >
          {{ org.phone }}
        </div>
      </div>
    </div>

    <!-- 手機版：每個機構獨立卡片 -->
    <div class="flex flex-col gap-4 md:hidden">
      <div
        v-for="org in orgs"
        :key="org.name + '-mobile'"
        style="border: 3px solid #59adbc; border-radius: 16px; overflow: hidden; background: white"
      >
        <div class="py-4 text-center font-bold" style="color: #f58642; font-size: 20px">{{ org.name }}</div>
        <div
          class="py-4 text-center whitespace-pre-line"
          style="color: #727272; border-top: 3px solid #59adbc; font-size: 20px"
        >
          {{ org.phone }}
        </div>
      </div>
    </div>
  </div>
</template>
