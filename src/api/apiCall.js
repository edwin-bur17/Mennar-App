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
            let res = await getDateRangeData(startDate, endDate, token, documentType, documentNumber, currentModule)
            return res
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fecthByPrescriptionNumber = async (prescriptionNumber, apiModule) => {
        try {
            const token = await getQueryToken()
            let endpoint = getEndPoint(apiModule, "porPrescripcion")
            let url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let res = await axios(url)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    // Agregar data adicional luego de hacer una entrega
    const fecthAdditionalData = async (prescriptionNumber, Id) => {
        try {
            const token = await getQueryToken()
            // Consulta al módulo de direccionamientos
            let urlDireccionamiento = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let resDireccionamiento = await axios(urlDireccionamiento)
            let direccionamientoData = resDireccionamiento.data.find(d => d.ID === Id)

            // Consulta al módulo de entrega
            let urlEntrega = `${process.env.NEXT_PUBLIC_API_URL}/EntregaXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let resEntrega = await axios(urlEntrega)
            let entregaData = resEntrega.data.find(e => e.ID === Id)

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

    // Agregar los datos de la facturación al direccionamiento
    const fetchInvoiceData = async (prescriptionNumber) => {
        try {
            const token = await getQueryToken()
            let url = `${process.env.NEXT_PUBLIC_API_FAC_URL}/FacturacionXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let res = await axios(url)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.error("Error al intentar obtener los datos de una facturación", error)
            throw Error
        }
    }
    return { fetchByDate, fecthByPrescriptionNumber, fecthAdditionalData, fetchInvoiceData }
}