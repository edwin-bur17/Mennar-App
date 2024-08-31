import { API_ENDPOINTS } from "./apiEndPoints";

// Buscar el edpoint de acuerdo al módulo (en el que navega actualmente el usuario)
export function getEndPoint(apiModule, type) {
    return API_ENDPOINTS[apiModule]?.[type] || API_ENDPOINTS.direccionamientos[type];
} 
// Buscar el endpoint para anular el direccionamiento de acuerdo a su estado actual
export function getOverrideEndPoint(tipo) {
    console.log(tipo)
    const endpointMap = {
      programacion: ["direccionamientos", "anularProgramacion"],
      entrega: ["entrega", "anularEntrega"],
      facturacion: ["facturacion", "anularFacturacion"],
      reporteEntrega: ["reporteEntrega", "anularReporteEntrega"]
    };
  
    const [module, type] = endpointMap[tipo] || [];
    return module && type ? getEndPoint(module, type) : null;
  }