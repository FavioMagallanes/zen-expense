import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CATEGORIES, type Category, type Expense } from "@/types/expense"
import { useExpenses } from "@/features/expenses/hooks/use-expenses"
import {
  sanitizeNumericInput,
  validateAmount,
  validateDescription,
} from "@/lib/validators"

type ExpenseFormProps = {
  editingExpense?: Expense | null
  onClose?: () => void
  disabled?: boolean
}

export const ExpenseForm = ({
  editingExpense = null,
  onClose,
  disabled = false,
}: ExpenseFormProps) => {
  const { createExpense, editExpense } = useExpenses()

  const [category, setCategory] = useState<Category | "">(
    editingExpense?.category ?? ""
  )
  const [amount, setAmount] = useState(
    editingExpense ? String(editingExpense.amount) : ""
  )
  const [description, setDescription] = useState(
    editingExpense?.description ?? ""
  )
  const [hasInstallments, setHasInstallments] = useState(
    editingExpense?.installmentAmount !== null &&
      editingExpense?.installmentAmount !== undefined
  )
  const [installmentAmount, setInstallmentAmount] = useState(
    editingExpense?.installmentAmount
      ? String(editingExpense.installmentAmount)
      : ""
  )
  const [installmentDetail, setInstallmentDetail] = useState(
    editingExpense?.installmentDetail ?? ""
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const resetForm = useCallback(() => {
    setCategory("")
    setAmount("")
    setDescription("")
    setHasInstallments(false)
    setInstallmentAmount("")
    setInstallmentDetail("")
    setErrors({})
  }, [])

  const handleSubmit = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!category) {
      newErrors.category = "Seleccioná una categoría"
    }

    const amountNum = amount === "" ? 0 : Number(amount)
    const amountValidation = validateAmount(amountNum)

    if (!amountValidation.valid) {
      newErrors.amount = amountValidation.error!
    } else if (amountNum === 0) {
      newErrors.amount = "El monto es requerido"
    }

    const descValidation = validateDescription(description)

    if (!descValidation.valid) {
      newErrors.description = descValidation.error!
    }

    if (hasInstallments && installmentAmount) {
      const instAmountNum = Number(installmentAmount)
      const instValidation = validateAmount(instAmountNum)

      if (!instValidation.valid) {
        newErrors.installmentAmount = instValidation.error!
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const expenseData = {
      category: category as Category,
      amount: amountNum,
      description: description.trim(),
      installmentAmount:
        hasInstallments && installmentAmount ? Number(installmentAmount) : null,
      installmentDetail:
        hasInstallments && installmentDetail.trim()
          ? installmentDetail.trim()
          : null,
    }

    if (editingExpense) {
      editExpense(editingExpense.id, expenseData)
    } else {
      createExpense(expenseData)
    }

    resetForm()
    onClose?.()
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
  ])

  return (
    <fieldset disabled={disabled} className="contents">
      <form
        className="flex flex-wrap items-end gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="flex min-w-50 flex-1 flex-col gap-1">
          <label
            className="text-xs text-muted-foreground"
            htmlFor="expense-desc"
          >
            Descripción
          </label>
          <input
            id="expense-desc"
            type="text"
            placeholder="ej. Supermercado"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              setErrors((prev) => ({ ...prev, description: "" }))
            }}
            className="stitch-input w-full text-sm"
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="flex min-w-37.5 flex-1 flex-col gap-1">
          <label
            className="text-xs text-muted-foreground"
            htmlFor="expense-amount"
          >
            Monto
          </label>
          <input
            id="expense-amount"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              setAmount(sanitizeNumericInput(e.target.value))
              setErrors((prev) => ({ ...prev, amount: "" }))
            }}
            className="stitch-input w-full font-mono text-sm"
          />
          {errors.amount && (
            <p className="text-xs text-destructive">{errors.amount}</p>
          )}
        </div>

        <div className="flex min-w-37.5 flex-1 flex-col gap-1">
          <label className="text-xs text-muted-foreground">Cuenta</label>
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v as Category)
              setErrors((prev) => ({ ...prev, category: "" }))
            }}
          >
            <SelectTrigger className="h-auto rounded-none border-0 border-b border-muted-foreground bg-transparent px-0 py-1 text-sm shadow-none focus:border-primary focus:ring-0">
              <SelectValue placeholder="Seleccionar" />
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

        <div className="flex w-24 flex-col gap-1">
          <label
            className="text-xs text-muted-foreground"
            htmlFor="expense-installments"
          >
            Cuotas
          </label>
          <input
            id="expense-installments"
            type="text"
            placeholder="1/1"
            value={installmentDetail}
            onChange={(e) => setInstallmentDetail(e.target.value)}
            className="stitch-input w-full text-center text-sm"
          />
        </div>

        {hasInstallments && (
          <div className="flex w-32 flex-col gap-1">
            <label
              className="text-xs text-muted-foreground"
              htmlFor="expense-inst-amount"
            >
              Monto cuota
            </label>
            <input
              id="expense-inst-amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={installmentAmount}
              onChange={(e) => {
                setInstallmentAmount(sanitizeNumericInput(e.target.value))
                setErrors((prev) => ({ ...prev, installmentAmount: "" }))
              }}
              className="stitch-input w-full font-mono text-sm"
            />
            {errors.installmentAmount && (
              <p className="text-xs text-destructive">
                {errors.installmentAmount}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pb-1">
          <Switch
            checked={hasInstallments}
            onCheckedChange={(checked) => {
              setHasInstallments(checked)
              if (!checked) {
                setInstallmentAmount("")
                setInstallmentDetail("")
              }
            }}
          />
          <span className="text-xs text-muted-foreground">En cuotas</span>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="h-8 rounded bg-linear-to-r from-primary to-primary/70 px-6 text-sm font-medium text-primary-foreground transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          {editingExpense ? "Actualizar" : "Agregar"}
        </button>

        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
        )}
      </form>
    </fieldset>
  )
}
