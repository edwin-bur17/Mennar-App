const SearchSumary = ({ data, searchParams }) => {
    // Resumen de la búsqueda
    const total = data.length
    const cancelled = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 0).length
    const assets = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length
    const programmed = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 2).length

    return (
        <div className="bg-white flex justify-around items-center p-2 rounded-lg mt-5">
            <h3>Resumen de la búsqueda</h3>
            <p>Total: {total}</p>
            <p className="text-red-400 font-bold">anulados: {cancelled}</p>
            <p>Activos: {assets}</p>
            <p className="text-green-500 font-bold">Programados: {programmed}</p>
        </div>
    )
}

export default SearchSumary