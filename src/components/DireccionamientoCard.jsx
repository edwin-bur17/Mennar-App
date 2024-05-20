import estadoDireccionamiento from "@/utils/estadoDireccionamiento"
function DireccionamientoCard({ direccionamiento, selected, handleCheckboxChange }) {
    const bg = direccionamiento.FecAnulacion ? "bg-red-300" : "bg-slate-300"
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
            {!direccionamiento.FecAnulacion &&
                <input
                    type="checkbox"
                    className="accent-blue-600 h-4 w-4 cursor-pointer rounded-lg transition-all duration-300  focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-500 checked:bg-blue-600 checked:hover:bg-blue-700 checked:focus:ring-blue-600"
                    checked={selected}
                    onChange={() => handleCheckboxChange(direccionamiento)}
                />}
        </div>
    )
}

export default DireccionamientoCard