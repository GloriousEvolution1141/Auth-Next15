"use client";

import * as React from "react";
import { DataTable } from "./dataTable";
import { Paciente } from "./columns";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

export default function DataTableDemo() {
  const [data, setData] = React.useState<Paciente[]>([]);
  const [status, setStatus] = React.useState<string>("Conectando...");

  React.useEffect(() => {
    const supabase = createClient();

    const fetchPacientes = async () => {
      try {
        const { data: pacientes, error } = await supabase
          .from("pacientes") // <-- schema específico
          .select("*");

        if (error) {
          console.error("Supabase error:", error.message, error.details);
          setStatus("Error al conectar a Supabase");
        } else {
          setData(pacientes as Paciente[]);
          setStatus("Conectado correctamente");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Error al conectar a Supabase");
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 md:flex">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Lista de Pacientes
        </h2>
        <p className="text-muted-foreground">{status}</p>
      </div>
      <Separator />
      <DataTable data={data} />
    </div>
  );
}
