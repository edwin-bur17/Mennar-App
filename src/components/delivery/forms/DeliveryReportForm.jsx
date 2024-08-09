import { useState } from "react"
import axios from "axios"
import { useSearchForm } from "@/context/searchFormContext"
import showAlert from "@/services/alertSweet"
import { formatCOP } from "@/utils"
import { Input, Button } from "./ui/ui"

const DeliveryReportForm = ({ direccionamiento, valorEntregado }) => {
    const { updateData } = useSearchForm()
    const deliveryReportData = {
        ID: direccionamiento.ID,
        EstadoEntrega: 0,
        CausaNoEntrega: 0,
        ValorEntregado: valorEntregado
    }
    const [isLoading, setIsLoading] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(deliveryReportData)
        try {
            setIsLoading(true)
            const res = await axios.put("/api/direccionamiento/reporte", { deliveryReportData })
            console.log(res.data.message)
            showAlert(res.data.message, "success")
            await updateData()
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.details)
                showAlert(error.response.data.details, "error")
            } else {
                console.error("Error en la solicitud (reporte entrega de un direccionamiento):", error.response?.data || error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const deliveryReportFields = [
        { label: "Id entrega", id: "ID", type: "text", value: deliveryReportData.ID, readOnly: true },
        { label: "Estado Entrega", id: "EstadoEntrega", type: "text", value: deliveryReportData.EstadoEntrega, readOnly: true },
        { label: "Causa no entrega", id: "CausaNoEntrega", type: "text", value: deliveryReportData.CausaNoEntrega, readOnly: true },
        { label: "Valor entregado", id: "ValorEntregado", type: "text", value: formatCOP(deliveryReportData.ValorEntregado), readOnly: true }
    ]

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="grid grid-cols-2 gap-2">
                {deliveryReportFields.map((field) => (
                    <Input
                        key={field.id}
                        {...field}
                        className="w-full py-2 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                ))}
            </div>
            <Button isLoading={isLoading} title="Reporte entrega" />
        </form>
    )
}

export default DeliveryReportForm