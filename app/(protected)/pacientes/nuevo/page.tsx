"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, HeartPulse, Cigarette } from "lucide-react";
import FiliacionForm from "@/components/filiacion-form";
import HabitosForm from "@/components/habitos-form";
import PatologiaForm from "@/components/patologia-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// 🔔 Importa tu utilidad de toasts centralizada
import { toastGuardar } from "@/components/utils/toast";
// import { Paciente } from "../nuevo/";

export default function NuevoPaciente() {
  // 🧩 Evento de guardar usando toast.ts
  const handleGuardar = async () => {
    await toastGuardar(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ name: "Ficha médica" });
          }, 2000);
        }),
      "Ficha médica"
    );
  };

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Registrar Nuevo Paciente
          </h2>
          <p className="text-muted-foreground">
            Agrega los datos del nuevo paciente para comenzar su historial
            clínico.
          </p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        {/* Columna 1: Filiación + Hábitos */}
        <div className="flex flex-col gap-4 order-1 md:order-1">
          {/* Filiación */}
          <Card className="bg-blue-10 border border-blue-200 order-1 md:order-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Filiación del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />

              <FiliacionForm />
            </CardContent>
          </Card>

          {/* Hábitos */}
          <Card className="bg-purple-10 border border-purple-200 order-3 md:order-none h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cigarette className="w-5 h-5 text-purple-600" />
                Hábitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />

              <HabitosForm />
            </CardContent>
          </Card>
        </div>

        {/* Columna 2: Patología + Acciones */}
        <div className="flex flex-col gap-4 items-start order-2 md:order-2">
          <Card className="w-full bg-red-10 border border-red-200 order-2 md:order-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-600" />
                Antecedentes Patológicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />
              <PatologiaForm />
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card className="w-full order-4 md:order-none">
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-2 md:gap-4 w-full justify-end">
              <Button variant="outline" type="button">
                Imprimir Ficha
              </Button>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button onClick={handleGuardar} type="button">
                Guardar Ficha
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
