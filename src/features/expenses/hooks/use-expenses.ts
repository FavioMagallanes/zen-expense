import { useCallback } from "react";
import { useExpenseStore } from "@/stores/expense-store";
import type { Expense, Category } from "@/types/expense";

export const useExpenses = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const addExpense = useExpenseStore((s) => s.addExpense);
  const updateExpense = useExpenseStore((s) => s.updateExpense);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);

  const createExpense = useCallback(
    (data: {
      category: Category;
      amount: number;
      description: string;
      installmentAmount: number | null;
      installmentDetail: string | null;
    }) => {
      addExpense(data);
    },
    [addExpense]
  );

  const editExpense = useCallback(
    (
      id: string,
      data: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>
    ) => {
      updateExpense(id, data);
    },
    [updateExpense]
  );

  const removeExpense = useCallback(
    (id: string) => {
      deleteExpense(id);
    },
    [deleteExpense]
  );

  return { expenses, createExpense, editExpense, removeExpense };
};
