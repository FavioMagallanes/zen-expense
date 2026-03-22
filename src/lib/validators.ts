import { MAX_AMOUNT } from "@/lib/constants"

export const sanitizeNumericInput = (value: string): string =>
  value.replace(/[^0-9]/g, "")

export const validateAmount = (
  value: number
): { valid: boolean; error: string | null } => {
  if (!Number.isInteger(value)) {
    return { valid: false, error: "El monto debe ser un número entero" }
  }

  if (value < 0) {
    return { valid: false, error: "El monto no puede ser negativo" }
  }

  if (value > MAX_AMOUNT) {
    return {
      valid: false,
      error: `El monto no puede superar $${MAX_AMOUNT.toLocaleString("es-AR")}`,
    }
  }

  return { valid: true, error: null }
}

export const validateDescription = (
  value: string
): { valid: boolean; error: string | null } => {
  const trimmed = value.trim()

  if (trimmed.length === 0) {
    return { valid: false, error: "La descripción es requerida" }
  }

  return { valid: true, error: null }
}
