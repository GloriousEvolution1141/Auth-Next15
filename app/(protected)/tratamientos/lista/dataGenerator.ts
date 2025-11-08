import { Tratamiento } from "./columns";

export function generateTratamientos(count: number = 15): Tratamiento[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `trat_${Math.random().toString(36).substring(2, 9)}_${i}`,
    nombre: `Tratamiento ${i + 1}`,
    descripcion:
      i % 3 === 0
        ? "Limpieza dental profunda y pulido"
        : i % 3 === 1
        ? "Extracción de muela con anestesia local"
        : "Blanqueamiento dental con luz LED",
    costo: Math.floor(Math.random() * 300) + 50, // entre 50 y 350 aprox
    duracion: `${30 + Math.floor(Math.random() * 90)} minutos`,
    estado: i % 2 === 0 ? "Activo" : "Inactivo",
  }));
}
