import type { HotNumbersResponse } from "../../../app/types/index"

export default defineCachedEventHandler(
  async (event): Promise<HotNumbersResponse> => {
    const config = useRuntimeConfig(event)
    return $fetch<HotNumbersResponse>(`${config.public.apiBase}/api/lottery/hot-numbers`, {
      headers: { "X-API-Key": config.apiKey }
    })
  },
  { maxAge: 600, swr: true, name: "hot-numbers" }
)
