import { BudgetInput } from "@/features/budget"
import { DashboardSummary } from "@/features/dashboard"
import { ExpenseForm, ExpenseList } from "@/features/expenses"
import { ResetButton } from "@/features/reset"
import { useExpenseStore } from "@/stores/expense-store"

const App = () => {
  const budgetAmount = useExpenseStore((s) => s.budget.amount)
  const hasBudget = budgetAmount > 0

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header — Stitch: sticky, border-b, px-8 py-4 */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="size-6 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Panel de Control</h1>
        </div>
        <ResetButton disabled={!hasBudget} />
      </header>

      {/* Main Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        {/* Budget Input */}
        <section aria-label="Presupuesto Maestro">
          <BudgetInput />
        </section>

        {/* Dashboard Summary */}
        <section aria-label="Resumen de Presupuesto">
          <DashboardSummary />
        </section>

        {/* Entrada Rápida — siempre visible */}
        <section
          aria-label="Entrada Rápida"
          className="flex flex-col gap-4 rounded border border-border bg-card p-6"
        >
          <h2 className="text-lg font-bold">Entrada Rápida</h2>
          <ExpenseForm disabled={!hasBudget} />
        </section>

        {/* Transacciones Recientes */}
        <section aria-label="Transacciones Recientes">
          <h2 className="mb-4 text-lg font-bold">Transacciones Recientes</h2>
          <ExpenseList />
        </section>
      </div>
    </div>
  )
}

export default App
