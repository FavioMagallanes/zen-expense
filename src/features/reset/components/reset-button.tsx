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

export const ResetButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { performReset } = useReset()

  const handleConfirm = useCallback(() => {
    performReset()
    setIsOpen(false)
  }, [performReset])

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setIsOpen(true)}>
        Limpieza Total
      </Button>

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
