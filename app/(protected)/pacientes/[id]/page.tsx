"use client";
import { useParams } from "next/navigation";
import PacienteDetalle from "@/components/pacientes/paciente-detalle";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PacientePageClient() {
  const params = useParams();
  const id = params?.id;

  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const supabase = createClient();
    supabase
      .from("pacientes")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setPaciente(data);
      });
  }, [id]);

  if (!id) return <p>ID de paciente no proporcionado.</p>;
  if (error) return <p>{error}</p>;
  if (!paciente) return <p>Cargando paciente...</p>;

  return <PacienteDetalle paciente={paciente} />;
}
