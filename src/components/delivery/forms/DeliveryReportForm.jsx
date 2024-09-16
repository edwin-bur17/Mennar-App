import { useState } from "react"
import axios from "axios"
import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext"
import showAlert from "@/services/alertSweet"
import { formatCOP } from "@/utils"
import { Input, Button } from "./ui/ui"

const DeliveryReportForm = () => {
    const { updateData } = useSearchForm()
    const { closeModal, currentData } = useModal()
    const deliveryReportData = {
        ID: currentData.ID,
        EstadoEntrega: 0,
        CausaNoEntrega: 0,
        ValorEntregado: currentData.ValorTotFacturado
    }
    const [isLoading, setIsLoading] = useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.put("/api/direccionamiento/reporte", { deliveryReportData })
            await new Promise(resolve => setTimeout(resolve, 1200))
            await updateData()
            closeModal()
            showAlert(res.data.message, "success")
        } catch (error) {
            if (error.response && error.response.status === 422) {
                showAlert(error.response.data.details, "error")
            } else {
                console.log("Error en la solicitud (reporte entrega de un direccionamiento):", error.response?.data || error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const deliveryReportFields = [
        { label: "Id", id: "ID", type: "text", value: deliveryReportData.ID, readOnly: true },
        { label: "Estado entrega", id: "EstadoEntrega", type: "text", value: deliveryReportData.EstadoEntrega, readOnly: true },
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
                    />
                ))}
            </div>
            <Button isLoading={isLoading} title="Reporte entrega" />
        </form>
    )
}
export default DeliveryReportForm