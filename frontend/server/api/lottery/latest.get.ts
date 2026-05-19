import type { ApiResponseData } from "../../../app/types/index"

export default defineCachedEventHandler(
  async (event): Promise<ApiResponseData[]> => {
    const config = useRuntimeConfig(event)
    return $fetch<ApiResponseData[]>(`${config.public.apiBase}/api/lottery/latest`, {
      headers: { "X-API-Key": config.apiKey }
    })
  },
  { maxAge: 300, swr: true, name: "lottery-latest" }
)
