"use client";

import { reclamosFake, Reclamo } from "@/lib/mockData";
import { useState } from "react";

export default function ConsultarPage() {
  const [filtro, setFiltro] = useState("");
  // Estado para controlar qué reclamo se muestra en el Popup (Modal)
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState<Reclamo | null>(null);

  // Filtrado dinámico
  const datosFiltrados = reclamosFake.filter(r => 
    r.documentoCliente.includes(filtro) || 
    (r.nroReclamo && r.nroReclamo.includes(filtro)) ||
    r.tickets.some(t => t.nroTicket.includes(filtro))
  );

  const getEstadoColor = (estado: string) => {
    const e = estado.toUpperCase();
    if (e.includes("RECHAZADO")) return "bg-red-50 text-red-600 border-red-100";
    if (e.includes("ANULADO")) return "bg-slate-100 text-slate-500 border-slate-200";
    if (e.includes("PAGADO")) return "bg-green-50 text-green-600 border-green-100";
    return "bg-blue-50 text-blue-600 border-blue-100";
  };

  // Función para evitar el "Hydration Error" de Next.js con las fechas
  const formatearFecha = (fecha: Date) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();
    const hora = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} - ${hora}:${min}`;
  };

  return (
    <div className="space-y-6 relative">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Operaciones</p>
          <p className="text-2xl font-black text-slate-800">{reclamosFake.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Atenciones Directas</p>
          <p className="text-2xl font-black text-blue-600">
            {reclamosFake.filter(r => !r.nroReclamo).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-green-500">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Monto Total</p>
          <p className="text-2xl font-black text-green-600">
            S/ {reclamosFake.reduce((acc, r) => 
              acc + r.tickets.reduce((sum, t) => sum + t.importe, 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-black text-slate-800 tracking-tighter uppercase">Historial de Resultados</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar DNI, Reclamo o Ticket..." 
            className="pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full md:w-80 transition-all"
            onChange={(e) => setFiltro(e.target.value)}
          />
          <span className="absolute right-3 top-2 text-slate-400">🔍</span>
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="px-4 py-4">ID Único</th>
                <th className="px-4 py-4">Nro Reclamo</th>
                <th className="px-4 py-4">Cliente / Fecha</th>
                <th className="px-4 py-4 text-center">Cant. Tickets</th>
                <th className="px-4 py-4 text-right">Monto Total</th>
                <th className="px-4 py-4 text-center">Estado Sistema</th>
                <th className="px-4 py-4 text-center">Detalles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {datosFiltrados.map((r) => {
                const montoTotal = r.tickets.reduce((acc, t) => acc + t.importe, 0);
                
                return (
                  <tr key={r.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 font-mono text-slate-500">{r.idUnico || "---"}</td>
                    <td className="px-4 py-4 font-bold">
                      {r.nroReclamo ? (
                        <span className="text-slate-800">#{r.nroReclamo}</span>
                      ) : (
                        <span className="text-blue-500 italic font-medium">⚡ Atención Directa</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-700">{r.tipoDocumento} {r.documentoCliente}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-tighter">
                        {formatearFecha(r.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold">{r.tickets.length}</span>
                    </td>
                    <td className="px-4 py-4 text-right font-black text-blue-900 italic">
                      S/ {montoTotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {r.completado ? (
                        <span className={`px-2 py-1 rounded-md border text-[9px] font-black uppercase inline-block w-full max-w-[150px] truncate ${getEstadoColor(r.estadoTicket)}`}>
                          {r.estadoTicket}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md border text-[9px] font-black uppercase bg-orange-50 text-orange-600 border-orange-100">
                          PENDIENTE
                        </span>
                      )}
                    </td>
                    {/* Botón del Ojo */}
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => setReclamoSeleccionado(r)}
                        className="p-2 bg-slate-50 hover:bg-blue-100 text-slate-400 hover:text-blue-600 rounded-lg transition-colors inline-flex items-center justify-center border border-slate-200 hover:border-blue-200"
                        title="Ver detalle de tickets"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP (MODAL) DE DETALLES */}
      {reclamoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
            {/* Cabecera del Modal */}
            <div className="bg-blue-900 p-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Desglose de Operación</h3>
                <p className="text-[10px] text-blue-200 font-mono">ID: {reclamoSeleccionado.idUnico || 'Pendiente de asignación'}</p>
              </div>
              <button 
                onClick={() => setReclamoSeleccionado(null)}
                className="text-white hover:text-red-400 bg-white/10 hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="mb-4 flex justify-between items-end border-b border-slate-100 pb-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cliente</p>
                  <p className="font-bold text-slate-800 text-sm">{reclamoSeleccionado.tipoDocumento} {reclamoSeleccionado.documentoCliente}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Estado</p>
                  <p className={`text-xs font-black uppercase ${reclamoSeleccionado.completado ? 'text-blue-600' : 'text-orange-500'}`}>
                    {reclamoSeleccionado.estadoTicket || 'Pendiente'}
                  </p>
                </div>
              </div>

              {/* Tabla interna de Tickets */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-4 py-2 font-bold uppercase">Nro Ticket</th>
                      <th className="px-4 py-2 font-bold uppercase text-right">Importe</th>
                      <th className="px-4 py-2 font-bold uppercase">Cód. Devolución</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reclamoSeleccionado.tickets.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-slate-700 font-medium">{t.nroTicket}</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-800">S/ {t.importe.toFixed(2)}</td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700">
                          {t.codDevolucion || <span className="text-orange-400 text-[10px]">PENDIENTE</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-black text-slate-800">
                    <tr>
                      <td className="px-4 py-3 uppercase text-[10px]">Total Operación</td>
                      <td className="px-4 py-3 text-right text-blue-900">
                        S/ {reclamoSeleccionado.tickets.reduce((acc, t) => acc + t.importe, 0).toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
              <button 
                onClick={() => setReclamoSeleccionado(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors uppercase tracking-wider"
              >
                Cerrar Detalles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}