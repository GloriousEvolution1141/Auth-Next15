"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

interface HistorialClinico {
  uuid: string;
  paciente_id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  fecha_creacion: string;
}

export default function HistorialClinicoPaciente({
  pacienteId,
}: {
  pacienteId: string;
}) {
  const supabase = createClient();
  const [historial, setHistorial] = useState<HistorialClinico[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);

      try {
        // 1️⃣ Traer historial clínico
        const { data: historialData, error: historialError } = await supabase
          .from("historial_clinico")
          .select("*")
          .eq("paciente_id", pacienteId)
          .order("fecha_creacion", { ascending: false });

        if (historialError) throw historialError;
        if (!historialData || historialData.length === 0) {
          setHistorial([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Traer todos los personal de una vez
        const personalIds = Array.from(
          new Set(historialData.map((h) => h.creado_por))
        );
        const { data: personalData } = await supabase
          .from("personal")
          .select("id, nombres, apellidos, especialidad_id")
          .in("id", personalIds);

        // 3️⃣ Traer todas las especialidades de una vez
        const especialidadIds = Array.from(
          new Set(personalData?.map((p) => p.especialidad_id))
        );
        const { data: especialidadesData } = await supabase
          .from("especialidades")
          .select("id, nombre")
          .in("id", especialidadIds);

        // 4️⃣ Mapear historial
        const historialMapeado = historialData.map((h: any) => {
          const personal = personalData?.find((p) => p.id === h.creado_por);
          const especialidad = especialidadesData?.find(
            (e) => e.id === personal?.especialidad_id
          );
          return {
            uuid: h.uuid,
            paciente_id: h.paciente_id,
            nombre: personal?.nombres || "",
            apellido: personal?.apellidos || "",
            especialidad: especialidad?.nombre || "",
            diagnostico: h.diagnostico,
            tratamiento: h.tratamiento,
            observaciones: h.observaciones,
            fecha_creacion: h.fecha_creacion,
          };
        });

        setHistorial(historialMapeado);
      } catch (err) {
        console.error("Error al obtener historial clínico:", err);
        setHistorial([]);
      }

      setLoading(false);
    };

    if (pacienteId) fetchHistorial();
  }, [pacienteId, supabase]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial Clínico del Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />

        {loading && <p>Cargando historial clínico...</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Creado por</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Diagnóstico</TableHead>
              <TableHead>Tratamiento</TableHead>
              <TableHead>Observaciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historial.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No hay registros en el historial clínico.
                </TableCell>
              </TableRow>
            ) : (
              historial.map((h, index) => (
                <TableRow key={`${h.uuid}-${index}`}>
                  <TableCell>
                    {new Date(h.fecha_creacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{`${h.nombre} ${h.apellido}`}</TableCell>
                  <TableCell>{h.especialidad}</TableCell>
                  <TableCell>{h.diagnostico}</TableCell>
                  <TableCell>{h.tratamiento}</TableCell>
                  <TableCell>{h.observaciones}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <Button variant="outline">Agregar registro</Button>
        </div>
      </CardContent>
    </Card>
  );
}
