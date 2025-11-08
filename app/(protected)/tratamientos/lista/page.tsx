"use client";

import * as React from "react";
import { DataTable } from "./dataTable";
import { generateTratamientos } from "./dataGenerator";
import { Tratamiento } from "./columns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NuevoTratamientoDialog } from "./nuevoTratamientoDialog";

export default function DataTableDemo() {
  const [data, setData] = React.useState<Tratamiento[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setData(generateTratamientos(15));
  }, []);

  const handleAgregar = (nuevo: Tratamiento) => {
    setData((prev) => [...prev, nuevo]);
  };

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Lista de Tratamientos
          </h2>
          <p className="text-muted-foreground">
            Aquí puedes ver la lista de tratamientos registrados.
          </p>
        </div>

        {/* Botón + Nuevo */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Nuevo
            </Button>
          </DialogTrigger>

          <NuevoTratamientoDialog
            onGuardar={handleAgregar}
            onClose={() => setOpen(false)}
          />
        </Dialog>
      </div>

      <Separator />
      <DataTable data={data} />
    </div>
  );
}
