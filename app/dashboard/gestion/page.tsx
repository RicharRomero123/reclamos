import { completarReclamo } from "@/action/reclamos";
import { reclamosFake } from "@/lib/mockData";

export default async function GestionPage() {
  // Filtramos los registros que aún no han sido completados
  const pendientes = reclamosFake.filter(r => !r.completado);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Bandeja de Gestión</h2>
          <p className="text-slate-400 text-xs font-medium italic">Edición rápida en formato tabla para validación de red interna</p>
        </div>
        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-xs font-black border border-orange-100 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          {pendientes.length} PENDIENTES
        </div>
      </div>
      
      {pendientes.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium italic">No hay registros pendientes por validar en este momento.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Contenedor con scroll para pantallas pequeñas */}
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">
              
              {/* CABECERA DE LA TABLA (Grid) */}
              <div className="grid grid-cols-12 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest p-4">
                <div className="col-span-1">Reclamo</div>
                <div className="col-span-2">Cliente / Doc</div>
                <div className="col-span-1 text-right pr-4">Total (S/.)</div>
                <div className="col-span-3">Estado General (Sistema)</div>
                <div className="col-span-2">ID Único</div>
                <div className="col-span-2">Cód. Maestro</div>
                <div className="col-span-1 text-center">Acción</div>
              </div>

              {/* CUERPO DE LA TABLA (Filas dinámicas) */}
              <div className="divide-y divide-slate-100">
                {pendientes.map((r) => {
                  const montoTotal = r.tickets.reduce((acc, t) => acc + t.importe, 0);

                  return (
                    <form 
                      key={r.id} 
                      action={completarReclamo} 
                      className="grid grid-cols-12 items-center p-2 hover:bg-yellow-50/50 transition-colors group"
                    >
                      <input type="hidden" name="id" value={r.id} />
                      
                      {/* DATOS DE LECTURA */}
                      <div className="col-span-1 px-2">
                        {r.nroReclamo ? (
                          <span className="font-bold text-slate-800 text-xs">#{r.nroReclamo}</span>
                        ) : (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold italic">⚡ ÁGIL</span>
                        )}
                      </div>
                      
                      <div className="col-span-2 px-2">
                        <p className="text-xs font-bold text-slate-700">{r.tipoDocumento} {r.documentoCliente}</p>
                        <p className="text-[9px] text-slate-400">{r.tickets.length} Ticket(s)</p>
                      </div>
                      
                      <div className="col-span-1 px-2 text-right pr-4">
                        <span className="font-black text-blue-700 text-xs italic">
                          {montoTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* CAMPOS DE EDICIÓN (Amarillos para resaltar acción) */}
                      <div className="col-span-3 px-2">
                        <select 
                          name="estadoTicket" 
                          className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-yellow-400 font-bold text-slate-700"
                        >
                          <option value="PAGADO">PAGADO</option>
                          <option value="PAGADO, EN PROCESO PAGO ONLINE">PAGADO, EN PROCESO PAGO ONLINE</option>
                          <option value="ANULADO">ANULADO</option>
                          <option value="RECHAZADO">RECHAZADO</option>
                          <option value="RECHAZADO, PAGADO">RECHAZADO, PAGADO</option>
                        </select>
                      </div>

                      <div className="col-span-2 px-2">
                        <input 
                          name="idUnico" 
                          type="text" 
                          inputMode="numeric" 
                          pattern="[0-9]*" 
                          maxLength={15} 
                          placeholder="9962..." 
                          className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-yellow-400 font-mono" 
                          required 
                        />
                      </div>

                      <div className="col-span-2 px-2">
                        <input 
                          name="codDevolucion" 
                          type="text" 
                          inputMode="numeric" 
                          pattern="[0-9]*" 
                          maxLength={8} 
                          placeholder="8 Dígitos" 
                          className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-yellow-400 font-mono" 
                          required 
                        />
                      </div>

                      {/* BOTÓN DE GUARDADO */}
                      <div className="col-span-1 px-2 flex justify-center">
                        <button 
                          type="submit" 
                          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black p-2 rounded-lg shadow-sm transition-all active:scale-[0.95] w-full text-[10px] uppercase flex items-center justify-center gap-1"
                          title="Guardar y Finalizar"
                        >
                          <span>💾</span> Validar
                        </button>
                      </div>
                    </form>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}