import axios from "axios";
import getQueryToken from "@/services/queryToken";
import getDireccionamientoFecha from "@/services/direccionamanientoFecha";

export const useApiCall = () => {
    // Llamado a la api para buscar direccionamiento por rango de fecha y paciente
    const fetchDireccionamientoFecha = async (startDate, endDate, documentType, documentNumber) => {
        try {
            const token = await getQueryToken()
            const res = await getDireccionamientoFecha(startDate, endDate, token, documentType, documentNumber)
            return res
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fetchDireccionamientoXPrescripcion = async (prescriptionNumber) => {
        try {
            const token = await getQueryToken()
            const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            const res = await axios(ulrQuery)
            return res.data
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    // Llamado a la api para hacer la programación de uno o más direccionamientos
    const fetchProgramarDireccionamientos = async (direccionamientos) => {
        try {
            const token = await getQueryToken()
            const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/Programacion/${process.env.NEXT_PUBLIC_NIT}/${token}`
            console.log(ulrQuery)
            for (const direccionamiento of direccionamientos) {
                const res = await axios.put(ulrQuery, direccionamiento)

                if (res.status === 200) {
                    console.log("Programación exitosa para el direccionamiento:", direccionamiento.ID);
                } else if (res.status === 404) {
                    console.log("Error 404: No se encontró el recurso para el direccionamiento:", direccionamiento.ID);
                } else if (res.status === 500) {
                    console.log("Error 500: Error interno del servidor para el direccionamiento:", direccionamiento.ID);
                } else {
                    console.log("Error desconocido para el direccionamiento:", direccionamiento.ID);
                }
            }
            return "Programación de direccionamientos exitosa"
        } catch (error) {
            console.log("Error al intentar programar uno o más direccionamientos, desde useCallApi.js")
            console.log(error)
            return "Error al intentar programar los direccionamientos"
        }
    }

    return { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion, fetchProgramarDireccionamientos }
}