import { formatDate } from "~/utils/formatDate"

// 模組層級 singleton：確保 timer 與 listener 只有一份
let intervalTimer: ReturnType<typeof setInterval> | null = null
let initialTimer: ReturnType<typeof setTimeout> | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null
let listenerRegistered = false
let mountCount = 0

const INTERVAL = 5 * 60 * 1000
const OFFSET = (2 * 60 + 30) * 1000 // 基準分鐘2/7/12...後30秒才打

export const useBingoLatest = () => {
  const { getBingoLatest } = useLotteryApi()

  const { data, error, refresh } = useAsyncData("bingo-latest", () => getBingoLatest())

  // 共享倒數 state，所有元件讀同一個值
  const countdown = useState("bingo-countdown", () => 0)

  function startCountdown(seconds: number) {
    if (countdownTimer) clearInterval(countdownTimer)
    countdown.value = seconds
    countdownTimer = setInterval(() => {
      if (countdown.value > 0) countdown.value--
    }, 1000)
  }

  function startPolling() {
    const now = new Date()
    const msUntilNextMark = INTERVAL - ((now.getTime() - OFFSET) % INTERVAL)
    startCountdown(Math.ceil(msUntilNextMark / 1000))
    initialTimer = setTimeout(() => {
      console.log("[Bingo] 整點5分自動更新", new Date().toLocaleTimeString())
      refresh()
      startCountdown(INTERVAL / 1000)
      intervalTimer = setInterval(() => {
        console.log("[Bingo] 整點5分自動更新", new Date().toLocaleTimeString())
        refresh()
        startCountdown(INTERVAL / 1000)
      }, INTERVAL)
    }, msUntilNextMark)
  }

  function stopPolling() {
    if (initialTimer) {
      clearTimeout(initialTimer)
      initialTimer = null
    }
    //第一次的 setTimeout，等到下一個整點（2/7/12分）才觸發
    if (intervalTimer) {
      clearInterval(intervalTimer)
      intervalTimer = null
    }
    //之後每 5 分鐘重複的 setInterval
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    //— 每秒 -1 更新畫面顯示的那個
  }

  function onVisibilityChange() {
    if (document.hidden) {
      stopPolling()
    } else {
      refresh()
      startPolling()
    }
  }

  onMounted(() => {
    mountCount++
    if (mountCount === 1) {
      startPolling()
    }
    if (!listenerRegistered) {
      listenerRegistered = true
      document.addEventListener("visibilitychange", onVisibilityChange)
    }
  })

  onUnmounted(() => {
    mountCount--
    if (mountCount === 0) {
      stopPolling()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      listenerRegistered = false
    }
  })

  const bingoCard = computed(() => {
    if (!data.value) return null
    const d = data.value
    const { date: drawDate, time: drawTime } = formatDate(d.draw_date)
    const nextDraw = d.next_draw_date ? formatDate(d.next_draw_date) : null
    return {
      draw_term: d.term,
      draw_date: drawDate,
      draw_time: drawTime,
      next_draw_date: nextDraw?.date ?? "-",
      next_draw_time: nextDraw?.time ?? "-",
      numbers: d.numbers,
      special_number: d.special,
      guess_big_small: d.lot_big_small ?? "-",
      guess_odd_even: d.lot_odd_even ?? "-"
    }
  })

  const countdownDisplay = computed(() => {
    const m = Math.floor(countdown.value / 60)
    const s = countdown.value % 60
    return m > 0 ? `${m} 分 ${s} 秒` : `${s} 秒`
  })

  return { bingoCard, error, refresh, countdown, countdownDisplay }
}
