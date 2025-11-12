"use client";
import { useState, useEffect } from "react";
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
interface PatologiaFormProps {
  paciente?: {
    antecedentes_patologicos?: any; // JSONB de la tabla pacientes
  };
}

export default function PatologiaForm({ paciente }: PatologiaFormProps) {
  const antecedentes_patologicos = paciente?.antecedentes_patologicos;

  const [noRefiere, setNoRefiere] = useState<Record<string, boolean>>({});

  // --- Todos los estados específicos como ya definiste ---
  const [hipertension, setHipertension] = useState(false);
  const [hipertensionTratamiento, setHipertensionTratamiento] = useState("");
  const [tomaAnticoagulantes, setTomaAnticoagulantes] = useState(false);
  const [anticoWarfarina, setAnticoWarfarina] = useState(false);
  const [anticoAAS, setAnticoAAS] = useState(false);
  const [anticoOtro, setAnticoOtro] = useState(false);
  const [anticoOtroText, setAnticoOtroText] = useState("");
  const [diabetesTipo, setDiabetesTipo] = useState("");
  const [hba1c, setHba1c] = useState("");
  const [tiroides, setTiroides] = useState<{ hipo: boolean; hiper: boolean }>({
    hipo: false,
    hiper: false,
  });
  const [osteoporosis, setOsteoporosis] = useState(false);
  const [tratamientoOsteoporosis, setTratamientoOsteoporosis] = useState("");
  const [medPsiquiatricos, setMedPsiquiatricos] = useState(false);
  const [medPsiquiatricosText, setMedPsiquiatricosText] = useState("");
  const [hepatitis, setHepatitis] = useState(false);
  const [hepatitisTipo, setHepatitisTipo] = useState("");
  const [insuficienciaRenal, setInsuficienciaRenal] = useState(false);
  const [insuficienciaRenalEtapa, setInsuficienciaRenalEtapa] = useState("");
  const [anestLocal, setAnestLocal] = useState(false);
  const [anestLocalText, setAnestLocalText] = useState("");
  const [alimentos, setAlimentos] = useState(false);
  const [alimentosText, setAlimentosText] = useState("");
  const [cancer, setCancer] = useState(false);
  const [cancerTipo, setCancerTipo] = useState("");
  const [embarazoActual, setEmbarazoActual] = useState(false);
  const [embarazoSemanas, setEmbarazoSemanas] = useState("");
  const [protesisArticulares, setProtesisArticulares] = useState(false);
  const [protesisFecha, setProtesisFecha] = useState("");

  // --- Inicializar desde JSONB ---
  useEffect(() => {
    if (!antecedentes_patologicos) return;

    setNoRefiere(antecedentes_patologicos.noRefiere || {});

    setHipertension(
      antecedentes_patologicos.cardiovascular?.hipertension || false
    );
    setHipertensionTratamiento(
      antecedentes_patologicos.cardiovascular?.hipertensionTratamiento || ""
    );
    setTomaAnticoagulantes(
      antecedentes_patologicos.cardiovascular?.tomaAnticoagulantes || false
    );
    setAnticoWarfarina(
      antecedentes_patologicos.cardiovascular?.anticoagulantes?.warfarina ||
        false
    );
    setAnticoAAS(
      antecedentes_patologicos.cardiovascular?.anticoagulantes?.AAS || false
    );
    setAnticoOtro(
      antecedentes_patologicos.cardiovascular?.anticoagulantes?.otro?.check ||
        false
    );
    setAnticoOtroText(
      antecedentes_patologicos.cardiovascular?.anticoagulantes?.otro?.text || ""
    );

    setDiabetesTipo(antecedentes_patologicos.endocrino?.diabetesTipo || "");
    setHba1c(antecedentes_patologicos.endocrino?.hba1c || "");
    setTiroides({
      hipo: antecedentes_patologicos.endocrino?.tiroides?.hipo || false,
      hiper: antecedentes_patologicos.endocrino?.tiroides?.hiper || false,
    });
    setOsteoporosis(antecedentes_patologicos.endocrino?.osteoporosis || false);
    setTratamientoOsteoporosis(
      antecedentes_patologicos.endocrino?.tratamientoOsteoporosis || ""
    );

    setMedPsiquiatricos(
      antecedentes_patologicos.neurologico?.medPsiquiatricos || false
    );
    setMedPsiquiatricosText(
      antecedentes_patologicos.neurologico?.medPsiquiatricosText || ""
    );

    setHepatitis(antecedentes_patologicos.digestivo?.hepatitis || false);
    setHepatitisTipo(antecedentes_patologicos.digestivo?.hepatitisTipo || "");

    setInsuficienciaRenal(
      antecedentes_patologicos.renal?.insuficienciaRenal || false
    );
    setInsuficienciaRenalEtapa(
      antecedentes_patologicos.renal?.insuficienciaRenalEtapa || ""
    );

    setAnestLocal(antecedentes_patologicos.alergias?.anestLocal || false);
    setAnestLocalText(antecedentes_patologicos.alergias?.anestLocalText || "");
    setAlimentos(antecedentes_patologicos.alergias?.alimentos || false);
    setAlimentosText(antecedentes_patologicos.alergias?.alimentosText || "");

    setCancer(antecedentes_patologicos.otros?.cancer || false);
    setCancerTipo(antecedentes_patologicos.otros?.cancerTipo || "");
    setEmbarazoActual(antecedentes_patologicos.otros?.embarazoActual || false);
    setEmbarazoSemanas(antecedentes_patologicos.otros?.embarazoSemanas || "");
    setProtesisArticulares(
      antecedentes_patologicos.otros?.protesisArticulares || false
    );
    setProtesisFecha(antecedentes_patologicos.otros?.protesisFecha || "");
  }, [antecedentes_patologicos]);

  const cards: CardData[] = [
    {
      title: "a. Cardiovascular",
      options: [
        "Arritmias",
        "Cardiopatía Isquémica",
        "Marcapasos",
        "Hipertensión",
        "Toma Anticoagulantes",
      ],
    },
    {
      title: "b. Respiratorio",
      options: ["Asma", "EPOC", "Apnea del sueño", "Tuberculosis"],
    },
    {
      title: "c. Endocrino/Metabólico",
      options: [
        "Diabetes tipo",
        "Tiroides: Hipo",
        "Tiroides: Hiper",
        "Osteoporosis",
      ],
    },
    {
      title: "d. Neurológico/Psiquiátrico",
      options: [
        "Epilepsia",
        "Alzheimer",
        "Ansiedad/Depresión",
        "Medicamentos Psiquiátricos",
      ],
    },
    {
      title: "e. Hematológico/Inmunológico",
      options: ["Anemia", "Hemofilia", "VIH/SIDA", "Enf. Autoinmunes"],
    },
    {
      title: "f. Digestivo/Hepático",
      options: ["Reflujo", "Úlcera Gástrica", "Hepatitis"],
    },
    { title: "g. Renal", options: ["Insuficiencia Renal", "Diálisis"] },
    {
      title: "h. Alergias",
      options: [
        "Penicilina",
        "Sulfas",
        "Látex",
        "Anestésicos locales",
        "Alimentos",
      ],
    },
    {
      title: "i. Otros Relevantes",
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
                  {card.title === "a. Cardiovascular" ? (
                    <>
                      {/* Render other options as simple checkboxes first */}
                      {card.options.map((opt) => {
                        if (opt === "Hipertensión") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="hipertension"
                                  checked={hipertension}
                                  onCheckedChange={(checked) =>
                                    setHipertension(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="hipertension" className="ml-2">
                                  Hipertensión
                                </label>
                              </div>

                              {hipertension && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Tratamiento..."
                                    value={hipertensionTratamiento}
                                    onChange={(e) =>
                                      setHipertensionTratamiento(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        if (opt === "Toma Anticoagulantes") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="toma-anticoagulantes"
                                  checked={tomaAnticoagulantes}
                                  onCheckedChange={(checked) =>
                                    setTomaAnticoagulantes(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label
                                  htmlFor="toma-anticoagulantes"
                                  className="ml-2"
                                >
                                  Toma Anticoagulantes
                                </label>
                              </div>

                              {tomaAnticoagulantes && (
                                <div className="ml-6 grid grid-cols-1 gap-2">
                                  <div className="flex items-center">
                                    <Checkbox
                                      id="antico-warfarina"
                                      checked={anticoWarfarina}
                                      onCheckedChange={(checked) =>
                                        setAnticoWarfarina(checked === true)
                                      }
                                      disabled={noRefiere[card.title]}
                                    />
                                    <label
                                      htmlFor="antico-warfarina"
                                      className="ml-2"
                                    >
                                      Warfarina
                                    </label>
                                  </div>

                                  <div className="flex items-center space-">
                                    <Checkbox
                                      id="antico-aas"
                                      checked={anticoAAS}
                                      onCheckedChange={(checked) =>
                                        setAnticoAAS(checked === true)
                                      }
                                      disabled={noRefiere[card.title]}
                                    />
                                    <label
                                      htmlFor="antico-aas"
                                      className="ml-2"
                                    >
                                      AAS
                                    </label>
                                  </div>

                                  <div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center">
                                        <Checkbox
                                          id="antico-otro"
                                          checked={anticoOtro}
                                          onCheckedChange={(checked) =>
                                            setAnticoOtro(checked === true)
                                          }
                                          disabled={noRefiere[card.title]}
                                        />
                                        <label
                                          htmlFor="antico-otro"
                                          className="ml-2"
                                        >
                                          Otro
                                        </label>
                                      </div>
                                      {anticoOtro && (
                                        <Input
                                          placeholder="Especifique..."
                                          value={anticoOtroText}
                                          onChange={(e) =>
                                            setAnticoOtroText(e.target.value)
                                          }
                                          disabled={noRefiere[card.title]}
                                          className="mt-1" // margen arriba para separar del label
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }

                        // Opciones simples (Arritmias, Cardiopatía Isquémica, Marcapasos)
                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : card.title === "b. Respiratorio" ? (
                    // Respiratorio (sin inputs condicionales en la imagen)
                    card.options.map((opt) => {
                      const id = `card-${card.title}-${opt}`;
                      return (
                        <div key={opt} className="flex items-center">
                          <Checkbox id={id} disabled={noRefiere[card.title]} />
                          <label htmlFor={id} className="ml-2">
                            {opt}
                          </label>
                        </div>
                      );
                    })
                  ) : card.title === "c. Endocrino/Metabólico" ? (
                    <>
                      {/* Diabetes tipo */}
                      <div className="flex items-center gap-4">
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

                      {/* Tiroides */}
                      <div className="mt-2">
                        <label className="block mb-1">Tiroides:</label>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <Checkbox
                              id="tiroides-hipo"
                              checked={tiroides.hipo}
                              onCheckedChange={(checked) =>
                                setTiroides((prev) => ({
                                  ...prev,
                                  hipo: checked === true,
                                }))
                              }
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor="tiroides-hipo" className="ml-2">
                              Hipo
                            </label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="tiroides-hiper"
                              checked={tiroides.hiper}
                              onCheckedChange={(checked) =>
                                setTiroides((prev) => ({
                                  ...prev,
                                  hiper: checked === true,
                                }))
                              }
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor="tiroides-hiper" className="ml-2">
                              Hiper
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Osteoporosis */}
                      <div className="mt-2 flex flex-col gap-2">
                        <div className="flex items-center">
                          <Checkbox
                            id="osteoporosis"
                            checked={osteoporosis}
                            onCheckedChange={(checked) =>
                              setOsteoporosis(checked === true)
                            }
                            disabled={noRefiere[card.title]}
                          />
                          <label htmlFor="osteoporosis" className="ml-2">
                            Osteoporosis
                          </label>
                        </div>

                        {osteoporosis && (
                          <div className="ml-6">
                            <label>Tratamiento:</label>
                            <Input
                              type="text"
                              placeholder="Ingrese tratamiento"
                              value={tratamientoOsteoporosis}
                              onChange={(e) =>
                                setTratamientoOsteoporosis(e.target.value)
                              }
                              disabled={noRefiere[card.title]}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  ) : card.title === "d. Neurológico/Psiquiátrico" ? (
                    <>
                      {card.options.map((opt) => {
                        if (opt === "Medicamentos Psiquiátricos") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="med-psiquiatricos"
                                  checked={medPsiquiatricos}
                                  onCheckedChange={(checked) =>
                                    setMedPsiquiatricos(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label
                                  htmlFor="med-psiquiatricos"
                                  className="ml-2"
                                >
                                  Medicamentos Psiquiátricos
                                </label>
                              </div>

                              {medPsiquiatricos && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="¿Cuáles?"
                                    value={medPsiquiatricosText}
                                    onChange={(e) =>
                                      setMedPsiquiatricosText(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : card.title === "e. Hematológico/Inmunológico" ? (
                    card.options.map((opt) => {
                      const id = `card-${card.title}-${opt}`;
                      return (
                        <div key={opt} className="flex items-center">
                          <Checkbox id={id} disabled={noRefiere[card.title]} />
                          <label htmlFor={id} className="ml-2">
                            {opt}
                          </label>
                        </div>
                      );
                    })
                  ) : card.title === "f. Digestivo/Hepático" ? (
                    <>
                      {card.options.map((opt) => {
                        if (opt === "Hepatitis") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="hepatitis"
                                  checked={hepatitis}
                                  onCheckedChange={(checked) =>
                                    setHepatitis(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="hepatitis" className="ml-2">
                                  Hepatitis
                                </label>
                              </div>

                              {hepatitis && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Tipo..."
                                    value={hepatitisTipo}
                                    onChange={(e) =>
                                      setHepatitisTipo(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : card.title === "g. Renal" ? (
                    <>
                      {card.options.map((opt) => {
                        if (opt === "Insuficiencia Renal") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="insuf-renal"
                                  checked={insuficienciaRenal}
                                  onCheckedChange={(checked) =>
                                    setInsuficienciaRenal(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="insuf-renal" className="ml-2">
                                  Insuficiencia Renal
                                </label>
                              </div>

                              {insuficienciaRenal && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Etapa..."
                                    value={insuficienciaRenalEtapa}
                                    onChange={(e) =>
                                      setInsuficienciaRenalEtapa(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : card.title === "h. Alergias" ? (
                    <>
                      {card.options.map((opt) => {
                        if (opt === "Anestésicos locales") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="anest-local"
                                  checked={anestLocal}
                                  onCheckedChange={(checked) =>
                                    setAnestLocal(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="anest-local" className="ml-2">
                                  Anestésicos locales
                                </label>
                              </div>

                              {anestLocal && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Especificar..."
                                    value={anestLocalText}
                                    onChange={(e) =>
                                      setAnestLocalText(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        if (opt === "Alimentos") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="alimentos"
                                  checked={alimentos}
                                  onCheckedChange={(checked) =>
                                    setAlimentos(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="alimentos" className="ml-2">
                                  Alimentos
                                </label>
                              </div>

                              {alimentos && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Especificar..."
                                    value={alimentosText}
                                    onChange={(e) =>
                                      setAlimentosText(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : card.title === "i. Otros Relevantes" ? (
                    <>
                      {card.options.map((opt) => {
                        if (opt === "Cáncer") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="cancer"
                                  checked={cancer}
                                  onCheckedChange={(checked) =>
                                    setCancer(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label htmlFor="cancer" className="ml-2">
                                  Cáncer
                                </label>
                              </div>

                              {cancer && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Tipo..."
                                    value={cancerTipo}
                                    onChange={(e) =>
                                      setCancerTipo(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        if (opt === "Embarazo actual") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="embarazo-actual"
                                  checked={embarazoActual}
                                  onCheckedChange={(checked) =>
                                    setEmbarazoActual(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label
                                  htmlFor="embarazo-actual"
                                  className="ml-2"
                                >
                                  Embarazo actual
                                </label>
                              </div>

                              {embarazoActual && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Semanas..."
                                    value={embarazoSemanas}
                                    onChange={(e) =>
                                      setEmbarazoSemanas(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        if (opt === "Prótesis articulares") {
                          return (
                            <div key={opt} className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="protesis-articulares"
                                  checked={protesisArticulares}
                                  onCheckedChange={(checked) =>
                                    setProtesisArticulares(checked === true)
                                  }
                                  disabled={noRefiere[card.title]}
                                />
                                <label
                                  htmlFor="protesis-articulares"
                                  className="ml-2"
                                >
                                  Prótesis articulares
                                </label>
                              </div>

                              {protesisArticulares && (
                                <div className="ml-6">
                                  <Input
                                    placeholder="Fecha de colocación..."
                                    value={protesisFecha}
                                    onChange={(e) =>
                                      setProtesisFecha(e.target.value)
                                    }
                                    disabled={noRefiere[card.title]}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }

                        const id = `card-${card.title}-${opt}`;
                        return (
                          <div key={opt} className="flex items-center">
                            <Checkbox
                              id={id}
                              disabled={noRefiere[card.title]}
                            />
                            <label htmlFor={id} className="ml-2">
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    // fallback por si falta alguna card
                    card.options.map((opt) => {
                      const id = `card-${card.title}-${opt}`;
                      return (
                        <div key={opt} className="flex items-center">
                          <Checkbox id={id} disabled={noRefiere[card.title]} />
                          <label htmlFor={id} className="ml-2">
                            {opt}
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </FieldSet>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
