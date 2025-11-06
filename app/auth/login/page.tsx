import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="grid min-h-svh w-full grid-cols-1 md:grid-cols-2">
      {/* Columna izquierda: Login */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      {/* Columna derecha: contenedor libre */}
      <div className="hidden md:flex items-center justify-center bg-muted">
        {/* Aquí puedes poner una imagen, texto, animación, etc. */}
        <div className="text-center p-10">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido al sistema</h2>
          <p className="text-muted-foreground">
            Aquí puedes colocar una imagen, una descripción o tu branding.
          </p>
        </div>
      </div>
    </div>
  );
}
