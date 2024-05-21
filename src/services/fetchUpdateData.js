import { useApiCall } from "@/hooks/useApiCall"
import showAlert from "./alertSweet"

export async function fetchUpdateData(searchParams, setData) {
    const { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion } = useApiCall()
    try {
        let res
        if (searchParams.startDate && searchParams.endDate) {
            if (searchParams.documentType && searchParams.documentNumber) {
                res = await fetchDireccionamientoFecha(searchParams.startDate, searchParams.endDate, searchParams.documentType, searchParams.documentNumber)
            } else {
                res = await fetchDireccionamientoFecha(searchParams.startDate, searchParams.endDate)
            }
        } else {
            res = await fetchDireccionamientoXPrescripcion(searchParams.prescriptionNumber)
        }
        if (res && typeof res === "object") {
            setData(res)
        } else {
            showAlert(res, "error")
        }
    } catch (error) {
        console.log("Error al obtener los datos actualizados, desde services/fetchUpdateData", error)
        showAlert(error.response.data.error, "error")
    }
}