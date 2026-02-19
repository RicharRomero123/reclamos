export type Rol = "FUNCIONARIO" | "OPERATIVO";

export interface TicketDetalle {
  nroTicket: string;
  importe: number;
  codDevolucion: string; // Puede estar vacío inicialmente
}

export interface Usuario {
  id: string;
  usuario: string;
  password:  string;
  nombre: string;
  rol: Rol;
}

export interface Reclamo {
  id: string;
  nroReclamo?: string; 
  tipoDocumento: string;
  documentoCliente: string;
  idUnico: string; // Puede estar vacío inicialmente
  estadoTicket: string; // Puede estar vacío inicialmente
  tickets: TicketDetalle[];
  completado: boolean; // false = Pendiente en Bandeja de Gestión
  createdAt: Date;
}

// USUARIOS DE ACCESO
export const usuariosFake: Usuario[] = [
  { id: "1", usuario: "uhti", password: "novie17.", nombre: "Richard Romero", rol: "OPERATIVO" },
  { id: "2", usuario: "juan", password: "enero26.", nombre: "Juan Funcionario", rol: "FUNCIONARIO" }
];

export let reclamosFake: Reclamo[] = [
  // ==========================================
  // REGISTROS PENDIENTES (Aparecerán en Gestión)
  // ==========================================
  {
    id: "rec_pend_1",
    nroReclamo: "2025900",
    tipoDocumento: "DNI",
    documentoCliente: "11223344",
    idUnico: "", // A la espera de tu validación
    estadoTicket: "", // A la espera de tu validación
    completado: false, // ¡ESTO LO HACE PENDIENTE!
    createdAt: new Date("2026-02-19T14:00:00"),
    tickets: [
      { nroTicket: "26001100", importe: 150.00, codDevolucion: "" },
      { nroTicket: "26001101", importe: 50.00, codDevolucion: "" }
    ]
  },
  {
    id: "rec_pend_2",
    tipoDocumento: "RUC",
    documentoCliente: "20100200301", // Atención Directa
    idUnico: "",
    estadoTicket: "",
    completado: false,
    createdAt: new Date("2026-02-19T14:15:00"),
    tickets: [
      { nroTicket: "26001105", importe: 450.50, codDevolucion: "" }
    ]
  },
  {
    id: "rec_pend_3",
    nroReclamo: "2025902",
    tipoDocumento: "CE",
    documentoCliente: "001234567",
    idUnico: "",
    estadoTicket: "",
    completado: false,
    createdAt: new Date("2026-02-19T14:30:00"),
    tickets: [
      { nroTicket: "26001110", importe: 80.00, codDevolucion: "" }
    ]
  },

  // ==========================================
  // REGISTROS COMPLETADOS (Historial General)
  // ==========================================
  {
    id: "rec_1",
    nroReclamo: "2025789",
    tipoDocumento: "DNI",
    documentoCliente: "45678912",
    idUnico: "996253327988879",
    estadoTicket: "PAGADO, EN PROCESO PAGO ONLINE",
    completado: true,
    createdAt: new Date("2026-02-19T08:30:00"),
    tickets: [
      { nroTicket: "26000123", importe: 100.50, codDevolucion: "88221100" },
      { nroTicket: "26000124", importe: 50.00, codDevolucion: "88221101" }
    ]
  },
  {
    id: "rec_2",
    tipoDocumento: "DNI",
    documentoCliente: "70889910",
    idUnico: "996253327988880",
    estadoTicket: "PAGADO",
    completado: true,
    createdAt: new Date("2026-02-19T09:00:00"),
    tickets: [{ nroTicket: "26000456", importe: 3200.00, codDevolucion: "88221102" }]
  },
  {
    id: "rec_3",
    nroReclamo: "2025791",
    tipoDocumento: "RUC",
    documentoCliente: "20100200301",
    idUnico: "996253327988881",
    estadoTicket: "ANULADO",
    completado: true,
    createdAt: new Date("2026-02-19T10:15:00"),
    tickets: [{ nroTicket: "26000999", importe: 450.20, codDevolucion: "00000000" }]
  },
  {
    id: "rec_4",
    tipoDocumento: "DNI",
    documentoCliente: "10203040",
    idUnico: "996253327988882",
    estadoTicket: "RECHAZADO, PAGADO",
    completado: true,
    createdAt: new Date("2026-02-19T11:00:00"),
    tickets: [
      { nroTicket: "26000777", importe: 45.00, codDevolucion: "11223344" },
      { nroTicket: "26000778", importe: 40.00, codDevolucion: "11223345" }
    ]
  },
  {
    id: "rec_5",
    nroReclamo: "2025805",
    tipoDocumento: "CE",
    documentoCliente: "001234567",
    idUnico: "996253327988883",
    estadoTicket: "EN PROCESO PAGO ONLINE, PAGADO",
    completado: true,
    createdAt: new Date("2026-02-19T12:30:00"),
    tickets: [{ nroTicket: "26000111", importe: 1250.00, codDevolucion: "99001122" }]
  },
  {
    id: "rec_6",
    tipoDocumento: "DNI",
    documentoCliente: "44556677",
    idUnico: "996253327988884",
    estadoTicket: "PAGADO, RECHAZADO",
    completado: true,
    createdAt: new Date("2026-02-19T13:45:00"),
    tickets: [{ nroTicket: "26000222", importe: 210.00, codDevolucion: "55667788" }]
  }
];