import { create } from "zustand"
import { persist } from "zustand/middleware"
import { STORAGE_KEY, SCHEMA_VERSION } from "@/lib/constants"
import type { ExpenseStore, Budget } from "@/types/expense"

const DEFAULT_BUDGET: Budget = {
  amount: 0,
  updatedAt: new Date().toISOString(),
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      budget: { ...DEFAULT_BUDGET },
      expenses: [],

      setBudget: (amount: number) =>
        set({
          budget: { amount, updatedAt: new Date().toISOString() },
        }),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            {
              ...expense,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateExpense: (id, data) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id
              ? { ...e, ...data, updatedAt: new Date().toISOString() }
              : e
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      resetAll: () =>
        set({
          budget: { amount: 0, updatedAt: new Date().toISOString() },
          expenses: [],
        }),
    }),
    {
      name: STORAGE_KEY,
      version: SCHEMA_VERSION,
    }
  )
)
