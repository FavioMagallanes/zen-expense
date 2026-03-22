import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES, type Category, type Expense } from "@/types/expense";
import { useExpenses } from "@/features/expenses/hooks/use-expenses";
import {
  sanitizeNumericInput,
  validateAmount,
  validateDescription,
} from "@/lib/validators";

type ExpenseFormProps = {
  editingExpense?: Expense | null;
  onClose?: () => void;
};

export const ExpenseForm = ({
  editingExpense = null,
  onClose,
}: ExpenseFormProps) => {
  const { createExpense, editExpense } = useExpenses();

  const [category, setCategory] = useState<Category | "">(
    editingExpense?.category ?? ""
  );
  const [amount, setAmount] = useState(
    editingExpense ? String(editingExpense.amount) : ""
  );
  const [description, setDescription] = useState(
    editingExpense?.description ?? ""
  );
  const [hasInstallments, setHasInstallments] = useState(
    editingExpense?.installmentAmount !== null &&
      editingExpense?.installmentAmount !== undefined
  );
  const [installmentAmount, setInstallmentAmount] = useState(
    editingExpense?.installmentAmount ? String(editingExpense.installmentAmount) : ""
  );
  const [installmentDetail, setInstallmentDetail] = useState(
    editingExpense?.installmentDetail ?? ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = useCallback(() => {
    setCategory("");
    setAmount("");
    setDescription("");
    setHasInstallments(false);
    setInstallmentAmount("");
    setInstallmentDetail("");
    setErrors({});
  }, []);

  const handleSubmit = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!category) {
      newErrors.category = "Seleccioná una categoría";
    }

    const amountNum = amount === "" ? 0 : Number(amount);
    const amountValidation = validateAmount(amountNum);

    if (!amountValidation.valid) {
      newErrors.amount = amountValidation.error!;
    } else if (amountNum === 0) {
      newErrors.amount = "El monto es requerido";
    }

    const descValidation = validateDescription(description);

    if (!descValidation.valid) {
      newErrors.description = descValidation.error!;
    }

    if (hasInstallments && installmentAmount) {
      const instAmountNum = Number(installmentAmount);
      const instValidation = validateAmount(instAmountNum);

      if (!instValidation.valid) {
        newErrors.installmentAmount = instValidation.error!;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expenseData = {
      category: category as Category,
      amount: amountNum,
      description: description.trim(),
      installmentAmount: hasInstallments && installmentAmount
        ? Number(installmentAmount)
        : null,
      installmentDetail: hasInstallments && installmentDetail.trim()
        ? installmentDetail.trim()
        : null,
    };

    if (editingExpense) {
      editExpense(editingExpense.id, expenseData);
    } else {
      createExpense(expenseData);
    }

    resetForm();
    onClose?.();
  }, [
    category,
    amount,
    description,
    hasInstallments,
    installmentAmount,
    installmentDetail,
    editingExpense,
    createExpense,
    editExpense,
    resetForm,
    onClose,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-foreground">
        {editingExpense ? "Editar gasto" : "Nuevo gasto"}
      </h3>

      <div className="flex flex-col gap-1.5">
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v as Category);
            setErrors((prev) => ({ ...prev, category: "" }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">$</span>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Monto"
            value={amount}
            onChange={(e) => {
              setAmount(sanitizeNumericInput(e.target.value));
              setErrors((prev) => ({ ...prev, amount: "" }));
            }}
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: "" }));
          }}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={hasInstallments}
          onCheckedChange={(checked) => {
            setHasInstallments(checked);

            if (!checked) {
              setInstallmentAmount("");
              setInstallmentDetail("");
            }
          }}
        />
        <span className="text-sm text-muted-foreground">En cuotas</span>
      </div>

      {hasInstallments && (
        <div className="flex flex-col gap-3 rounded-md border border-border p-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">$</span>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Monto por cuota"
                value={installmentAmount}
                onChange={(e) => {
                  setInstallmentAmount(sanitizeNumericInput(e.target.value));
                  setErrors((prev) => ({ ...prev, installmentAmount: "" }));
                }}
              />
            </div>
            {errors.installmentAmount && (
              <p className="text-xs text-destructive">
                {errors.installmentAmount}
              </p>
            )}
          </div>
          <Input
            type="text"
            placeholder='Detalle (ej. "Cuota 2 de 6")'
            value={installmentDetail}
            onChange={(e) => setInstallmentDetail(e.target.value)}
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSubmit}>
          {editingExpense ? "Actualizar" : "Agregar"}
        </Button>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
};
