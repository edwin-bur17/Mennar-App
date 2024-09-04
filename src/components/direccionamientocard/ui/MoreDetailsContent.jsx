import CardField from "./CardField"
import { getNameEps, formatDate } from "@/utils"
const MoreDetailsContent = ({ loading, completeData }) => {
    if (loading) return <p className="text-center">Cargando datos adicionales ...</p>
    if (!completeData) return <p className="text-center">No se pudieron cargar los datos adicionales</p>
    return (
        <div className="grid grid-cols-6 gap-1 mt-2">
            <CardField
                title="EPS"
                content={`${completeData.CodEPS} - ${getNameEps(completeData.CodEPS)}`}
            />
            {completeData.IdEntrega && (
                <>
                    <CardField
                        title="Cantidad entregada"
                        content={completeData.CantidadEntregada}
                    />
                    <CardField
                        title="Fecha de la entrega"
                        content={formatDate(completeData.FecEntrega)}
                    />
                    {completeData.FecFacturacion && (
                        <CardField
                            title="Fecha de facturación"
                            content={formatDate(completeData.FecFacturacion)}
                        />
                    )}
                    {/* {completeData.FecAnulacionReporte && (
                        <CardField
                        title="Fecha de anulación reporte"
                        content={formatDate(completeData.FecAnulacionReporte)}
                    />
                    )} */}
                </>
            )}
        </div>
    )
}

export default MoreDetailsContent