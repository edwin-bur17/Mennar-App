import { useModule } from "@/context/moduleContext"
import { useSearchForm } from "@/context/searchFormContext"
import estadoDireccionamiento from "@/utils/estadoDireccionamiento"
import { formatDate } from "@/utils/formatDate"
import technologyType from "@/utils/technologyType"
import CheckboxInput from "../CheckboxInput"
import { CardField, Progress } from "./ui/ui"

function DireccionamientoCard({ direccionamiento, selected, handleCheckboxChange }) {
    const { openModal } = useSearchForm()
    const { currentModule } = useModule()
    const isDireccionamiento = currentModule === "direccionamientos"
    const bg = direccionamiento.EstDireccionamiento === 0 || direccionamiento.EstProgramacion === 0 ? "bg-red-100" : "bg-slate-300"

    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <Progress direccionamiento={direccionamiento} />
            <div className="grid grid-cols-3 gap-2">
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
                    title="Identificación Paciente"
                    content={`${direccionamiento.TipoIDPaciente} - ${direccionamiento.NoIDPaciente}`}
                />
                <CardField
                    title="Fecha máxima de entrega"
                    content={formatDate(direccionamiento.FecMaxEnt)}
                />
                <CardField
                    title="Cantidad total a entregar"
                    content={direccionamiento.CantTotAEntregar}
                />
                <CardField
                    title="Servicio o tecnológia"
                    content={technologyType(direccionamiento.TipoTec)}
                />
                <CardField
                    title="Servicio a entregar"
                    content={direccionamiento.CodSerTecAEntregar}
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
                {direccionamiento.IDEntrega && (
                    <>
                        <CardField
                            title="Id de la entrega"
                            content={direccionamiento.IDEntrega}
                        />
                        <CardField
                            title="Número subentrega"
                            content={direccionamiento.NoSubEntrega}
                        />
                        <CardField
                            title="Id EPS"
                            content={direccionamiento.NoIDEPS}
                        />
                        <CardField
                            title="Código EPS"
                            content={direccionamiento.CodEPS}
                        />
                    </>

                )}
            </div>
            {direccionamiento.EstDireccionamiento === 1 &&
                <CheckboxInput
                    checked={selected}
                    onCheckboxChange={handleCheckboxChange}
                    direccionamiento={direccionamiento}
                />
            }
            {direccionamiento.EstProgramacion === 1 &&
                <button
                    className="bg-sky-600 text-white hover:bg-sky-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal(direccionamiento)}
                >Entrega</button>
            }
            {direccionamiento.IDEntrega &&
                <button
                    className="bg-green-600 text-white hover:bg-green-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal(direccionamiento)}
                >Facturación</button>
            }
        </div>
    )
}

export default DireccionamientoCard