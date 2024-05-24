import estadoDireccionamiento from "@/utils/estadoDireccionamiento"
import CheckboxInput from "./CheckboxInput"
function DireccionamientoCard({ direccionamiento, selected, handleCheckboxChange }) {
    const bg = direccionamiento.EstDireccionamiento === 0 ? "bg-red-300" : "bg-slate-300"
    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <h2 className="font-semibold">ID: {direccionamiento.ID}</h2>
            <p>Id direccionamiento: {direccionamiento.IDDireccionamiento}</p>
            <p>Número de prescripción: {direccionamiento.NoPrescripcion}</p>
            <p>N° Identificación Paciente: {direccionamiento.NoIDPaciente}</p>
            <p>Fecha máxima de entrega: {direccionamiento.FecMaxEnt}</p>
            <p>Cantidad total a entregar: {direccionamiento.CantTotAEntregar}</p>
            <p>Tipo Id Proveedor: {direccionamiento.TipoIDProv}</p>
            <p>Número Id Proveedor: {direccionamiento.NoIDProv}</p>
            <p>Servicio a entregar: {direccionamiento.CodSerTecAEntregar}</p>
            <p>Fecha del direccionamiento: <span className="font-bold"> {direccionamiento.FecDireccionamiento}</span></p>
            <p>Estado: {estadoDireccionamiento(direccionamiento.EstDireccionamiento)}</p>
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