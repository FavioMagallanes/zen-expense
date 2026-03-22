export const CATEGORIES = [
  "Tarjeta BBVA",
  "Tarjeta Supervielle",
  "Préstamo",
  "Otros gastos",
] as const

export type Category = (typeof CATEGORIES)[number]

export type Expense = {
  id: string
  category: Category
  amount: number
  description: string
  installmentAmount: number | null
  installmentDetail: string | null
  createdAt: string
  updatedAt: string
}

export type Budget = {
  amount: number
  updatedAt: string
}

export type StoreState = {
  budget: Budget
  expenses: Expense[]
}

export type StoreActions = {
  setBudget: (amount: number) => void
  addExpense: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => void
  updateExpense: (
    id: string,
    data: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>
  ) => void
  deleteExpense: (id: string) => void
  resetAll: () => void
}

export type ExpenseStore = StoreState & StoreActions
