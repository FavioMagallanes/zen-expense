import { useDashboard } from "@/features/dashboard/hooks/use-dashboard"

export const BudgetProgress = () => {
  const { progressPercent, isOverBudget } = useDashboard()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Consumo</span>
        <span className="font-mono text-foreground">
          {Math.round(progressPercent)}%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden bg-card">
        <div
          className={`h-full transition-all duration-300 ${
            isOverBudget
              ? "bg-destructive"
              : progressPercent > 80
                ? "bg-yellow-500"
                : "bg-primary"
          }`}
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
