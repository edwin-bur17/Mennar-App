const DireccionamientosProgrammingAlert = ({ selected, programming }) => {
    return (
        <div className="flex justify-between items-center bg-slate-100 text-gray-950 p-3 mt-8 rounded-md transition-all">
            <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
            <button
                className="bg-green-500 hover:bg-green-600 text-white transition-colors rounded-md px-3 py-2"
                onClick={programming}
            >Programación</button>
        </div>
    )
}

export default DireccionamientosProgrammingAlert