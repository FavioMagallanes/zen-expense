import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExpenseItem } from "@/features/expenses/components/expense-item";
import { ExpenseForm } from "@/features/expenses/components/expense-form";
import { useExpenses } from "@/features/expenses/hooks/use-expenses";
import type { Expense } from "@/types/expense";

export const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = useCallback((expense: Expense) => {
    setEditingExpense(expense);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setEditingExpense(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deletingId) {
      removeExpense(deletingId);
      setDeletingId(null);
    }
  }, [deletingId, removeExpense]);

  if (expenses.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No hay gastos registrados
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {editingExpense && (
        <div className="rounded-md border border-border p-3 mb-2">
          <ExpenseForm
            editingExpense={editingExpense}
            onClose={handleCloseEdit}
          />
        </div>
      )}

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={handleEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      ))}

      <Dialog
        open={deletingId !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingId(null);
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
            <Button variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
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
  );
};
