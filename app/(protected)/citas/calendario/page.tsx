"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NuevoCitaDialog, Cita } from "./nuevaCitaDialog";
import { Toaster } from "sonner";
import CalendarioGoogle from "@/components/calendar-google";

// ✅ Importamos tus utilidades de notificaciones
import { toastExito, toastAtendida } from "@/components/utils/toast";

export default function CalendarioCitas() {
  // 🗓️ Datos locales simulados
  const [citasDelDia, setCitasDelDia] = React.useState([
    {
      id: 1,
      hora: "09:00 AM",
      paciente: "Juan Pérez",
      motivo: "Limpieza dental",
      atendida: false,
    },
    {
      id: 2,
      hora: "10:30 AM",
      paciente: "María Gómez",
      motivo: "Control ortodoncia",
      atendida: false,
    },
    {
      id: 3,
      hora: "12:00 PM",
      paciente: "Luis Rodríguez",
      motivo: "Extracción molar",
      atendida: false,
    },
    {
      id: 4,
      hora: "03:00 PM",
      paciente: "Ana Torres",
      motivo: "Revisión general",
      atendida: false,
    },
  ]);

  const [open, setOpen] = React.useState(false);

  // 🦷 Marcar cita como atendida
  const marcarComoAtendida = async (id: number, paciente: string) => {
    // Simulamos que tarda un momento
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Actualizamos el estado
    setCitasDelDia((prev) =>
      prev.map((cita) => (cita.id === id ? { ...cita, atendida: true } : cita))
    );

    // Mostramos notificación
    toastAtendida(`Cita de ${paciente}`);
  };

  // ➕ Agregar una nueva cita desde el diálogo
  const handleAgregarCita = (nuevo: Cita) => {
    const citaFormateada = {
      id: Number(Date.now()),
      hora: nuevo.hora,
      paciente: nuevo.paciente,
      motivo: nuevo.tratamiento || "Consulta general",
      atendida: false,
    };
    setCitasDelDia((prev) => [...prev, citaFormateada]);
    toastExito(`Cita para ${nuevo.paciente} agregada correctamente`);
  };

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="hidden h-full flex-1 flex-col gap-8 md:flex">
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Calendario y Citas
            </h2>
            <p className="text-muted-foreground">
              Gestiona las citas del día y visualiza tu calendario conectado.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Nueva cita
              </Button>
            </DialogTrigger>

            <NuevoCitaDialog
              onGuardar={handleAgregarCita}
              onClose={() => setOpen(false)}
            />
          </Dialog>
        </div>

        <Separator />

        {/* Contenido principal */}
        <div className="grid grid-cols-3 grid-rows-3 gap-6 h-[67vh]">
          {/* 🗓️ Calendario */}
          <div className="col-start-1 col-end-3 row-start-1 row-end-4">
            <Card className="h-[67vh] p-6 bg-blue-50 dark:bg-transparent border border-blue-200 dark:border-blue-700 flex flex-col">
              {/* <CardHeader>
                <CardTitle>Calendario Conectado a Google Calendar</CardTitle>
              </CardHeader> */}
              <div className="flex flex-col items-center justify-center flex-grow">
                <CalendarioGoogle embedUrl="https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima" />
              </div>
            </Card>
          </div>

          {/* 📋 Citas del día */}
          <div className="col-start-3 col-end-4 row-start-1 row-end-4">
            <Card className="h-full flex flex-col border border-neutral-300 dark:border-neutral-700 dark:bg-transparent">
              <CardHeader>
                <CardTitle>Citas del día</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-3">
                {citasDelDia.length > 0 ? (
                  citasDelDia.map((cita) => (
                    <div
                      key={cita.id}
                      className={`flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 transition ${
                        cita.atendida
                          ? "opacity-60 bg-neutral-100 dark:bg-neutral-900"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                          🕒 {cita.hora}
                        </p>
                        <p className="text-sm font-medium">{cita.paciente}</p>
                        <p className="text-xs text-neutral-500">
                          {cita.motivo}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 text-xs"
                        disabled={cita.atendida}
                        onClick={() =>
                          marcarComoAtendida(cita.id, cita.paciente)
                        }
                      >
                        {cita.atendida ? "Atendida" : "Marcar atendida"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500 italic">
                    No hay citas programadas para hoy.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
