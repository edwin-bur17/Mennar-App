import { API_ENDPOINTS } from "./apiEndPoints";

// Buscar el edpoint de acuerdo al módulo (en el que navega actualmente el usuario)
export function getEndPoint(apiModule, type) {
    return API_ENDPOINTS[apiModule]?.[type] || API_ENDPOINTS.direccionamientos[type];
} 