import { useCallback } from "react"
import { useExpenseStore } from "@/stores/expense-store"

export const useReset = () => {
  const resetAll = useExpenseStore((s) => s.resetAll)

  const performReset = useCallback(() => {
    resetAll()
  }, [resetAll])

  return { performReset }
}
