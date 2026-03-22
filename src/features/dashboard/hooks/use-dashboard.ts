import { useMemo } from "react";
import { useExpenseStore } from "@/stores/expense-store";

export const useDashboard = () => {
  const budget = useExpenseStore((s) => s.budget);
  const expenses = useExpenseStore((s) => s.expenses);

  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const remaining = useMemo(
    () => budget.amount - totalSpent,
    [budget.amount, totalSpent]
  );

  const isOverBudget = useMemo(
    () => totalSpent > budget.amount,
    [totalSpent, budget.amount]
  );

  const progressPercent = useMemo(() => {
    if (budget.amount === 0) return 0;
    return Math.min((totalSpent / budget.amount) * 100, 100);
  }, [totalSpent, budget.amount]);

  const expenseCount = expenses.length;

  return {
    budget,
    totalSpent,
    remaining,
    isOverBudget,
    progressPercent,
    expenseCount,
  };
};
