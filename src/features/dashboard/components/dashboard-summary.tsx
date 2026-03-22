import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard"
import { useFormatCurrency } from "@/hooks/use-format-currency"
import { BudgetProgress } from "@/features/dashboard/components/budget-progress"

export const DashboardSummary = () => {
  const { budget, totalSpent, remaining, isOverBudget, expenseCount } =
    useDashboard()
  const { formatCurrency } = useFormatCurrency()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Presupuesto</p>
            <p className="text-lg font-semibold tabular-nums">
              {formatCurrency(budget.amount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total gastado</p>
            <p className="text-lg font-semibold tabular-nums">
              {formatCurrency(totalSpent)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Restante</p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {expenseCount} gasto{expenseCount !== 1 ? "s" : ""}
            </p>
          </div>
          <p
            className={`text-2xl font-bold tabular-nums ${
              isOverBudget ? "text-destructive" : "text-foreground"
            }`}
          >
            {formatCurrency(remaining)}
          </p>
          {isOverBudget && (
            <p className="mt-1 text-xs text-destructive">
              Excediste el presupuesto por {formatCurrency(Math.abs(remaining))}
            </p>
          )}
        </CardContent>
      </Card>

      <Separator />

      <BudgetProgress />
    </div>
  )
}
