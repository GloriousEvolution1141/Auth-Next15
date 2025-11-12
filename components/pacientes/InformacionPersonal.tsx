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
import { Paciente } from "@/components/pacientes/paciente-detalle"; // importa tu tipo

interface Props {
  paciente: Paciente;
}

export default function InformacionPersonal({ paciente }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        {/* Columna 1: Filiación + Hábitos */}
        <div className="flex flex-col gap-4">
          <Card className="bg-blue-10 border border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Filiación del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <FiliacionForm paciente={paciente} />
            </CardContent>
          </Card>

          <Card className="bg-purple-10 border border-purple-200 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cigarette className="w-5 h-5 text-purple-600" />
                Hábitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <HabitosForm paciente={paciente} />
            </CardContent>
          </Card>
        </div>

        {/* Columna 2: Patología + Acciones */}
        <div className="flex flex-col gap-4 items-start">
          <Card className="w-full bg-red-10 border border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-600" />
                Antecedentes Patológicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <PatologiaForm paciente={paciente} />
            </CardContent>
          </Card>

          {/* Acciones (solo visual, sin lógica aún) */}
          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-2 md:gap-4 w-full justify-end">
              <Button variant="outline" type="button">
                Imprimir Ficha
              </Button>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="button">Guardar Ficha</Button>
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
