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

    return { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion }
}