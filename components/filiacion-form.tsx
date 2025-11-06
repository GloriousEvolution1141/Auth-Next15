import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLegend,
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
import { Textarea } from "@/components/ui/textarea";

export default function FiliacionForm() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Información Personal</FieldLegend>
            <FieldDescription>
              Complete los datos personales del paciente
            </FieldDescription>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="nombres">Nombres</FieldLabel>
                <Input id="nombres" placeholder="Ingrese nombres" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="apellidos">Apellidos</FieldLabel>
                <Input
                  id="apellidos"
                  placeholder="Ingrese apellidos"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="fechaNacimiento">
                  Fecha de Nacimiento
                </FieldLabel>
                <Input id="fechaNacimiento" type="date" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="ocupacion">Ocupación</FieldLabel>
                <Input id="ocupacion" placeholder="Ingrese ocupación" />
              </Field>

              <Field>
                <FieldLabel htmlFor="estadoCivil">Estado Civil</FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="estadoCivil">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                <Input id="telefono" placeholder="Ingrese teléfono" />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Ingrese email" />
              </Field>

              <Field>
                <FieldLabel htmlFor="direccion">Dirección</FieldLabel>
                <Input id="direccion" placeholder="Ingrese dirección" />
              </Field>

              <Field>
                <FieldLabel htmlFor="procedencia">
                  Lugar de Procedencia
                </FieldLabel>
                <Input
                  id="procedencia"
                  placeholder="Ingrese lugar de procedencia"
                />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="alertaMedica">Alerta Médica</FieldLabel>
                <Textarea
                  id="alertaMedica"
                  placeholder="Ingrese alerta médica"
                  className="resize-none"
                />
              </Field>
            </div>
          </FieldSet>
          {/* 
          <FieldSeparator />
          <Field orientation="horizontal" className="">
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
