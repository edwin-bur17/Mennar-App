function DireccionamientoCard({ direccionamiento }) {
    const bg = direccionamiento.FecAnulacion ? "bg-red-300" : "bg-slate-300"
    return (
        <div className={` ${bg} p-5 rounded-lg text-gray-950`}>
            <h2 className="font-semibold">ID: {direccionamiento.ID}</h2>
            <p>Id direccionamiento: {direccionamiento.IDDireccionamiento}</p>
            <p>Número de prescripción: {direccionamiento.NoPrescripcion}</p>
            <p>N° Identificación Paciente: {direccionamiento.NoIDPaciente}</p>
            <p>Fecha máxima de entrega: {direccionamiento.FecMaxEnt}</p>
            <p>Cantidad total a entregar: {direccionamiento.CantTotAEntregar}</p>
            <p>Fecha anulación: {direccionamiento.FecAnulacion}</p>
            <p>Fecha del direccionamiento: <span className="text-green-700"> {direccionamiento.FecDireccionamiento}</span></p>
            <input type="checkbox" />
        </div>
    )
}

export default DireccionamientoCard