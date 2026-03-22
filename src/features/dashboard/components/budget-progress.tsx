import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";

export const BudgetProgress = () => {
  const { progressPercent, isOverBudget } = useDashboard();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Progreso de gasto</span>
        <span className="tabular-nums">{Math.round(progressPercent)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOverBudget
              ? "bg-destructive"
              : progressPercent > 80
                ? "bg-yellow-500"
                : "bg-primary"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
