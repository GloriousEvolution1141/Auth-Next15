"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function HabitosForm() {
  const [consumeDrogas, setConsumeDrogas] = useState(false);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form>
        <FieldGroup>
          <FieldSet>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
            <div className="flex flex-col gap-4">
              {" "}
              {/* Tabaco */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="tabaco">Tabaco</FieldLabel>
                  <Select defaultValue="">
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
                {/* Alcohol */}
                <Field>
                  <FieldLabel htmlFor="alcohol">Alcohol</FieldLabel>
                  <Select defaultValue="">
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
              {/* Campo para detallar consumo, inicialmente deshabilitado */}
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="drogas-detalle">Detalle</FieldLabel>
                <Input
                  id="drogas-detalle"
                  placeholder="Especifique el consumo"
                  disabled={!consumeDrogas} // deshabilitado si checkbox no está activado
                />
              </Field>
            </div>
          </FieldSet>

          {/* <FieldSeparator />

          <Field orientation="horizontal" className="mt-4">
            <Button type="submit">Guardar</Button>
            <Button variant="outline" type="button" className="ml-2">
              Cancelar
            </Button>
          </Field> */}
        </FieldGroup>
      </form>
    </div>
  );
}
