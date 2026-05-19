import type { BingoApiResponse } from "../../../app/types/index"

export default defineCachedEventHandler(
  async (event): Promise<BingoApiResponse> => {
    const config = useRuntimeConfig(event)
    return $fetch<BingoApiResponse>(`${config.public.apiBase}/api/lottery/bingo/latest`, {
      headers: { "X-API-Key": config.apiKey }
    })
  },
  { maxAge: 120, swr: true, name: "bingo-latest" }
)
