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
        } else if (searchParams.prescriptionNumber) {
            res = await fetchDireccionamientoXPrescripcion(searchParams.prescriptionNumber)
            console.log("actualizando la data por número de prescripción")
            console.log("número de prescripción: ", searchParams.prescriptionNumber)
        }
        console.log("data actualizada: ", res)
        if (res && typeof res === "object") {
            console.log("todo ok con la data ")
            setData(res)
        } else {
            console.log("la data de la actualización no es un object ")
            showAlert(res, "error")
        }
    } catch (error) {
        console.log("Error al obtener los datos actualizados, desde services/fetchUpdateData", error)
        showAlert(error.response.data.error, "error")
    }
}