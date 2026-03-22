import { useCallback } from "react"

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const useFormatCurrency = () => {
  const formatCurrency = useCallback(
    (amount: number): string => formatter.format(amount),
    []
  )

  return { formatCurrency }
}
