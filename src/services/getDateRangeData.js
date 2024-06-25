import axios from "axios"
import { getEndpoint } from "@/utils/getEndPoint"

export default async function getDateRangeData(startDateStr, endDateStr, queryToken, documentType = null, documentNumber = null, currentModule) {
    console.log("módulo actual: ", currentModule)
    let startDate = new Date(startDateStr)
    let endDate = new Date(endDateStr)
    const responses = [] // Array de las respuestas
    if (startDate > endDate) {
        return "La fecha de inicio debe ser menor a la fecha de fin"
    }
    let currentDate = startDate
    // ---------- Ciclo while para ejecutar cada petición por cada fecha del rango
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0]
        let url
        try {
            if (documentType && documentNumber) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndpoint(currentModule, "porPacienteFecha")}/${process.env.NEXT_PUBLIC_NIT}/${formattedDate}/${queryToken}/${documentType}/${documentNumber}`
            }else {
                url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndpoint(currentModule, "porFecha")}/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`
            }
            console.log("URL ACTUAL DE LA PETICIÓN DESDE GETDATERANGEDATA: ", url)
            const res = await axios.get(url) // Petición a la api
            if (res.status === 200 && res.data.length > 0) { // solo agrego las respuestas que hayan datos
                responses.push(...res.data) // copio la data al array
            }
        } catch (error) {
            console.log("Error al procesar la petición de direccionamiento por fecha, desde la función de direccionamiento por fecha")
        }
         currentDate.setDate(currentDate.getDate() + 1) // Aumentar el contador
    }
    return responses
}