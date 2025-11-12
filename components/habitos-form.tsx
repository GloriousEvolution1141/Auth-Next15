"use client";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Paciente } from "@/components/pacientes/paciente-detalle"; // importa tu tipo

interface Props {
  paciente: Paciente;
}

export default function HabitosForm({ paciente }: Props) {
  const [consumeDrogas, setConsumeDrogas] = useState(!!paciente.consume_drogas);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form>
        <FieldGroup>
          <FieldSet>
            <div className="flex flex-col gap-4">
              {/* Tabaco y Alcohol */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="tabaco">Tabaco</FieldLabel>
                  <Select defaultValue={paciente.tabaco ?? ""}>
                    <SelectTrigger id="tabaco">
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nunca">Nunca</SelectItem>
                      <SelectItem value="ex-fumador">Ex fumador</SelectItem>
                      <SelectItem value="actual">Actual</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="alcohol">Alcohol</FieldLabel>
                  <Select defaultValue={paciente.alcohol ?? ""}>
                    <SelectTrigger id="alcohol">
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nunca">Nunca</SelectItem>
                      <SelectItem value="ocasional">Ocasional</SelectItem>
                      <SelectItem value="frecuente">Frecuente</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Drogas recreacionales */}
              <Field
                orientation="horizontal"
                className="md:col-span-2 items-center"
              >
                <Checkbox
                  id="drogas"
                  checked={consumeDrogas}
                  onCheckedChange={(checked) =>
                    setConsumeDrogas(checked === true)
                  }
                />
                <FieldLabel htmlFor="drogas" className="ml-2 font-normal">
                  Consume drogas recreacionales
                </FieldLabel>
              </Field>

              {/* Detalle del consumo */}
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="drogas-detalle">Detalle</FieldLabel>
                <Input
                  id="drogas-detalle"
                  placeholder="Especifique el consumo"
                  disabled={!consumeDrogas}
                  defaultValue={paciente.detalle_drogas ?? ""}
                />
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
