import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useReset } from "@/features/reset/hooks/use-reset"

type ResetButtonProps = {
  disabled?: boolean
}

export const ResetButton = ({ disabled = false }: ResetButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { performReset } = useReset()

  const handleConfirm = useCallback(() => {
    performReset()
    setIsOpen(false)
  }, [performReset])

  return (
    <>
      <button
        className="flex items-center gap-2 rounded border border-destructive px-3 py-1.5 text-xs font-bold tracking-wider text-destructive uppercase transition-colors hover:bg-destructive hover:text-white disabled:pointer-events-none disabled:opacity-40"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        <span className="text-sm">⚠</span>
        <span>Reiniciar Sistema</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpieza Total</DialogTitle>
            <DialogDescription>
              Esta acción eliminará todos los gastos y reiniciará el presupuesto
              a $0. Esta acción es irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" size="sm" onClick={handleConfirm}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
