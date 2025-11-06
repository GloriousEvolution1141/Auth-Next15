"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FieldSet } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CardData {
  title: string;
  options: string[];
}

export default function PatologiaForm() {
  const [noRefiere, setNoRefiere] = useState<Record<string, boolean>>({});
  const [diabetesTipo, setDiabetesTipo] = useState("");
  const [hba1c, setHba1c] = useState("");

  const cards: CardData[] = [
    {
      title: "Cardiovascular",
      options: [
        "Arritmias",
        "Cardiopatía Isquémica",
        "Marcapasos",
        "Hipertensión",
        "Toma Anticoagulantes",
      ],
    },
    {
      title: "Respiratorio",
      options: ["Asma", "EPOC", "Apnea del sueño", "Tuberculosis"],
    },
    {
      title: "Endocrino/Metabólico",
      options: [
        "Diabetes tipo",
        "Tiroides: Hipo",
        "Tiroides: Hiper",
        "Osteoporosis",
      ],
    },
    {
      title: "Neurológico/Psiquiátrico",
      options: [
        "Epilepsia",
        "Alzheimer",
        "Ansiedad/Depresión",
        "Medicamentos Psiquiátricos",
      ],
    },
    {
      title: "Hematológico/Inmunológico",
      options: ["Anemia", "Hemofilia", "VIH/SIDA", "Enf. Autoinmunes"],
    },
    {
      title: "Digestivo/Hepático",
      options: ["Reflujo", "Úlcera Gástrica", "Hepatitis"],
    },
    { title: "Renal", options: ["Insuficiencia Renal", "Diálisis"] },
    {
      title: "Alergias",
      options: [
        "Penicilina",
        "Sulfas",
        "Látex",
        "Anestésicos locales",
        "Alimentos",
      ],
    },
    {
      title: "Otros Relevantes",
      options: ["Cáncer", "Embarazo actual", "Prótesis articulares"],
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.title}
            className={noRefiere[card.title] ? "opacity-50" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {card.title}
                <Checkbox
                  checked={noRefiere[card.title] || false}
                  onCheckedChange={(checked) =>
                    setNoRefiere((prev) => ({
                      ...prev,
                      [card.title]: checked === true,
                    }))
                  }
                >
                  No Refiere
                </Checkbox>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FieldSet
                className={noRefiere[card.title] ? "pointer-events-none" : ""}
              >
                <div className="grid grid-cols-1 gap-2">
                  {card.options.map((opt, index) => {
                    const checkboxId = `${card.title}-${index}`;

                    // Caso especial Endocrino/Metabólico - Diabetes tipo
                    if (
                      card.title === "Endocrino/Metabólico" &&
                      opt === "Diabetes tipo"
                    ) {
                      return (
                        <div
                          key={checkboxId}
                          className="flex items-center gap-4"
                        >
                          {/* Select Diabetes tipo */}
                          <div className="flex flex-col flex-1">
                            <label>Diabetes tipo:</label>
                            <Select
                              value={diabetesTipo}
                              onValueChange={setDiabetesTipo}
                              disabled={noRefiere[card.title]}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                                <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                                <SelectItem value="Gestacional">
                                  Gestacional
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Input HbA1c */}
                          <div className="flex flex-col w-32">
                            <label>HbA1c (%)</label>
                            <Input
                              type="text"
                              placeholder="%"
                              value={hba1c}
                              onChange={(e) => setHba1c(e.target.value)}
                              disabled={noRefiere[card.title]}
                            />
                          </div>
                        </div>
                      );
                    }

                    // Opciones normales
                    return (
                      <div key={checkboxId} className="flex items-center">
                        <Checkbox
                          id={checkboxId}
                          disabled={noRefiere[card.title]}
                        />
                        <label htmlFor={checkboxId} className="ml-2">
                          {opt}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </FieldSet>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
