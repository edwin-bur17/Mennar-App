import axios from "axios";
import getQueryToken from "@/services/queryToken";
import getDireccionamientoFecha from "@/services/direccionamanientoFecha";
import { usePathname } from "next/navigation";

export const useApiCall = () => {
    const pathname = usePathname()
    const currentUrl = pathname.slice(1)
    console.log(currentUrl)
    // Llamado a la api para buscar direccionamiento por rango de fecha y paciente
    const fetchDireccionamientoFecha = async (startDate, endDate, documentType, documentNumber) => {
        console.log("url actual desde useApiCall.jsx: " ,currentUrl)
        try {
            const token = await getQueryToken()
            const res = await getDireccionamientoFecha(startDate, endDate, token, documentType, documentNumber, currentUrl)
            return res
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fetchDireccionamientoXPrescripcion = async (prescriptionNumber) => {
        console.log(prescriptionNumber)
        let url
        try {
            const token = await getQueryToken()
            if (currentUrl === "direccionamientos") {
                url = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            } else {
                url = `${process.env.NEXT_PUBLIC_API_URL}/ProgramacionXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            }
            console.log("url de la consulta par anúmero de prescripción: ", url)
            const res = await axios(url)
            return res.data
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    return { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion }
}