// components/calendar-google.tsx
import * as React from "react";

interface CalendarioGoogleProps {
  embedUrl?: string;
}

export default function CalendarioGoogle({
  embedUrl = "https://calendar.google.com/calendar/embed?src=tu_calendario_id&ctz=America%2FLima",
}: CalendarioGoogleProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        frameBorder="0"
        scrolling="no"
        title="Calendario Google"
      ></iframe>
    </div>
  );
}
