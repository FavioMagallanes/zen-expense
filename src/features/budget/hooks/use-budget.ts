import { useCallback } from "react"
import { useExpenseStore } from "@/stores/expense-store"
import { validateAmount } from "@/lib/validators"

export const useBudget = () => {
  const budget = useExpenseStore((s) => s.budget)
  const setBudget = useExpenseStore((s) => s.setBudget)

  const updateBudget = useCallback(
    (amount: number): { success: boolean; error: string | null } => {
      const validation = validateAmount(amount)

      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      setBudget(amount)
      return { success: true, error: null }
    },
    [setBudget]
  )

  return { budget, updateBudget }
}
