import type { DrawItem } from "~/types"

const hotCache = useState<Record<string, number[]>>("hotNumbers", () => ({}))

export const useHotNumbers = () => {
  const { getDraws } = useLotteryApi()
}
