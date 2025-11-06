"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "@/components/login-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="relative grid min-h-svh w-full grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center p-6 md:p-10 bg-background z-10">
        <div className="w-full max-w-sm space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Sistema de Gestión Odontológica
              </CardTitle>
            </CardHeader>
          </Card>
          <LoginForm onLoginSuccess={() => setShowPanel(true)} />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center bg-muted">
        <div className="text-center p-10">
          <h2 className="text-2xl font-semibold mb-4">Foto del Sistema</h2>
          <p className="text-muted-foreground">webp</p>
        </div>
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-full 
                       bg-black/40 backdrop-blur-md 
                       flex flex-col items-center justify-center 
                       text-white z-20"
          >
            <div className="text-center p-10 max-w-md">
              <h2 className="text-3xl font-semibold mb-4">
                ¡Bienvenido de nuevo!
              </h2>
              <p className="text-lg opacity-90">
                Estamos preparando tu espacio personal...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
