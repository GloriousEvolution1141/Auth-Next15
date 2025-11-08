"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
  estado?: "Activo" | "Inactivo";
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
    cell: ({ row }) => {
      const estado = (row.getValue("estado") as Paciente["estado"]) || "Activo";

      const variants: Record<string, string> = {
        Activo:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-green-100",
        Inactivo:
          "bg-red-100 text-red-800 border border-red-400 hover:bg-red-100",
      };

      return (
        <Badge className={`${variants[estado]} capitalize`}>{estado}</Badge>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const paciente = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem>Editar paciente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
