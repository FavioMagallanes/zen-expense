import { useState, useCallback, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { useBudget } from "@/features/budget/hooks/use-budget"
import { useFormatCurrency } from "@/hooks/use-format-currency"
import { sanitizeNumericInput } from "@/lib/validators"

export const BudgetInput = () => {
  const { budget, updateBudget } = useBudget()
  const { formatCurrency } = useFormatCurrency()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleStartEditing = useCallback(() => {
    setInputValue(budget.amount === 0 ? "" : String(budget.amount))
    setError(null)
    setIsEditing(true)
  }, [budget.amount])

  const handleSave = useCallback(() => {
    const amount = inputValue === "" ? 0 : Number(inputValue)
    const result = updateBudget(amount)

    if (!result.success) {
      setError(result.error)
      return
    }

    setIsEditing(false)
    setError(null)
  }, [inputValue, updateBudget])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setError(null)
  }, [])

  const handleChange = useCallback((value: string) => {
    const sanitized = sanitizeNumericInput(value)
    setInputValue(sanitized)
    setError(null)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave()
      }

      if (e.key === "Escape") {
        handleCancel()
      }
    },
    [handleSave, handleCancel]
  )

  if (!isEditing) {
    return (
      <div
        className="flex cursor-pointer items-center gap-4 rounded border border-border bg-card p-6"
        onClick={handleStartEditing}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleStartEditing()
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Presupuesto Maestro
          </span>
          <span className="font-mono text-4xl leading-none font-bold text-foreground">
            {formatCurrency(budget.amount)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded border border-primary bg-card p-6">
      <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
        Editar Presupuesto
      </span>
      <div className="flex items-end gap-4">
        <div className="flex flex-1 items-center gap-1">
          <span className="font-mono text-2xl text-muted-foreground">$</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="stitch-input w-full font-mono text-2xl font-bold"
          />
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/80"
        >
          Guardar
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
