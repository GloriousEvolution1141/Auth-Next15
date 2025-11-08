"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarioGoogle from "@/components/calendar-google";
import { Toaster, toast } from "sonner";

export default function CalendarioCitas() {
  // 🗓️ Datos locales simulados
  const citasDelDia = [
    {
      id: 1,
      hora: "09:00 AM",
      paciente: "Juan Pérez",
      motivo: "Limpieza dental",
    },
    {
      id: 2,
      hora: "10:30 AM",
      paciente: "María Gómez",
      motivo: "Control ortodoncia",
    },
    {
      id: 3,
      hora: "12:00 PM",
      paciente: "Luis Rodríguez",
      motivo: "Extracción molar",
    },
    {
      id: 4,
      hora: "03:00 PM",
      paciente: "Ana Torres",
      motivo: "Revisión general",
    },
  ];

  // 🔧 Acción local simulada con Sonner
  const marcarComoAtendida = async (id: number, paciente: string) => {
    // Simulamos un proceso asíncrono
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(paciente);
        }, 1500);
      }),
      {
        loading: `Marcando cita de ${paciente} como atendida...`,
        success: (nombre) => `✅ Cita de ${nombre} marcada como atendida.`,
        error: "❌ No se pudo marcar la cita como atendida.",
      }
    );
  };

  return (
    <>
      {/* 🔔 Toaster global para mostrar notificaciones */}
      <Toaster richColors position="top-right" />

      <div className="space-y-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[80vh]">
          {/* 🗓️ Card del calendario */}
          <div className="col-start-1 col-end-3 row-start-1 row-end-4">
            <Card className="h-full bg-blue-50 dark:bg-transparent border border-blue-200 dark:border-blue-700 flex flex-col">
              <CardHeader>
                <CardTitle>Calendario Conectado a Google Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CalendarioGoogle embedUrl="https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima" />
              </CardContent>
            </Card>
          </div>

          {/* 📋 Card de citas del día */}
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
                      className="flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
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
                        onClick={() =>
                          marcarComoAtendida(cita.id, cita.paciente)
                        }
                      >
                        Marcar como atendida
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
