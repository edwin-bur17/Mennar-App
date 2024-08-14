import { useState, useEffect } from "react"
import { useModule } from "@/context/moduleContext"
import { useSearchForm } from "@/context/searchFormContext"
import { estadoDireccionamiento, formatDate, technologyType, getNameProduct, getNameEps } from "@/utils"
import CheckboxInput from "../CheckboxInput"
import { CardField, Progress } from "./ui/ui"

function DireccionamientoCard({
    direccionamiento,
    completeData,
    fetchCompleteData,
    selected,
    handleCheckboxChange
}) {
    const { openModal, invoiceStatus, deliveryReportStatus } = useSearchForm()
    const { currentModule } = useModule()
    const isDireccionamiento = currentModule === "direccionamientos"
    const bg = direccionamiento.EstDireccionamiento === 0 || direccionamiento.EstProgramacion === 0 ? "bg-red-100" : "bg-slate-300"

    const [isExpanded, setIsExpanded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isExpanded && !completeData && !loading) {
            setLoading(true)
            fetchCompleteData().finally(() => setLoading(false))
        }
    }, [isExpanded, completeData, fetchCompleteData])

    // onChange del botón de expandir 
    const toggleExpand = () => { setIsExpanded(!isExpanded) }

    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <Progress direccionamiento={direccionamiento} invoiceStatus={invoiceStatus} deliveryReportStatus={deliveryReportStatus}/>
            <div className="grid grid-cols-6 gap-1">
                <CardField title="ID" content={direccionamiento.ID} />
                <CardField
                    title={isDireccionamiento ? "ID direccionamiento" : "ID Programación:"}
                    content={isDireccionamiento ? direccionamiento.IDDireccionamiento : direccionamiento.IDProgramacion}
                />
                <CardField
                    title="Número de prescripción"
                    content={direccionamiento.NoPrescripcion}
                />
                <CardField
                    title="Número de entrega"
                    content={direccionamiento.NoEntrega}
                />
                <CardField
                    title="Identificación Paciente"
                    content={`${direccionamiento.TipoIDPaciente} - ${direccionamiento.NoIDPaciente}`}
                />
                {direccionamiento.EstProgramacion === 1 &&
                    <>
                        <CardField
                            title="Fecha máxima de entrega"
                            content={formatDate(direccionamiento.FecMaxEnt)}
                        />
                        <CardField
                            title="Cantidad total a entregar"
                            content={direccionamiento.CantTotAEntregar}
                        />
                    </>
                }
                <CardField
                    title="Servicio o tecnológia"
                    content={technologyType(direccionamiento.TipoTec)}
                />
                <CardField
                    title="Servicio a entregar"
                    content={`${direccionamiento.CodSerTecAEntregar} - ${getNameProduct(direccionamiento.CodSerTecAEntregar)}`}
                />
                <CardField
                    title={isDireccionamiento ? "Fecha del direccionamiento" : "Fecha de programación"}
                    content={isDireccionamiento ? formatDate(direccionamiento.FecDireccionamiento) : formatDate(direccionamiento.FecProgramacion)}
                />
                <CardField
                    title="Estado actual"
                    content={isDireccionamiento
                        ? estadoDireccionamiento(direccionamiento.EstDireccionamiento)
                        : estadoDireccionamiento(direccionamiento.EstProgramacion)}
                />
                <button onClick={toggleExpand} className="text-blue-600 hover:underline">
                    {isExpanded ? 'Ocultar detalles' : 'Más detalles '}
                </button>
            </div>
            {isExpanded && (
                <div className="mt-2">
                    {loading ? (
                        <p>Cargando datos adicionales...</p>
                    ) : completeData ? (
                        <div className="grid grid-cols-6 gap-1">
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
                                    <CardField
                                        title="Fecha de facturación"
                                        content={formatDate(completeData.FecFacturacion)}
                                    />
                                </>
                            )}
                        </div>
                    ) : (
                        <p>No se pudieron cargar los datos adicionales</p>
                    )}
                </div>
            )}
            {direccionamiento.EstDireccionamiento === 1 &&
                <CheckboxInput
                    checked={selected}
                    onCheckboxChange={handleCheckboxChange}
                    direccionamiento={direccionamiento}
                />
            }
            {direccionamiento.EstProgramacion === 1 && !invoiceStatus[direccionamiento.ID] &&
                <button
                    className="bg-sky-600 text-white hover:bg-sky-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal(direccionamiento, "delivery")}
                >
                    Entrega
                </button>
            }
            {completeData && completeData.EstEntrega === 1 && !invoiceStatus[direccionamiento.ID] &&
                <button
                    className="bg-green-600 text-white hover:bg-green-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal(completeData, "invoice")}
                >
                    Facturación
                </button>
            }
            {completeData && invoiceStatus[direccionamiento.ID] && !deliveryReportStatus[direccionamiento.ID] &&
                <button
                    className="bg-yellow-600 text-white hover:bg-yellow-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal({ ...completeData, ...invoiceStatus[direccionamiento.ID] }, "report")}
                >
                    Reporte Entrega
                </button>
            }
            {deliveryReportStatus[direccionamiento.ID] && <span className="bg-green-700 rounded-lg text-white p-2">Ciclo del direccionamiento completado </span>}
        </div>
    )
}

export default DireccionamientoCard