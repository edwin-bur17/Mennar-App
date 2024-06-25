import { API_ENDPOINTS } from "./apiEndPoints";

// Buscar el edpoint de acuerdo al módulo (en el que navega actualmente el usuario)
export function getEndpoint(currentModule, type) {
    return API_ENDPOINTS[currentModule]?.[type] || API_ENDPOINTS.direccionamientos[type];
} 