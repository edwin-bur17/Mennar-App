export const API_ENDPOINTS = {
    direccionamientos: {
        porFecha: "DireccionamientoXFecha",
        porPacienteFecha: "DireccionamientoXPacienteFecha",
        porPrescripcion: "DireccionamientoXPrescripcion",
        anularProgramacion: "AnularProgramacion"
    },
    entrega: {
        porFecha: "ProgramacionXFecha",
        porPacienteFecha: "ProgramacionXPacienteFecha",
        porPrescripcion: "ProgramacionXPrescripcion",
        anularEntrega: "AnularEntrega"
    },
    reporteEntrega: {
        porPrescripcion: "ReporteEntregaXPrescripcion",
        anularReporte: "AnularReporteEntrega"
    },
    facturacion: {
        anularFacturacion: "FacturacionAnular"
    }
}