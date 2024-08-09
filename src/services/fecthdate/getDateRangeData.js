import { fetchData } from "./fetchData"
import { getDatesArray } from "./getDatesArray"

export default async function getDateRangeData(startDateStr, endDateStr, queryToken, documentType = null, documentNumber = null, apiModule) {
    // Convertir las fechas de string a un objeto Date
    let startDate = new Date(startDateStr)
    let endDate = new Date(endDateStr)

    if (startDate > endDate) { // Validar las fechas
        return "La fecha de inicio debe ser menor a la fecha de fin"
    }
    const dates = getDatesArray(startDate, endDate); // Obtener un array de las fechas según el rango
    const controller = new AbortController(); // Controlador de aborto para poder cancelar las peticiones si es necesario.
  
    // Manejo de errores y consulta a la api
    try {
        const responses = await Promise.all(dates.map(date => fetchData(date, queryToken, documentType, documentNumber, apiModule, controller.signal)));
        return responses.flat().filter(response => response !== null);
    } catch (error) {
        console.error("Error al obtener datos del rango de fechas (desde getDateRangeData.js):", error);
        throw error;
    } finally {
        controller.abort(); // Cancela cualquier petición pendiente
    }
}