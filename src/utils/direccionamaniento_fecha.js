import axios from "axios"

export default async function direccionamientoFecha(startDateStr, endDateStr, queryToken) {
    let startDate = new Date(startDateStr)
    let endDate = new Date(endDateStr)
    const responses = [] // Array de las respuestas
    if (startDate > endDate) {
        return "La fecha de inicio debe ser menor a la fecha de fin"
    }
    let currentDate = startDate
    // ---------- Ciclo while para ejecutar cada petción por cada fecha del rango
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0]
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXFecha/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`
            const res = await axios.get(url) // Petición a la api
            if (res.status === 200 && res.data.length > 0) { // solo agrego las respuestas que hayan datos
                responses.push(...res.data) // copio la data al array
            }
        } catch (error) {
            console.log("Error al procesar la petición de direccionamiento por fecha")
        }
         currentDate.setDate(currentDate.getDate() + 1) // Aumentar el contador
    }
    return responses
}