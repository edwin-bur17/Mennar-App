import axios from "axios";
import getQueryToken from "@/services/queryToken";
import getDateRangeData from "@/services/getDateRangeData";
import { useModule } from "@/context/moduleContext";
import { getEndpoint } from "@/utils/getEndPoint";

export const useApiCall = () => {
    const { currentModule } = useModule()

    // Llamado a la api para buscar direccionamiento por rango de fecha y paciente
    const fetchByDate = async (startDate, endDate, documentType, documentNumber) => {
        console.log("url actual desde useApiCall.jsx: ", currentModule)
        try {
            const token = await getQueryToken()
            const res = await getDateRangeData(startDate, endDate, token, documentType, documentNumber, currentModule)
            return res
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fecthByPrescriptionNumber = async (prescriptionNumber) => {
        console.log(prescriptionNumber)
        try {
            const token = await getQueryToken()
            let url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndpoint(currentModule, "porPrescripcion")}/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            console.log("url de la consulta par anúmero de prescripción: ", url)
            const res = await axios(url)
            return res.data
        } catch (error) {
            console.log("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    return { fetchByDate, fecthByPrescriptionNumber }
}