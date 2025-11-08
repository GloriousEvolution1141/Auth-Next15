"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Page() {
  const [paciente, setPaciente] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [confirmada, setConfirmada] = useState(false);

  const handleGuardar = () => {
    if (!paciente || !tratamiento || !fecha || !hora) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    toast.success(`Cita registrada correctamente para ${paciente}`);
    // Aquí podrías llamar a una API o guardar en tu base de datos
    setPaciente("");
    setTratamiento("");
    setFecha("");
    setHora("");
    setObservaciones("");
    setConfirmada(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Registrar nueva cita
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Completa los campos para agendar una nueva cita odontológica.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {/* Paciente */}
            <div className="space-y-2">
              <Label htmlFor="paciente">Paciente</Label>
              <Input
                id="paciente"
                placeholder="Ej. Juan Pérez"
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
              />
            </div>

            {/* Tratamiento */}
            <div className="space-y-2">
              <Label htmlFor="tratamiento">Tratamiento</Label>
              <Select value={tratamiento} onValueChange={setTratamiento}>
                <SelectTrigger id="tratamiento">
                  <SelectValue placeholder="Selecciona un tratamiento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="limpieza">Limpieza dental</SelectItem>
                  <SelectItem value="extraccion">Extracción</SelectItem>
                  <SelectItem value="blanqueamiento">Blanqueamiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha y hora */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                placeholder="Notas adicionales sobre la cita..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>

            {/* Confirmación */}
            <div className="flex items-center justify-between border rounded-md p-3">
              <Label htmlFor="confirmada" className="text-sm">
                ¿Confirmada?
              </Label>
              <Switch
                id="confirmada"
                checked={confirmada}
                onCheckedChange={setConfirmada}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => toast.info("Acción cancelada")}
            >
              Cancelar
            </Button>
            <Button onClick={handleGuardar}>Guardar cita</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
