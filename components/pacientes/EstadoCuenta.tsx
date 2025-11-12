"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react"; // icono de 3 puntitos

interface PlanProcedimiento {
  id: string;
  fecha_tratamiento: string;
  nombre: string;
  costo_total: number;
  adelanto: number;
  deuda: number;
  estado: string;
}

export default function EstadoCuenta({ pacienteId }: { pacienteId: string }) {
  const supabase = createClient();
  const [planes, setPlanes] = React.useState<PlanProcedimiento[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [pagoParcial, setPagoParcial] = React.useState({
    monto: "",
    planId: "",
  });

  React.useEffect(() => {
    const fetchPlanes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("planes_procedimiento")
          .select("*")
          .eq("paciente_id", pacienteId)
          .order("fecha_tratamiento", { ascending: false });

        if (error) {
          console.error("Error al obtener planes:", error);
          setPlanes([]);
        } else {
          setPlanes(data as PlanProcedimiento[]);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        setPlanes([]);
      }
      setLoading(false);
    };

    fetchPlanes();
  }, [pacienteId, supabase]);

  const totalAdelanto = planes.reduce((sum, p) => sum + (p.adelanto || 0), 0);
  const totalDeuda = planes.reduce((sum, p) => sum + (p.deuda || 0), 0);

  const marcarComoPagado = async (planId: string) => {
    const plan = planes.find((p) => p.id === planId);
    if (!plan) return;

    const { error } = await supabase
      .from("planes_procedimiento")
      .update({ adelanto: plan.costo_total, deuda: 0, estado: "Pagado" })
      .eq("id", planId);

    if (error) console.error("Error al marcar como pagado:", error);

    setPlanes((prev) =>
      prev.map((p) =>
        p.id === planId
          ? { ...p, adelanto: p.costo_total, deuda: 0, estado: "Pagado" }
          : p
      )
    );
  };

  const registrarPagoParcial = async () => {
    const monto = parseFloat(pagoParcial.monto);
    const plan = planes.find((p) => p.id === pagoParcial.planId);
    if (!plan || isNaN(monto) || monto <= 0) return;

    const nuevoAdelanto = plan.adelanto + monto;
    const nuevaDeuda = Math.max(plan.costo_total - nuevoAdelanto, 0);
    const nuevoEstado = nuevaDeuda === 0 ? "Pagado" : "Pendiente";

    const { error } = await supabase
      .from("planes_procedimiento")
      .update({
        adelanto: nuevoAdelanto,
        deuda: nuevaDeuda,
        estado: nuevoEstado,
      })
      .eq("id", plan.id);

    if (error) console.error("Error al registrar pago parcial:", error);

    setPlanes((prev) =>
      prev.map((p) =>
        p.id === plan.id
          ? {
              ...p,
              adelanto: nuevoAdelanto,
              deuda: nuevaDeuda,
              estado: nuevoEstado,
            }
          : p
      )
    );

    setOpen(false);
    setPagoParcial({ monto: "", planId: "" });
  };

  if (loading) return <p>Cargando estado de cuenta...</p>;

  return (
    <div className="space-y-6">
      {/* Totales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle>Total Adelanto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-700">
              S/ {totalAdelanto.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle>Total Deuda</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-700">
              S/ {totalDeuda.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card className="border border-blue-200">
        <CardHeader>
          <CardTitle>Estado de Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Procedimiento</TableHead>
                <TableHead>Costo Total (S/)</TableHead>
                <TableHead>Adelanto (S/)</TableHead>
                <TableHead>Deuda (S/)</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planes.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    {new Date(plan.fecha_tratamiento).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{plan.nombre}</TableCell>
                  <TableCell>{plan.costo_total.toFixed(2)}</TableCell>
                  <TableCell>{plan.adelanto.toFixed(2)}</TableCell>
                  <TableCell>{plan.deuda.toFixed(2)}</TableCell>
                  <TableCell>
                    {plan.estado === "Pagado" ? (
                      <span className="text-green-600 font-medium">Pagado</span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Pendiente
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {plan.estado !== "Pagado" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => marcarComoPagado(plan.id)}
                          >
                            Marcar como Pagado
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setPagoParcial({ monto: "", planId: plan.id })
                            }
                          >
                            Pago Parcial
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal pago parcial */}
      <Dialog
        open={!!pagoParcial.planId}
        onOpenChange={() => setPagoParcial({ monto: "", planId: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pago Parcial</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Monto"
              type="number"
              value={pagoParcial.monto}
              onChange={(e) =>
                setPagoParcial({ ...pagoParcial, monto: e.target.value })
              }
            />
            <Button className="w-full" onClick={registrarPagoParcial}>
              Registrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
