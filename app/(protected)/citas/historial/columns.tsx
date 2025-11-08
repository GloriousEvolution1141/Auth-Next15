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

// 🧩 Tipo base coherente con generateCitas()
export type Cita = {
  id: string;
  paciente: string;
  descripcion?: string | null;
  fecha?: string | null;
  hora?: string | null;
  estado?: "Programada" | "Cancelada";
};

// 🧱 Columnas para DataTable
export const columns: ColumnDef<Cita>[] = [
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
    accessorKey: "paciente",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Paciente <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("paciente")}</span>
    ),
  },

  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <span className="line-clamp-2">{row.getValue("descripcion") ?? "-"}</span>
    ),
  },

  {
    accessorKey: "fecha",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("fecha") ?? "-"}</span>,
  },

  {
    accessorKey: "hora",
    header: "Hora",
    cell: ({ row }) => <span>{row.getValue("hora") ?? "-"}</span>,
  },

  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado =
        (row.getValue("estado") as "Programada" | "Cancelada") || "Programada";

      const variants: Record<string, string> = {
        Programada:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-green-100",
        Cancelada:
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
      const cita = row.original;

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
            <DropdownMenuItem>Editar cita</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
