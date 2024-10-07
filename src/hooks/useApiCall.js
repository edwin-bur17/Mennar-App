import axios from "axios";
import Cookies from "js-cookie";
import getDateRangeData from "@/services/fecthdate/getDateRangeData";
import { useModule } from "@/context/moduleContext";
import { getEndPoint } from "@/utils/index.js"

export const useApiCall = () => {
    const { currentModule } = useModule()
    const token = Cookies.get("queryToken")

    // Llamado a la api para buscar direccionamiento por rango de fecha y paciente
    const fetchByDate = async (startDate, endDate, documentType, documentNumber) => {
        try {
            let res = await getDateRangeData(startDate, endDate, token, documentType, documentNumber, currentModule)
            let filteredRes = res.filter(response => {
                switch (currentModule) {
                    case "direccionamientos":
                        return response.EstDireccionamiento !== 0
                    case "entrega":
                        return response.EstProgramacion !== 0
                    default:
                        break;
                }
            })
            filteredRes.sort((a, b) => a.ID - b.ID)
            return filteredRes
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por fecha, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por fecha (rango/paciente)"
        }
    }

    // Llamado a la api para buscar direccionamiento por número de prescripción
    const fecthByPrescriptionNumber = async (prescriptionNumber, apiModule) => {
        try {
            let endpoint = getEndPoint(apiModule, "porPrescripcion")
            let url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let res = await axios(url)
            let resData = res.data
            let filteredRes = resData.filter(response => {
                switch (currentModule) {
                    case "direccionamientos":
                        return response.EstDireccionamiento !== 0
                    case "entrega":
                        return response.EstProgramacion !== 0
                    default:
                        break;
                }
            })
            filteredRes.sort((a, b) => a.ID - b.ID)
            return filteredRes
        } catch (error) {
            console.error("Error al obtener el direcccionamiento por número de prescripción, desde useApiCall.js: ", error)
            return "Error al obtener el direcccionamiento por número de prescripción"
        }
    }

    // Agregar data adicional luego de hacer una entrega
    const fecthAdditionalData = async (prescriptionNumber, Id) => {
        try {
            // Consulta al módulo de direccionamientos
            let urlDireccionamiento = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let resDireccionamiento = await axios(urlDireccionamiento)
            let direccionamientoData = resDireccionamiento.data.find(d => d.ID === Id)

            // Consulta al módulo de entrega
            let urlEntrega = `${process.env.NEXT_PUBLIC_API_URL}/EntregaXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let resEntrega = await axios(urlEntrega)
            let entregaData = resEntrega.data.find(e => e.ID === Id && e.EstEntrega !== 0)

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
            let url = `${process.env.NEXT_PUBLIC_API_FAC_URL}/FacturacionXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`
            let res = await axios(url)
            return res.data
        } catch (error) {
            console.error("Error al intentar obtener los datos de una facturación", error)
            throw Error
        }
    }

    // Direccionamientos próximos a vencer la fecha de entrega
    const fetchNextToExpire = async (startDate, endDate) => {
        let res = await getDateRangeData(startDate, endDate, token, "direccionamientos")

        // Filtrar solo los direccionamientos activos
        let filteredRes = res.filter(item => item.EstDireccionamiento === 1)
        // Organizar descendientemente por fecha
        filteredRes.sort((a, b) => new Date(a.FecMaxEnt) - new Date(b.FecMaxEnt))
        return filteredRes
    }
    return { fetchByDate, fecthByPrescriptionNumber, fecthAdditionalData, fetchInvoiceData, fetchNextToExpire }
}