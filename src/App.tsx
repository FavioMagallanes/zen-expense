import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BudgetInput } from "@/features/budget"
import { DashboardSummary } from "@/features/dashboard"
import { ExpenseForm, ExpenseList } from "@/features/expenses"
import { ResetButton } from "@/features/reset"

const App = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="mx-auto min-h-svh max-w-lg px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Zen Expense</h1>
        <ResetButton />
      </header>

      <section className="mb-6">
        <p className="mb-2 text-xs text-muted-foreground">
          Presupuesto mensual
        </p>
        <BudgetInput />
      </section>

      <Separator className="mb-6" />

      <section className="mb-6">
        <DashboardSummary />
      </section>

      <Separator className="mb-6" />

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">Gastos</h2>
          {!showForm && (
            <button
              className="text-xs text-primary hover:underline"
              onClick={() => setShowForm(true)}
            >
              + Nuevo gasto
            </button>
          )}
        </div>

        {showForm && (
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Nuevo gasto</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm onClose={() => setShowForm(false)} />
            </CardContent>
          </Card>
        )}

        <ExpenseList />
      </section>
    </div>
  )
}

export default App
