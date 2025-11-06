import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalendarioGoogle from "@/components/calendar-google";
import Link from "next/link";

export default function Home() {
  const cardsData = [
    {
      title: "Métricas",
      description: "Resumen general y estadísticas del sistema.",
      href: "/metricas",
      cardColor:
        "bg-blue-100 dark:bg-transparent border border-blue-300 dark:border-blue-700",
      buttonColor:
        "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-600",
    },
    {
      title: "Pacientes",
      description: "Gestión y seguimiento de pacientes.",
      href: "/pacientes",
      cardColor:
        "bg-green-100 dark:bg-transparent border border-green-300 dark:border-green-700",
      buttonColor:
        "bg-green-500 hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-600",
    },
    {
      title: "Usuarios",
      description: "Administración de cuentas y permisos.",
      href: "/configuracion",
      cardColor:
        "bg-yellow-100 dark:bg-transparent border border-yellow-300 dark:border-yellow-700",
      buttonColor:
        "bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Card key={index} className={`w-full ${card.cardColor}`}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter>
              <Link href={card.href}>
                <Button className={card.buttonColor}>Ir a {card.title}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Sección del calendario y espacio para otra cosa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendario ocupa la mitad */}
        <Card className="p-2 bg-blue-50 dark:bg-transparent border border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle>Calendario Conectado a Google Calendar</CardTitle>
          </CardHeader>
          <CalendarioGoogle embedUrl="https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima" />
        </Card>

        {/* Espacio para otro contenido */}
        <Card className="p-2 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 dark:bg-transparent">
          <p>Otro componente o contenido aquí</p>
        </Card>
      </div>
    </div>
  );
}
