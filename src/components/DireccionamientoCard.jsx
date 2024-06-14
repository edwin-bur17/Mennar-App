import estadoDireccionamiento from "@/utils/estadoDireccionamiento"
import CheckboxInput from "./CheckboxInput"
function DireccionamientoCard({ direccionamiento, selected, handleCheckboxChange }) {
    const bg = direccionamiento.EstDireccionamiento === 0 ? "bg-red-300" : "bg-slate-300"
    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <h2 className="font-semibold">ID: {direccionamiento.ID}</h2>
            <ul className="mt-2 space-x-1">
                <li>Id direccionamiento: {direccionamiento.IDDireccionamiento}</li>
                <li>Número de prescripción: {direccionamiento.NoPrescripcion}</li>
                <li>N° Identificación Paciente: {direccionamiento.NoIDPaciente}</li>
                <li>Fecha máxima de entrega: {direccionamiento.FecMaxEnt}</li>
                <li>Cantidad total a entregar: {direccionamiento.CantTotAEntregar}</li>
                <li>Tipo Id Proveedor: {direccionamiento.TipoIDProv}</li>
                <li>Número Id Proveedor: {direccionamiento.NoIDProv}</li>
                <li>Servicio a entregar: {direccionamiento.CodSerTecAEntregar}</li>
                <li>Fecha del direccionamiento: <strong> {direccionamiento.FecDireccionamiento}</strong></li>
                <li>Estado: {estadoDireccionamiento(direccionamiento.EstDireccionamiento)}</li>
            </ul>
            {direccionamiento.EstDireccionamiento === 1 &&
                <CheckboxInput
                    checked={selected}
                    onCheckboxChange={handleCheckboxChange}
                    direccionamiento={direccionamiento}
                />
            }
        </div>
    )
}

export default DireccionamientoCard