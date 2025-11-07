"use client";

import { Toaster } from "sonner";
import { LoaderCircle } from "lucide-react";

export function ToasterClient() {
  return (
    <Toaster
      position="top-right"
      richColors
      icons={{
        loading: <LoaderCircle className="w-4 h-4 animate-spin" />,
      }}
    />
  );
}
