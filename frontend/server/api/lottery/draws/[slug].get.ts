import type { DrawsResponse } from "../../../../app/types/index"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { slug } = getRouterParams(event)
  const query = getQuery(event)
  return $fetch<DrawsResponse>(`${config.public.apiBase}/api/lottery/draws/${slug}`, {
    query,
    headers: { "X-API-Key": config.apiKey }
  })
})
