import Badge from "./Badge"
const Progress = ({ direccionamiento, invoiceStatus, deliveryReportStatus }) => {
    const isDireccionado = direccionamiento.ID; // Estado direccionado
    const isProgramming = direccionamiento.IDProgramacion || direccionamiento.EstDireccionamiento === 2;
    const isDelivery = direccionamiento.EstProgramacion === 2 || invoiceStatus[direccionamiento.ID] || deliveryReportStatus[direccionamiento.ID];
    const hasInvoice = invoiceStatus[direccionamiento.ID];
    const hasReport = deliveryReportStatus[direccionamiento.ID];
    return (
        <div className="flex justify-between mb-3">
            <Badge title="Direccionado" isCompleted={isDireccionado} />
            <Badge title="Programado" isCompleted={isProgramming} />
            <Badge title="Entregado" isCompleted={isDelivery} />
            <Badge title="Facturado" isCompleted={hasInvoice} />
            <Badge title="Reporte de entrega" isCompleted={hasReport} />
        </div>
    )
}

export default Progress