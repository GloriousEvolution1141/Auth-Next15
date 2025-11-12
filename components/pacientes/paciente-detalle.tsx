"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import InformacionPersonal from "@/components/pacientes/InformacionPersonal";
import HistorialClinico from "@/components/pacientes/HistorialClinico";
import TratamientosPaciente from "@/components/pacientes/TratamientosPaciente";
import EstadoCuenta from "@/components/pacientes/EstadoCuenta";

export interface Paciente {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fecha_nacimiento: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  estado_civil?: string;
  alerta_medica?: string;
  tabaco?: string;
  alcohol?: string;
  consume_drogas?: boolean;
  detalle_drogas?: string;
  antecedentes_patologicos?: string;
}

export default function PacienteDetalle({ paciente }: { paciente: Paciente }) {
  const [datos] = useState<Paciente>(paciente);

  return (
    <div className="space-y-6">
      {/* 🔹 Encabezado: volver + info paciente en la misma línea */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Link href="/pacientes/lista">
            <Button variant="secondary">← Volver a la lista</Button>
          </Link>

          {/* Información del paciente */}
          <div>
            <h3 className="text-lg font-medium">
              {datos.nombres} {datos.apellidos}
            </h3>
            <p className="text-gray-600">{datos.dni}</p>
          </div>
        </div>
      </div>

      {/* 🧭 Pestañas principales */}
      <Tabs defaultValue="info">
        <TabsList className="flex flex-wrap mb-6">
          <TabsTrigger value="info">Información Personal</TabsTrigger>
          <TabsTrigger value="odontograma">Odontograma</TabsTrigger>
          <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
          <TabsTrigger value="historial">Historial Clínico</TabsTrigger>
          <TabsTrigger value="cuenta">Estado de Cuenta</TabsTrigger>
        </TabsList>

        {/* 🧩 Información personal */}
        <TabsContent value="info">
          <InformacionPersonal paciente={datos} />
        </TabsContent>

        {/* 🧩 Historial clínico */}
        <TabsContent value="historial">
          <HistorialClinico pacienteId={datos.id} />
        </TabsContent>

        {/* 🧩 Odontograma */}
        <TabsContent value="odontograma">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h4 className="text-lg font-medium mb-4">Odontograma</h4>
            <p className="text-gray-600">
              Aquí iría el componente del odontograma digital (por ejemplo, un
              gráfico interactivo).
            </p>
          </div>
        </TabsContent>

        {/* 🧩 Tratamientos */}
        <TabsContent value="tratamientos">
          <TratamientosPaciente pacienteId={datos.id} />
        </TabsContent>

        {/* 🧩 Estado de cuenta */}
        <TabsContent value="cuenta">
          <EstadoCuenta pacienteId={datos.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
