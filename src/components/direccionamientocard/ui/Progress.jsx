import { useSearchForm } from "@/context/searchFormContext";
import Badge from "./Badge"
const Progress = ({ direccionamiento }) => {
    const { deliveryStatus, invoiceStatus, deliveryReportStatus } = useSearchForm()

    // Semáforo del estado en el cual está el direccionamiento
    const isDireccionado = direccionamiento.ID // Estado: direccionado
    let isProgramming = direccionamiento.EstProgramacion || direccionamiento.EstDireccionamiento === 2  // Estado: Programado
    let isDelivery = deliveryStatus[direccionamiento.ID] && deliveryStatus[direccionamiento.ID] !== 0  // Estado: Entregado
    let isInvoice = invoiceStatus[direccionamiento.ID] && invoiceStatus[direccionamiento.ID] !== 0  // Estado: Facturado
    let isReport = deliveryReportStatus[direccionamiento.ID] && deliveryReportStatus[direccionamiento.ID] !== 0 // Estado: reportada la entrega
    return (
        <div className="flex justify-between mb-3">
            <Badge title="Direccionado" isCompleted={isDireccionado} />
            <Badge title="Programado" isCompleted={isProgramming} />
            <Badge title="Entregado" isCompleted={isDelivery} />
            <Badge title="Facturado" isCompleted={isInvoice} />
            <Badge title="Reporte de entrega" isCompleted={isReport} />
        </div>
    )
}

export default Progress