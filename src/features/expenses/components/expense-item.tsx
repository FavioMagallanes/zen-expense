import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFormatCurrency } from "@/hooks/use-format-currency"
import type { Expense } from "@/types/expense"

const CATEGORY_COLORS: Record<string, string> = {
  "Tarjeta BBVA": "bg-[#004481]",
  "Tarjeta Supervielle": "bg-[#AC132D]",
  Préstamo: "bg-yellow-600",
  "Otros gastos": "bg-muted-foreground",
}

type ExpenseItemProps = {
  expense: Expense
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export const ExpenseItem = ({
  expense,
  onEdit,
  onDelete,
}: ExpenseItemProps) => {
  const { formatCurrency } = useFormatCurrency()
  const dotColor = CATEGORY_COLORS[expense.category] ?? "bg-muted-foreground"

  return (
    <tr className="group border-b border-border transition-colors hover:bg-card">
      <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
        {new Date(expense.createdAt).toLocaleDateString("es-AR")}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{expense.description}</span>
          {expense.installmentDetail && (
            <Badge variant="secondary" className="text-[10px]">
              {expense.installmentDetail}
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-1 rounded-full ${dotColor}`} />
          <span className="text-xs text-muted-foreground">
            {expense.category}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm text-destructive">
        -{formatCurrency(expense.amount)}
        {expense.installmentAmount !== null && (
          <div className="text-xs text-muted-foreground">
            Cuota: {formatCurrency(expense.installmentAmount)}
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onEdit(expense)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✎
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(expense.id)}
            className="text-destructive hover:text-destructive"
          >
            ✕
          </Button>
        </div>
      </td>
    </tr>
  )
}
