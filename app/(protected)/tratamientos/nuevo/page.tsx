"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CrearTratamientoPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    nombre: "",
    descripcion: "",
    costo: "",
    duracion: "",
    estado: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías hacer un POST al backend o Supabase, etc.
    console.log("Tratamiento creado:", formData);
    alert("Tratamiento creado exitosamente ✅");
    router.push("/tratamientos");
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Registrar nuevo tratamiento
          </CardTitle>
          <Separator className="mt-2" />
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del tratamiento</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Limpieza dental profunda"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe brevemente el tratamiento..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="costo">Costo (S/)</Label>
                <Input
                  id="costo"
                  name="costo"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.costo}
                  onChange={handleChange}
                  placeholder="Ej. 120.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion">Duración estimada</Label>
                <Input
                  id="duracion"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  placeholder="Ej. 45 minutos"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="estado">Activo</Label>
              <Switch
                id="estado"
                checked={formData.estado}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, estado: checked }))
                }
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/tratamientos")}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar tratamiento</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
