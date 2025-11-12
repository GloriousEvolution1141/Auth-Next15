"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export type Paciente = {
  id: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  dni: string;
  genero?: string | null;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
  alerta_medica?: string | null;
  estado_civil?: string | null;
  creado_en?: string | null;
  estado: "Activo" | "Inactivo";
};

const supabase = createClient();

const variants: Record<"Activo" | "Inactivo", string> = {
  Activo:
    "bg-green-100 text-green-800 border border-green-400 hover:bg-green-100",
  Inactivo: "bg-red-100 text-red-800 border border-red-400 hover:bg-red-100",
};

export const columns: ColumnDef<Paciente>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombres <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("nombres")}</span>
    ),
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
    cell: ({ row }) => <span>{row.getValue("apellidos")}</span>,
  },
  {
    accessorKey: "dni",
    header: "DNI",
    cell: ({ row }) => <span>{row.getValue("dni")}</span>,
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
    cell: ({ row }) => <span>{row.getValue("telefono") ?? "-"}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="lowercase">{row.getValue("email") ?? "-"}</span>
    ),
  },
  {
    accessorKey: "genero",
    header: "Género",
    cell: ({ row }) => <span>{row.getValue("genero") ?? "-"}</span>,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 250, // <-- ancho fijo
    minSize: 250,
    maxSize: 250,
    cell: ({ row }) => {
      const [estado, setEstado] = useState<"Activo" | "Inactivo">(
        row.original.estado
      );
      const router = useRouter();

      const toggleEstadoPaciente = async () => {
        const nuevoEstado = estado === "Activo" ? "Inactivo" : "Activo";

        const { error } = await supabase
          .from("pacientes")
          .update({ estado: nuevoEstado })
          .eq("id", row.original.id);

        if (error) {
          toast.error("Error al actualizar el estado");
          console.error(error.message);
        } else {
          setEstado(nuevoEstado);
          row.original.estado = nuevoEstado;
          toast.success(
            `Paciente ${row.original.nombres} ${row.original.apellidos} ahora está ${nuevoEstado}`
          );
        }
      };

      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between gap-2 min-w-[200px]">
            <Badge className={`${variants[estado]} capitalize`}>{estado}</Badge>
          </div>{" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/pacientes/${row.original.id}`)}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleEstadoPaciente}>
                {estado === "Activo"
                  ? "Deshabilitar paciente"
                  : "Habilitar paciente"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
