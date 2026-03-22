import { useDashboard } from "@/features/dashboard/hooks/use-dashboard"
import { useFormatCurrency } from "@/hooks/use-format-currency"
import { BudgetProgress } from "@/features/dashboard/components/budget-progress"

export const DashboardSummary = () => {
  const { budget, totalSpent, remaining, isOverBudget } = useDashboard()
  const { formatCurrency } = useFormatCurrency()

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Presupuesto Maestro */}
        <div className="flex flex-col gap-2 overflow-hidden rounded border border-border bg-card p-6">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Presupuesto Maestro
          </span>
          <span className="font-mono text-4xl leading-none font-bold text-foreground">
            {formatCurrency(budget.amount)}
          </span>
        </div>

        {/* Gastado */}
        <div className="flex flex-col gap-2 overflow-hidden rounded border border-border bg-card p-6">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Gastado
          </span>
          <span className="font-mono text-4xl leading-none font-bold text-destructive">
            {formatCurrency(totalSpent)}
          </span>
        </div>

        {/* Restante */}
        <div className="flex flex-col gap-2 overflow-hidden rounded border border-border bg-card p-6">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Restante
          </span>
          <span
            className={`font-mono text-4xl leading-none font-bold ${
              isOverBudget ? "text-destructive" : "text-primary"
            }`}
          >
            {formatCurrency(remaining)}
          </span>
          {isOverBudget && (
            <span className="text-xs text-destructive">
              Excediste por {formatCurrency(Math.abs(remaining))}
            </span>
          )}
        </div>
      </div>

      <BudgetProgress />
    </div>
  )
}
