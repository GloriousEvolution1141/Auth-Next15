"use client";

import * as React from "react";
import { DataTable } from "./dataTable";
import { generatePacientes } from "./dataGenerator";
import { Paciente } from "./columns";
import { Separator } from "@/components/ui/separator";

export default function DataTableDemo() {
  const [data, setData] = React.useState<Paciente[]>([]);

  React.useEffect(() => {
    setData(generatePacientes(15));
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Lista de Pacientes
          </h2>
          <p className="text-muted-foreground">
            Aquí puedes ver la lista de pacientes registrados.
          </p>
        </div>
      </div>
      <Separator />
      <DataTable data={data} />
    </div>
  );
}
