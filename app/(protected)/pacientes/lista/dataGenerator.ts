import { Paciente } from "./columns";

export function generatePacientes(count: number = 15): Paciente[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `pac_${Math.random().toString(36).substring(2, 9)}_${i}`,
    nombres: `Nombre${i + 1}`,
    apellidos: `Apellido${i + 1}`,
    fecha_nacimiento: "1990-01-01",
    dni: `${10000000 + i}`,
    genero: i % 2 === 0 ? "Masculino" : "Femenino",
    telefono: `9${Math.floor(10000000 + Math.random() * 90000000)}`,
    email: `paciente${i + 1}@example.com`,
    direccion: `Calle ${i + 1}`,
    alerta_medica: i % 3 === 0 ? "Alergia a penicilina" : null,
    estado: i % 2 === 0 ? "Activo" : "Inactivo",
  }));
}
