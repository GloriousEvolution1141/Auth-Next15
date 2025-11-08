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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cita } from "./columns";
import { toast } from "sonner";

interface Props {
  onGuardar: (nuevo: Cita) => void;
  onClose: () => void;
}

export function NuevaCitaDialog({ onGuardar, onClose }: Props) {
  const [nuevo, setNuevo] = React.useState<Cita>({
    id: "",
    paciente: "",
    descripcion: "",
    fecha: "",
    hora: "",
    estado: "Programada",
  });

  const handleGuardar = () => {
    if (!nuevo.paciente.trim()) {
      toast.error("Debe ingresar el nombre del paciente");
      return;
    }

    const nuevaCita = {
      ...nuevo,
      id: `cita_${Math.random().toString(36).substring(2, 9)}`,
    };

    onGuardar(nuevaCita);
    setNuevo({
      id: "",
      paciente: "",
      descripcion: "",
      fecha: "",
      hora: "",
      estado: "Programada",
    });

    toast.success(`Cita de "${nuevaCita.paciente}" agregada correctamente`);
    onClose();
  };

  const handleCancelar = () => {
    toast.info("Registro cancelado");
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Registrar nueva cita</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="paciente">Paciente</Label>
          <Input
            id="paciente"
            value={nuevo.paciente}
            onChange={(e) => setNuevo({ ...nuevo, paciente: e.target.value })}
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            value={nuevo.descripcion ?? ""}
            onChange={(e) =>
              setNuevo({ ...nuevo, descripcion: e.target.value })
            }
            placeholder="Ej. Consulta general, limpieza dental"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={nuevo.fecha ?? ""}
              onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              type="time"
              value={nuevo.hora ?? ""}
              onChange={(e) => setNuevo({ ...nuevo, hora: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border rounded-md p-3">
          <Label htmlFor="estado" className="text-sm">
            Estado: {nuevo.estado}
          </Label>
          <Switch
            id="estado"
            checked={nuevo.estado === "Programada"}
            onCheckedChange={(checked) =>
              setNuevo({
                ...nuevo,
                estado: checked ? "Programada" : "Cancelada",
              })
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
