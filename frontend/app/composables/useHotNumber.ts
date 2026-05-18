import type { HotNumbersResponse, GameHotNumbers } from "~/types"

//TODO:L
export const useHotNumbers = () => {
  const hotCache = useState<HotNumbersResponse["data"] | null>("hotNumbers", () => null)
  async function fetchIfNeeded() {
    if (hotCache.value) return hotCache.value

    const data = await $fetch<HotNumbersResponse>("/api/lottery/hot-numbers")
    hotCache.value = data.data
    return hotCache.value
  }
  function getHotBySlug(slug: string): GameHotNumbers | null {
    return hotCache.value?.[slug] ?? null
  }

  return { hotCache, fetchIfNeeded, getHotBySlug }
  //   - hotCache 整包存，key 是 slug
  //   - fetchIfNeeded() — 已有資料就不重打
  //   - getHotBySlug(slug) — 元件用這個拿特定遊戲的熱門號碼
}

//   第一次呼叫 fetchIfNeeded()
//     → hotCache 是 null
//     → 打 /api/lottery/hot-numbers
//     → 把回傳的 data.data 存進 hotCache（useState）

//   第二次呼叫 fetchIfNeeded()（換頁後）
//     → hotCache 已有值
//     → 直接 return，不打 API
