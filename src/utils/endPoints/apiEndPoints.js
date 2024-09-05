export const API_ENDPOINTS = {
    direccionamientos: {
        porFecha: "DireccionamientoXFecha",
        porPacienteFecha: "DireccionamientoXPacienteFecha",
        porPrescripcion: "DireccionamientoXPrescripcion",
        anularProgramacion: "AnularProgramacion"
    },
    entrega: { // Hace referencia al módulo programación de la api, pero en la app es entrega
        porFecha: "ProgramacionXFecha",
        porPacienteFecha: "ProgramacionXPacienteFecha",
        porPrescripcion: "ProgramacionXPrescripcion",
        anularEntrega: "AnularEntrega"
    },
    entregaTrue: { // el verdadero módulo de la api
        porPrescripcion: "EntregaXPrescripcion",
    },
    reporteEntrega: {
        porPrescripcion: "ReporteEntregaXPrescripcion",
        anularReporteEntrega: "AnularReporteEntrega"
    },
    facturacion: {
        anularFacturacion: "FacturacionAnular"
    }
}