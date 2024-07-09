import { useModule } from "@/context/moduleContext"
import { useSearchForm } from "@/context/searchFormContext"
import estadoDireccionamiento from "@/utils/estadoDireccionamiento"
import { formatDate } from "@/utils/formatDate"
import CheckboxInput from "./CheckboxInput"
import CardField from "./CardField"

function DireccionamientoCard({ direccionamiento, selected, handleCheckboxChange }) {
    const { openModal } = useSearchForm()
    const { currentModule } = useModule()
    const isDireccionamiento = currentModule === "direccionamientos"
    const bg = direccionamiento.EstDireccionamiento === 0 || direccionamiento.EstProgramacion === 0 ? "bg-red-300" : "bg-slate-300"

    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <h2 className="font-semibold">ID: {direccionamiento.ID}</h2>
            <div className="grid grid-cols-2 gap-1">
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
                    title="Proveedor"
                    content={isDireccionamiento
                        ? `${direccionamiento.TipoIDProv} - ${direccionamiento.NoIDProv}`
                        : `${direccionamiento.TipoIDSedeProv} - ${direccionamiento.NoIDSedeProv}`}
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
                    title="Estado"
                    content={isDireccionamiento
                        ? estadoDireccionamiento(direccionamiento.EstDireccionamiento)
                        : estadoDireccionamiento(direccionamiento.EstProgramacion)}
                />
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
                    className="bg-green-600 text-white hover:bg-green-500 rounded-md mt-2 py-2 px-3"
                    onClick={() => openModal(direccionamiento)}
                >Entrega</button>
            }
        </div>
    )
}

export default DireccionamientoCard