export interface ApiResponseData {
  game_code: number
  term: string
  draw_date: string
  numbers: number[]
  special: number | null
  next_draw_date: string | null
}

export interface CardData {
  name: string
  game_code: number
  nameColor: string
  draw_term: string
  draw_date: string
  draw_time: string
  next_draw: string
  numbers: number[]
  special_number: number | null
  bgColor: string
  logo: string
  draw_days: number[]
  showSortButtons?: boolean
}

export interface DrawItem {
  game_code: number
  term: string
  draw_date: string
  numbers: number[]
  special: number | null
}

export interface DrawsResponse {
  slug: string
  name: string
  draw_list: DrawItem[]
}

export interface BingoApiResponse {
  game_code: number
  term: string
  draw_date: string
  numbers: number[]
  special: number | null
  lot_big_small: string
  lot_odd_even: string
  next_draw_date: string | null
}

export interface DrawStatsItem {
  game_code: number
  term: string
  draw_date: string // ISO datetime
  numbers: number[] // 已排序
  special: number | null
  odd_even_ratio: string // e.g. "2:3"
  total_sum: number
  average: number // 使用 toFixed(2) 顯示
  same_tail: string
  head_tail_diff: number
  tail_sum: number
  head_sum: number
}

export interface DrawStatsResponse {
  slug: string
  name: string
  draw_list: DrawStatsItem[]
}

export interface GameHotNumbers {
  name: string
  hot_numbers: number[]
  hot_special: number[] | null
}

export interface HotNumbersResponse {
  data: Record<string, GameHotNumbers>
}
