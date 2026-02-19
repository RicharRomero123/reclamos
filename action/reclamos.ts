"use server"

import { reclamosFake, Reclamo, TicketDetalle } from "@/lib/mockData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Registra una nueva atención o reclamo con múltiples tickets independientes.
 */
export async function registrarReclamo(formData: FormData) {
  const nroReclamo = formData.get("nroReclamo") as string;
  const idUnico = formData.get("idUnico") as string;
  const estadoTicket = formData.get("estadoTicket") as string;

  const ticketsProcesados: TicketDetalle[] = [];
  let i = 0;

  // Captura dinámica de tickets del formulario
  while (formData.has(`nroTicket_${i}`)) {
    const nro = formData.get(`nroTicket_${i}`) as string;
    const monto = formData.get(`importeTicket_${i}`) as string;
    const codDev = formData.get(`codDevolucion_${i}`) as string;

    if (nro && monto && codDev) {
      ticketsProcesados.push({
        nroTicket: nro,
        importe: parseFloat(monto),
        codDevolucion: codDev,
      });
    }
    i++;
  }

  const nuevoRegistro: Reclamo = {
    id: `rec_${Math.random().toString(36).substr(2, 9)}`,
    nroReclamo: nroReclamo || undefined, 
    tipoDocumento: formData.get("tipoDocumento") as string,
    documentoCliente: formData.get("documentoCliente") as string,
    idUnico: idUnico,
    estadoTicket: estadoTicket,
    tickets: ticketsProcesados,
    completado: true,
    createdAt: new Date(),
  };

  reclamosFake.unshift(nuevoRegistro);

  revalidatePath("/dashboard/consultar");
  redirect("/dashboard/consultar");
}

/**
 * Acción para completar registros (Bandeja de Gestión)
 */
export async function completarReclamo(formData: FormData) {
  const id = formData.get("id") as string;
  const index = reclamosFake.findIndex((r) => r.id === id);

  if (index !== -1) {
    reclamosFake[index] = {
      ...reclamosFake[index],
      estadoTicket: formData.get("estadoTicket") as string,
      idUnico: formData.get("idUnico") as string,
      completado: true,
    };
  }

  revalidatePath("/dashboard/gestion");
  revalidatePath("/dashboard/consultar");
}