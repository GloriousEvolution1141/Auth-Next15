import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalendarioGoogle from "@/components/calendar-google";

export default function Home() {
  const cardsData = [
    {
      title: "Login to your account",
      description: "Enter your email below to login to your account",
      action: "Login",
    },
    {
      title: "Sign up for free",
      description: "Create a new account and get started",
      action: "Sign Up",
    },
    {
      title: "Subscribe to newsletter",
      description: "Get updates and news directly to your inbox",
      action: "Subscribe",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Grid de Cards */}
      {/* border border-gary-400 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {cardsData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter>
              {card.action && (
                <CardAction>
                  <Button>{card.action}</Button>
                </CardAction>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Sección del calendario y espacio para otra cosa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendario ocupa la mitad */}
        <Card className="p-2">
          <h2 className="text-xl font-bold mb-2">Calendario</h2>
          <CalendarioGoogle embedUrl="https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima" />
        </Card>

        {/* Espacio para otro contenido */}
        <Card className="p-2 flex items-center justify-center">
          <p>Otro componente o contenido aquí</p>
        </Card>
      </div>
    </div>
  );
}
