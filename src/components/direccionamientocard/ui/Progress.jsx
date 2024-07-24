import Badge from "./Badge"
const Progress = ({ direccionamiento }) => {
    const isDireccionado = direccionamiento.ID; // Estado direccionado
    const isProgramado = direccionamiento.IDProgramacion || direccionamiento.EstDireccionamiento === 2;
    const isEntregado = direccionamiento.EstProgramacion === 2;
    const hasReporte = direccionamiento.IdReporteEntrega;
    return (
        <div className="flex justify-between mb-3">
            <Badge title="Direccionado" isCompleted={isDireccionado} />
            <Badge title="Programado" isCompleted={isProgramado} />
            <Badge title="Entrega" isCompleted={isEntregado} />
            <Badge title="Facturación" isCompleted={hasReporte} />
            <Badge title="Reporte" isCompleted={hasReporte} />
        </div>
    )
}

export default Progress