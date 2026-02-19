"use client";

import { registrarReclamo } from "@/action/reclamos";
import { useState } from "react";

export default function RegistrarPage() {
  const [tickets, setTickets] = useState([{ id: Date.now(), nro: "", monto: "", codDev: "" }]);

  const agregarTicket = () => {
    setTickets([...tickets, { id: Date.now(), nro: "", monto: "", codDev: "" }]);
  };

  const eliminarTicket = (id: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Cabecera Limpia */}
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">REGISTRO DE ATENCIÓN RÁPIDA</h2>
          <p className="text-slate-500 text-xs mt-1 font-medium italic">Captura de datos generales y detalle de tickets independientes</p>
        </div>
        
        <form action={registrarReclamo} className="p-8 space-y-8">
          
          {/* SECCIÓN 1: DATOS GENERALES (NARANJA CLARO) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50/50 p-6 rounded-xl border border-orange-200">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Nro Reclamo (Opcional)</label>
              {/* CORRECCIÓN AQUÍ: placeholder-slate-500 */}
              <input 
                name="nroReclamo" 
                type="text" 
                placeholder="Ej: 2025001" 
                className="w-full p-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 outline-none text-sm text-slate-800 font-medium placeholder-slate-500 shadow-sm" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Tipo Documento</label>
              <select 
                name="tipoDocumento" 
                className="w-full p-3 bg-white border border-orange-200 rounded-lg text-sm outline-none text-slate-800 font-bold shadow-sm"
              >
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="CE">C.E.</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Documento Cliente</label>
              {/* CORRECCIÓN AQUÍ: placeholder-slate-500 */}
              <input 
                name="documentoCliente" 
                type="text" 
                placeholder="Ingrese número..."
                className="w-full p-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 outline-none text-sm text-slate-800 font-medium placeholder-slate-500 shadow-sm" 
                required 
              />
            </div>
          </div>

          {/* SECCIÓN 2: DETALLE DE TICKETS (DINÁMICO) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Tickets y Devoluciones</h3>
              <button 
                type="button" 
                onClick={agregarTicket}
                className="text-xs bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors shadow-sm"
              >
                + Añadir otro Ticket
              </button>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket, index) => (
                <div key={ticket.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-300 relative group shadow-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Nro Ticket</label>
                    {/* CORRECCIÓN AQUÍ: placeholder-slate-500 */}
                    <input 
                      name={`nroTicket_${index}`} 
                      type="text" 
                      placeholder="Ej: 26000123" 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 font-semibold placeholder-slate-500" 
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Monto Ticket (S/.)</label>
                    {/* CORRECCIÓN AQUÍ: placeholder-slate-500 */}
                    <input 
                      name={`importeTicket_${index}`} 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 font-semibold placeholder-slate-500" 
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Cód. Devolución</label>
                    {/* CORRECCIÓN AQUÍ: placeholder-slate-500 */}
                    <input 
                      name={`codDevolucion_${index}`} 
                      type="text" 
                      maxLength={8} 
                      placeholder="8 dígitos" 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 font-mono font-bold placeholder-slate-500" 
                    />
                  </div>

                  <div className="flex items-end pb-1">
                    {tickets.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => eliminarTicket(ticket.id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold px-4 py-2.5 transition-colors border border-red-100"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 mt-6">
            <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
              Finalizar Registro y Procesar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}