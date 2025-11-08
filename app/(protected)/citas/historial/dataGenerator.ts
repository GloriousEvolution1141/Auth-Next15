import { Cita } from "./columns";

export function generateCitas(count: number = 15): Cita[] {
  return Array.from({ length: count }, (_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i); // citas consecutivas

    const horas = ["09:00", "10:30", "12:00", "14:00", "15:30"];
    const hora = horas[i % horas.length];

    const estados: ("Programada" | "Cancelada")[] = ["Programada", "Cancelada"];

    const descripciones = [
      "Consulta general",
      "Limpieza dental profunda",
      "Blanqueamiento dental",
    ];

    return {
      id: `cita_${Math.random().toString(36).substring(2, 9)}_${i}`,
      paciente: `Paciente ${i + 1}`,
      descripcion: descripciones[i % descripciones.length],
      fecha: fecha.toISOString().split("T")[0], // yyyy-mm-dd
      hora: hora,
      estado: estados[i % estados.length],
    };
  });
}
