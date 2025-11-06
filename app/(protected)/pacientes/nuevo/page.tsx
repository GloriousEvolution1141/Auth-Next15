"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, HeartPulse, Cigarette } from "lucide-react";
import FiliacionForm from "@/components/filiacion-form";
import HabitosForm from "@/components/habitos-form";
import PatologiaForm from "@/components/patologia-form";
import { Button } from "@/components/ui/button";

export default function NuevoPaciente() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8">
      {/* Columna 1: Filiación + Hábitos */}
      <div className="flex flex-col gap-4">
        <Card className="bg-blue-10 border border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">1.</span>
              Filiación del Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiliacionForm />
          </CardContent>
        </Card>

        <Card className="bg-purple-10 border border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cigarette className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">3.</span>
              Hábitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HabitosForm />
          </CardContent>
        </Card>
      </div>

      {/* Columna 2: Patología + Acciones */}
      <div className="flex flex-col gap-4 items-start">
        {/* Patología */}
        <Card className="w-full bg-red-10 border border-red-200 ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-600" />
              <span className="font-semibold">2.</span>
              Antecedentes Patológicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PatologiaForm />
          </CardContent>
        </Card>

        {/* Acciones: solo lo justo */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 justify-end">
            <Button variant="outline" type="button">
              Imprimir Ficha
            </Button>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Guardar Ficha</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
