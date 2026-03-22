import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExpenseItem } from "@/features/expenses/components/expense-item"
import { ExpenseForm } from "@/features/expenses/components/expense-form"
import { useExpenses } from "@/features/expenses/hooks/use-expenses"
import type { Expense } from "@/types/expense"

export const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenses()
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleEdit = useCallback((expense: Expense) => {
    setEditingExpense(expense)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setEditingExpense(null)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (deletingId) {
      removeExpense(deletingId)
      setDeletingId(null)
    }
  }, [deletingId, removeExpense])

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded border border-border bg-card px-6 py-12 text-center">
        <span className="text-sm text-muted-foreground">
          No hay gastos registrados
        </span>
        <span className="text-xs text-muted-foreground/60">
          Usá la entrada rápida para agregar tu primer gasto
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {editingExpense && (
        <div className="rounded border border-primary bg-card p-6">
          <h3 className="mb-4 text-lg font-bold">Editar Transacción</h3>
          <ExpenseForm
            editingExpense={editingExpense}
            onClose={handleCloseEdit}
          />
        </div>
      )}

      <div className="overflow-hidden rounded border border-border bg-card">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-xs tracking-wider text-muted-foreground uppercase">
              <th className="w-32 px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="w-48 px-4 py-3 font-medium">Cuenta</th>
              <th className="w-32 px-4 py-3 text-right font-medium">Monto</th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="text-sm">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={(id) => setDeletingId(id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={deletingId !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingId(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar gasto</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que querés eliminar este gasto? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeletingId(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
