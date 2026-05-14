import type { HotNumbersResponse } from "~/types"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  return $fetch<HotNumbersResponse>(`${config.public.apiBase}/api/lottery/hot-numbers`, {
    headers: { "X-API-Key": config.apiKey }
  })
})
