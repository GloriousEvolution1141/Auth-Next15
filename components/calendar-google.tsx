import * as React from "react";

interface CalendarioGoogleProps {
  // Aquí puedes recibir props si quieres (opcional)
  embedUrl?: string;
}

export default function CalendarioGoogle({
  embedUrl = "https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima",
}: CalendarioGoogleProps) {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        frameBorder="0"
        scrolling="no"
        title="Calendario Google"
      ></iframe>
    </div>
  );
}
