import { toast } from "sonner";

export function toastExito(mensaje: string) {
  toast.success(mensaje);
}

export function toastError(mensaje: string) {
  toast.error(mensaje);
}

export function toastInfo(mensaje: string) {
  toast.message(mensaje);
}

//Guardar con estado (promesa)
export async function toastGuardar<T>(
  accion: () => Promise<T>,
  nombre: string = "Elemento"
) {
  return toast.promise(accion, {
    loading: `Guardando ${nombre.toLowerCase()}...`,
    success: () => `${nombre} guardada correctamente.`,
    error: `Error al guardar ${nombre.toLowerCase()}.`,
  });
}

//Actualizar con estado
export async function toastActualizar<T>(
  accion: () => Promise<T>,
  nombre: string = "Elemento"
) {
  return toast.promise(accion, {
    loading: `Actualizando ${nombre.toLowerCase()}...`,
    success: () => `${nombre} actualizada correctamente.`,
    error: `Error al actualizar ${nombre.toLowerCase()}.`,
  });
}

//Eliminar con estado
export async function toastEliminar<T>(
  accion: () => Promise<T>,
  nombre: string = "Elemento"
) {
  return toast.promise(accion, {
    loading: `Eliminando ${nombre.toLowerCase()}...`,
    success: () => `${nombre} eliminada correctamente.`,
    error: `Error al eliminar ${nombre.toLowerCase()}.`,
  });
}

//Nueva función: marcar como atendida
export function toastAtendida(nombre: string = "Cita") {
  toast.info(`${nombre} marcada como atendida.`, {
    description: "El estado se actualizó correctamente.",
  });
}
