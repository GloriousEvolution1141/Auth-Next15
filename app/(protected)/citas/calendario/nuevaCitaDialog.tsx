"use client";

import * as React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Definimos tipo simple de cita (puedes reemplazar por tu interfaz real)
export interface Cita {
  id: string;
  paciente: string;
  fecha: string;
  hora: string;
  tratamiento: string;
  observaciones?: string;
  confirmada: boolean;
}

interface Props {
  onGuardar: (nueva: Cita) => void;
  onClose: () => void;
}

export function NuevoCitaDialog({ onGuardar, onClose }: Props) {
  const [nueva, setNueva] = React.useState<Cita>({
    id: "",
    paciente: "",
    fecha: "",
    hora: "",
    tratamiento: "",
    observaciones: "",
    confirmada: false,
  });

  const handleGuardar = () => {
    if (!nueva.paciente.trim()) {
      toast.error("Debe ingresar el nombre del paciente");
      return;
    }
    if (!nueva.fecha || !nueva.hora) {
      toast.error("Debe seleccionar fecha y hora");
      return;
    }

    const nuevaCita = {
      ...nueva,
      id: `cita_${Math.random().toString(36).substring(2, 9)}`,
    };

    onGuardar(nuevaCita);

    toast.success(`Cita de "${nuevaCita.paciente}" registrada correctamente`);

    setNueva({
      id: "",
      paciente: "",
      fecha: "",
      hora: "",
      tratamiento: "",
      observaciones: "",
      confirmada: false,
    });

    onClose();
  };

  const handleCancelar = () => {
    toast.info("Registro cancelado");
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Registrar nueva cita</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="paciente">Paciente</Label>
          <Input
            id="paciente"
            value={nueva.paciente}
            onChange={(e) => setNueva({ ...nueva, paciente: e.target.value })}
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={nueva.fecha}
              onChange={(e) => setNueva({ ...nueva, fecha: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              type="time"
              value={nueva.hora}
              onChange={(e) => setNueva({ ...nueva, hora: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tratamiento">Tratamiento</Label>
          <Input
            id="tratamiento"
            value={nueva.tratamiento}
            onChange={(e) =>
              setNueva({ ...nueva, tratamiento: e.target.value })
            }
            placeholder="Ej. Limpieza dental"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="observaciones">Observaciones</Label>
          <Textarea
            id="observaciones"
            value={nueva.observaciones ?? ""}
            onChange={(e) =>
              setNueva({ ...nueva, observaciones: e.target.value })
            }
            placeholder="Ej. Paciente con sensibilidad dental leve"
          />
        </div>

        <div className="flex items-center justify-between border rounded-md p-3">
          <Label htmlFor="confirmada" className="text-sm">
            Confirmada: {nueva.confirmada ? "Sí" : "No"}
          </Label>
          <Switch
            id="confirmada"
            checked={nueva.confirmada}
            onCheckedChange={(checked) =>
              setNueva({ ...nueva, confirmada: checked })
            }
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleCancelar}>
          Cancelar
        </Button>
        <Button onClick={handleGuardar}>Guardar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
