import axios from "axios";
import getQueryToken from "@/services/queryToken";
import getDateRangeData from "@/services/fecthdate/getDateRangeData";
import { useModule } from "@/context/moduleContext";
import { getEndPoint } from "@/utils/index.js"

export const apiCall = () => {
    const { currentModule } = useModule()

    // Llamado a la api para buscar direccionamiento por rango de fecha y paciente
    const fetchByDate = async (startDate, endDate, documentType, documentNumber) => {
        try {
            const token = await getQueryToken()
            const res = await getDateRangeData(startDate, endDate, token, documentType, documentNumber, currentModule)
            return res
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fecthByPrescriptionNumber = async (prescriptionNumber) => {
        try {
            const token = await getQueryToken()
            let url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndPoint(currentModule, "porPrescripcion")}/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            const res = await axios(url)
            return res.data
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    // Agregar data adicional luego de hacer una entrega
    const fecthAdditionalData = async (noPrescription, Id) => {
        try {
            const token = await getQueryToken()

            // Consulta al módulo de direccionamientos
            const urlDireccionamiento = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${noPrescription}`
            const resDireccionamiento = await axios(urlDireccionamiento)
            const direccionamientoData = resDireccionamiento.data.find(d => d.ID === Id)

            // Consulta al módulo de entrega
            const urlEntrega = `${process.env.NEXT_PUBLIC_API_URL}/EntregaXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${noPrescription}`
            const resEntrega = await axios(urlEntrega)
            const entregaData = resEntrega.data.find(e => e.ID === Id)

            return {
                NoSubEntrega: direccionamientoData?.NoSubEntrega,
                NoIDEPS: direccionamientoData?.NoIDEPS,
                CodEPS: direccionamientoData?.CodEPS,
                IdEntrega: entregaData?.IDEntrega,
                CantidadEntregada: entregaData?.CantTotEntregada,
                FecEntrega: entregaData?.FecEntrega,
                EstEntrega: entregaData?.EstEntrega
            }
        } catch (error) {
            console.error("Error al obtener datos adicionales:", error)
            throw error
        }
    }
    return { fetchByDate, fecthByPrescriptionNumber, fecthAdditionalData }
}