import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFormatCurrency } from "@/hooks/use-format-currency";
import type { Expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export const ExpenseItem = ({ expense, onEdit, onDelete }: ExpenseItemProps) => {
  const { formatCurrency } = useFormatCurrency();

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {expense.description}
          </span>
          {expense.installmentDetail && (
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              {expense.installmentDetail}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{expense.category}</span>
          {expense.installmentAmount !== null && (
            <span>· Cuota: {formatCurrency(expense.installmentAmount)}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold tabular-nums">
          {formatCurrency(expense.amount)}
        </span>
        <Button variant="ghost" size="icon-xs" onClick={() => onEdit(expense)}>
          ✎
        </Button>
        <Button
          variant="destructive"
          size="icon-xs"
          onClick={() => onDelete(expense.id)}
        >
          ✕
        </Button>
      </div>
    </div>
  );
};
