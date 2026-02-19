"use client";

import { login } from "@/action/auth";
// 1. Asegúrate de que la ruta sea correcta (normalmente es /actions/ con 's')
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    
    // NOTA: En Next.js, 'redirect' lanza un error interno para funcionar.
    // Solo mostramos el mensaje de error si el error NO es un redireccionamiento.
    try {
      await login(formData);
    } catch (e: any) {
      // Si el error contiene la palabra "NEXT_REDIRECT", ignoramos el catch
      if (e.message && e.message.includes("NEXT_REDIRECT")) {
        return;
      }
      setError("Usuario o contraseña incorrectos. Verifique sus credenciales.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-900">
        
        {/* Encabezado del Banco */}
        <div className="text-center mb-8">
          <div className="bg-blue-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold tracking-tighter">BN</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Gestión de Reclamos
          </h1>
          <p className="text-slate-500 text-sm mt-1">Red Interna de Operaciones</p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-pulse">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">
              ID de Usuario
            </label>
            <input 
              name="usuario" 
              type="text" 
              placeholder="Ej: richar"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">
              Contraseña
            </label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.97] mt-2 text-lg uppercase"
          >
            Acceder al Sistema
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Acceso restringido a personal autorizado
          </p>
        </div>
      </div>
    </main>
  );
}