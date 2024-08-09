import Badge from "./Badge"
const Progress = ({ direccionamiento, invoiceStatus, deliveryReportStatus }) => {
    const isDireccionado = direccionamiento.ID; // Estado direccionado
    const isProgramming = direccionamiento.IDProgramacion || direccionamiento.EstDireccionamiento === 2;
    const isDelivery = direccionamiento.EstProgramacion === 2;
    const hasInvoice = invoiceStatus[direccionamiento.ID];
    const hasReport = deliveryReportStatus[direccionamiento.ID];
    return (
        <div className="flex justify-between mb-3">
            <Badge title="Direccionado" isCompleted={isDireccionado} />
            <Badge title="Programado" isCompleted={isProgramming} />
            <Badge title="Entrega" isCompleted={isDelivery} />
            <Badge title="Facturación" isCompleted={hasInvoice} />
            <Badge title="Reporte" isCompleted={hasReport} />
        </div>
    )
}

export default Progress