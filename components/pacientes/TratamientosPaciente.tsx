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

interface Tratamiento {
  id: string;
  fecha: string;
  nombre: string;
  descripcion: string;
  costo: number;
  estado: string;
}

export default function TratamientosPaciente({
  pacienteId,
}: {
  pacienteId: string;
}) {
  const supabase = createClient();
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTratamientos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tratamientos")
        .select("*")
        .eq("paciente_id", pacienteId)
        .order("fecha", { ascending: false });

      if (!error && data) setTratamientos(data);
      setLoading(false);
    };

    fetchTratamientos();
  }, [pacienteId]);

  if (loading) return <p>Cargando tratamientos...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tratamientos del Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />

        {tratamientos.length === 0 ? (
          <p className="text-gray-500">No hay tratamientos registrados.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tratamiento</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Costo (S/)</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tratamientos.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    {new Date(t.fecha).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{t.nombre}</TableCell>
                  <TableCell>{t.descripcion}</TableCell>
                  <TableCell>{t.costo.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.estado === "Completado"
                          ? "bg-green-100 text-green-700"
                          : t.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.estado}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="outline">Agregar tratamiento</Button>
        </div>
      </CardContent>
    </Card>
  );
}
