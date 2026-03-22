import { useState, useCallback, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBudget } from "@/features/budget/hooks/use-budget";
import { useFormatCurrency } from "@/hooks/use-format-currency";
import { sanitizeNumericInput } from "@/lib/validators";

export const BudgetInput = () => {
  const { budget, updateBudget } = useBudget();
  const { formatCurrency } = useFormatCurrency();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleStartEditing = useCallback(() => {
    setInputValue(budget.amount === 0 ? "" : String(budget.amount));
    setError(null);
    setIsEditing(true);
  }, [budget.amount]);

  const handleSave = useCallback(() => {
    const amount = inputValue === "" ? 0 : Number(inputValue);
    const result = updateBudget(amount);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setIsEditing(false);
    setError(null);
  }, [inputValue, updateBudget]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setError(null);
  }, []);

  const handleChange = useCallback((value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setInputValue(sanitized);
    setError(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave();
      }

      if (e.key === "Escape") {
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  if (!isEditing) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold tracking-tight">
          {formatCurrency(budget.amount)}
        </span>
        <Button variant="outline" size="sm" onClick={handleStartEditing}>
          Editar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">$</span>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="max-w-48"
        />
        <Button size="sm" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
