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
import { Paciente } from "@/components/pacientes/paciente-detalle"; // importa tu tipo

interface Props {
  paciente: Paciente;
}

export default function FiliacionForm({ paciente }: Props) {
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
                <Input
                  id="nombres"
                  placeholder="Ingrese nombres"
                  defaultValue={paciente.nombres}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="apellidos">Apellidos</FieldLabel>
                <Input
                  id="apellidos"
                  placeholder="Ingrese apellidos"
                  defaultValue={paciente.apellidos}
                  required
                />
              </Field>

              {/* Nuevo campo DNI */}
              <Field>
                <FieldLabel htmlFor="dni">DNI</FieldLabel>
                <Input
                  id="dni"
                  placeholder="Ingrese DNI"
                  defaultValue={paciente.dni ?? ""}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="fechaNacimiento">
                  Fecha de Nacimiento
                </FieldLabel>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  defaultValue={paciente.fecha_nacimiento}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                <Input
                  id="telefono"
                  placeholder="Ingrese teléfono"
                  defaultValue={paciente.telefono ?? ""}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingrese email"
                  defaultValue={paciente.email ?? ""}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="direccion">Dirección</FieldLabel>
                <Input
                  id="direccion"
                  placeholder="Ingrese dirección"
                  defaultValue={paciente.direccion ?? ""}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="estadoCivil">Estado Civil</FieldLabel>
                <Select defaultValue={paciente.estado_civil ?? ""}>
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

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="alertaMedica">Alerta Médica</FieldLabel>
                <Textarea
                  id="alertaMedica"
                  placeholder="Ingrese alerta médica"
                  className="resize-none"
                  defaultValue={paciente.alerta_medica ?? ""}
                />
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
