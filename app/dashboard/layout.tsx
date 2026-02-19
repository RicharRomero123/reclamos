import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rol = cookieStore.get("user_role")?.value;
  const nombre = cookieStore.get("user_name")?.value;

  if (!rol) redirect("/");

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Lateral (Claro y Elegante) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center text-white font-bold shadow-blue-100 shadow-lg text-sm">BN</div>
          <span className="font-bold text-slate-800 tracking-tight text-sm uppercase">Sare Gestion</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
          {rol === "FUNCIONARIO" && (
            <Link href="/dashboard/registrar" className="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-medium">
              <span>📝</span> Registro Inicial
            </Link>
          )}

          {rol === "OPERATIVO" && (
            <Link href="/dashboard/gestion" className="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-medium">
              <span>⚙️</span> Bandeja Operativa
            </Link>
          )}

          <Link href="/dashboard/consultar" className="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-medium">
            <span>📊</span> Historial General
          </Link>
        </nav>

        {/* Botón de Salida */}
        <div className="p-4 border-t border-slate-100">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-50 transition-all text-xs font-bold uppercase tracking-widest">
            <span>🚪</span> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between">
          <div className="text-slate-400 text-xs font-medium italic">Red Interna - Acceso Protegido</div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700 leading-none">{nombre}</p>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter mt-1">{rol}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
              {nombre?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}