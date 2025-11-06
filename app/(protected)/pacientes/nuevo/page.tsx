import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, HeartPulse, Cigarette } from "lucide-react";

export default function FormularioOdontologicoMaquetado() {
  return (
    <div className="p-4">
      {/* Grid con 3 columnas en pantallas medianas, 1 columna en móviles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna 1: Filiación del Paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">1.</span>
              Filiación del Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>{/* Aquí irán los campos más adelante */}</CardContent>
        </Card>

        {/* Columna 2: Antecedentes Patológicos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">2.</span>
              Antecedentes Patológicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aquí irán los fieldsets más adelante */}
          </CardContent>
        </Card>

        {/* Columna 3: Hábitos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cigarette className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">3.</span>
              Hábitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aquí irán los campos de hábitos más adelante */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
