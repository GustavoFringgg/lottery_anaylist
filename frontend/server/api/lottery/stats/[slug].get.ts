import type { DrawStatsResponse } from "~/types/index"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { slug } = getRouterParams(event)
  const query = getQuery(event)
  return $fetch<DrawStatsResponse>(`${config.public.apiBase}/api/lottery/stats/${slug}`, {
    query,
    headers: { "X-API-Key": config.apiKey }
  })
})
