import DireccionamientoCard from "./DireccionamientoCard";
import Loading from "./Loading";

const ResultCardList = ({ data, 
    loading, 
    isSearch, 
    handleCheckboxChange,
    handleSelectAll,
    selected 
    }) => {

    const programming = () => {
        console.log("Direccionamientos seleccionados: ", selected)
    }

    return (
        <section>
            {loading ? (
                <Loading />
            ) : isSearch ? (
                data.length > 0 ? (
                    <>
                        {selected.length > 0 && (
                            <div className="flex justify-between items-center bg-slate-100 text-gray-950 p-3 mt-8 rounded-md ">
                                <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
                                    <button 
                                        className="bg-green-500 hover:bg-green-600 text-white transition-colors rounded-md px-3 py-2"
                                        onClick={programming}
                                    >Programación</button>
                            </div>
                        )}
                        <div className="mt-5">
                            <label htmlFor="" className="text-white font-medium text-lg">
                                <input 
                                type="checkbox"
                                checked={selected.length === data.length}
                                onChange={handleSelectAll}
                                />
                                Seleccionar/Deseleccionar todos
                            </label>
                        </div>
                        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {data.map((direccionamiento) => (
                            <DireccionamientoCard
                                key={direccionamiento.ID}
                                direccionamiento={direccionamiento}
                                selected={selected.includes(direccionamiento)}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                        </article>
                    </>
                ) : (
                    <h3 className="text-white text-lg">No hay resultados, revisa los campos de búsqueda e intenta nuevamente</h3>
                )
            ) : null}
        </section>
    )
}

export default ResultCardList