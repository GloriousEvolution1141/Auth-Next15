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
import { Tratamiento } from "./columns";
import { toast } from "sonner";

interface Props {
  onGuardar: (nuevo: Tratamiento) => void;
  onClose: () => void;
}

export function NuevoTratamientoDialog({ onGuardar, onClose }: Props) {
  const [nuevo, setNuevo] = React.useState<Tratamiento>({
    id: "",
    nombre: "",
    descripcion: "",
    costo: 0,
    duracion: "",
    estado: "Activo",
  });

  const handleGuardar = () => {
    if (!nuevo.nombre.trim()) {
      toast.error("Debe ingresar un nombre para el tratamiento");
      return;
    }

    const nuevoTratamiento = {
      ...nuevo,
      id: `trat_${Math.random().toString(36).substring(2, 9)}`,
    };

    onGuardar(nuevoTratamiento);
    setNuevo({
      id: "",
      nombre: "",
      descripcion: "",
      costo: 0,
      duracion: "",
      estado: "Activo",
    });

    toast.success(
      `Tratamiento "${nuevoTratamiento.nombre}" agregado correctamente`
    );
    onClose();
  };

  const handleCancelar = () => {
    toast.info("Registro cancelado");
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Registrar nuevo tratamiento</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            placeholder="Ej. Limpieza dental"
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
            placeholder="Ej. Limpieza profunda y pulido dental"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="costo">Costo (S/)</Label>
            <Input
              id="costo"
              type="number"
              value={nuevo.costo ?? 0}
              onChange={(e) =>
                setNuevo({ ...nuevo, costo: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duracion">Duración</Label>
            <Input
              id="duracion"
              value={nuevo.duracion ?? ""}
              onChange={(e) => setNuevo({ ...nuevo, duracion: e.target.value })}
              placeholder="Ej. 45 minutos"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border rounded-md p-3">
          <Label htmlFor="estado" className="text-sm">
            Estado: {nuevo.estado}
          </Label>
          <Switch
            id="estado"
            checked={nuevo.estado === "Activo"}
            onCheckedChange={(checked) =>
              setNuevo({ ...nuevo, estado: checked ? "Activo" : "Inactivo" })
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
