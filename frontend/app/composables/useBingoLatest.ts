import { formatDate } from "~/utils/formatDate"

export const useBingoLatest = () => {
  const { getBingoLatest } = useLotteryApi()

  const { data, error, refresh } = useAsyncData("bingo-latest", () => getBingoLatest())

  let intervalTimer: ReturnType<typeof setInterval> | null = null
  let initialTimer: ReturnType<typeof setTimeout> | null = null
  let countdownTimer: ReturnType<typeof setInterval> | null = null

  const INTERVAL = 5 * 60 * 1000
  const OFFSET = (2 * 60 + 20) * 1000 // 基準分鐘2/7/12...後20秒才打

  const countdown = ref(0)

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
    if (initialTimer) { clearTimeout(initialTimer); initialTimer = null }
    if (intervalTimer) { clearInterval(intervalTimer); intervalTimer = null }
    if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null }
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
    startPolling()
    document.addEventListener("visibilitychange", onVisibilityChange)
  })

  onUnmounted(() => {
    stopPolling()
    document.removeEventListener("visibilitychange", onVisibilityChange)
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
