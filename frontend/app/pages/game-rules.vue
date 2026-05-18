<script setup lang="ts">
useSeoMeta({
  title: "遊戲玩法介紹",
  description: "台灣彩券各遊戲玩法介紹，包含今彩539、大樂透、威力彩、Bingo賓果、49樂合彩、39樂合彩、4星彩、3星彩。"
})
useHead({ link: [{ rel: "canonical", href: "https://www.539lto.co/game-rules" }] })

const games = [
  {
    logo: "/images/ham_logo/539.png",
    name: "今彩539",
    rule: "從 01~39 的號碼中任選 5 個號碼進行投注",
    numbers: "基本號： 5 個"
  },
  {
    logo: "/images/ham_logo/big-lotto.png",
    name: "大樂透",
    rule: "從 01~49 中任選 6 個號碼進行投注",
    numbers: "基本號： 6 個\n特別號： 1 個"
  },
  {
    logo: "/images/ham_logo/power-lotto.png",
    name: "威力彩",
    rule: "從第 1 區中的 01~38 的號碼中任選 6 個號碼，並從第 2 區中的 01~08 的號碼中任選 1 個號碼進行投注",
    numbers: "第一區： 6 個\n第二區： 1 個"
  },
  {
    logo: "/images/ham_logo/bingo.png",
    name: "Bingo賓果",
    rule: "選號範圍為 01~80 ，您可以任意選擇玩 1~10 個號碼的玩法（稱為「1星」、「2星」、「3星」....、「10星」）",
    numbers: "開出 20 個獎號"
  },
  {
    logo: "/images/ham_logo/49lotto.png",
    name: "49樂合彩",
    rule: "從 01 到 49 的號碼中依不同玩法之規定分別任意選出 2、3 或 4 個不相同的號碼。所選擇的 2、3 或 4 個號碼，如果完全對中大樂透之開獎號碼（不含特別號）中獎號碼，即為中獎",
    numbers: "以「大樂透」之開獎號碼（不含特別號）"
  },
  {
    logo: "/images/ham_logo/39lotto.png",
    name: "39樂合彩",
    rule: "從 01 到 39 的號碼中依不同玩法之規定分別任意選出 2、3 或 4 個不相同的號碼。所選的 2、3 或 4 個號碼，如果完全對中開獎當日今彩539開出獎號，即為中獎",
    numbers: "以「今彩539」開出獎號為中獎獎號"
  },
  {
    logo: "/images/ham_logo/4star.png",
    name: "4星彩",
    rule: "4星彩是一種四位數字（仟、佰、拾、個位數）遊戲，您必須從 0000~9999 中選出一組四位數進行投注。開獎時，開獎單位將從 0000~9999 中隨機開出一組四位數號碼，該組號碼就是該期4星彩的中獎號碼",
    numbers: "一組四位數號碼"
  },
  {
    logo: "/images/ham_logo/3star.png",
    name: "3星彩",
    rule: "3星彩是一種三位數字（佰、拾、個位數）遊戲，您必須從 000~999 中選出一組三位數進行投注。開獎時，開獎單位將從 000~999 中隨機開出一組三位數號碼，該組號碼就是該期3星彩的中獎號碼",
    numbers: "一組三位數號碼"
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#f0ede6] py-10 px-4">
    <h1 class="text-center text-[32px] md:text-[42px] font-bold mb-8" style="color: #59adbc">遊戲玩法介紹</h1>

    <!-- Mobile card 排版 -->
    <div class="flex flex-col gap-5 max-w-[600px] mx-auto md:hidden">
      <div v-for="game in games" :key="game.name" class="rounded-xl overflow-hidden border border-[#1e7888]">
        <div class="flex items-center justify-center py-5" style="background: #59adbc">
          <img :src="game.logo" :alt="game.name" class="h-[70px] object-contain" />
        </div>
        <div class="bg-white px-6 py-4 text-center">
          <p class="font-bold text-[15px] mb-1" style="color: #59adbc">遊戲規則</p>
          <p class="text-[14px] text-[#2b2b2b] leading-7">{{ game.rule }}</p>
          <hr class="my-3 border-[#1e7888]" />
          <p class="font-bold text-[15px] mb-1" style="color: #59adbc">開出號碼</p>
          <p class="text-[14px] text-[#2b2b2b] whitespace-pre-line">{{ game.numbers }}</p>
        </div>
      </div>
    </div>

    <!-- Desktop table 排版 -->
    <div class="hidden md:block max-w-[1100px] mx-auto overflow-x-auto">
      <table class="w-full" style="border-collapse: collapse; border: 2px solid #1e7888">
        <thead>
          <tr style="background: #59adbc; color: white; text-align: center">
            <th class="w-[180px] py-4 text-[18px]" style="border: 1px solid #1e7888">彩券項目</th>
            <th class="py-4 text-[18px]" style="border: 1px solid #1e7888">遊戲規則</th>
            <th class="w-[200px] py-4 text-[18px]" style="border: 1px solid #1e7888">開出號碼</th>
          </tr>
        </thead>
        <tbody style="background: white">
          <tr v-for="game in games" :key="game.name" style="border: 1px solid #1e7888">
            <td class="text-center py-4 px-2" style="border: 1px solid #1e7888">
              <img :src="game.logo" :alt="game.name" class="mx-auto h-[60px] object-contain" />
            </td>
            <td class="text-center text-[16px] px-4 py-4 leading-7 text-[#2b2b2b]" style="border: 1px solid #1e7888">
              {{ game.rule }}
            </td>
            <td class="text-center text-[16px] px-2 py-4 text-[#2b2b2b] whitespace-pre-line" style="border: 1px solid #1e7888">
              {{ game.numbers }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
