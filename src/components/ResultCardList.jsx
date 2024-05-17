import DireccionamientoCard from "./DireccionamientoCard";
import Loading from "./Loading";
import DireccionamientosProgrammingAlert from "./DireccionamientosProgrammingAlert";

const ResultCardList = ({ data, loading, isSearch, handleCheckboxChange, handleSelectAllNotNull, selected }) => {
    return (
        <section>
            {loading ? (
                <Loading />
            ) : isSearch ? (
                data.length > 0 ? (
                    <>
                        <p className="text-white my-5">Total de resultados: <span className="font-semibold">{data.length}</span> </p>
                        {selected.length > 0 && (
                            <DireccionamientosProgrammingAlert
                                selected={selected}
                            />
                        )}
                        <div className="mt-5">
                            <input
                                type="checkbox"
                                className="accent-blue-600 h-4 w-4 cursor-pointer rounded-lg transition-all duration-300  focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-500 checked:bg-blue-600 checked:hover:bg-blue-700 checked:focus:ring-blue-600"
                                checked={selected.length === data.filter((direccionamiento) => !direccionamiento.FecAnulacion).length}
                                onChange={() => handleSelectAllNotNull(data)}
                            />
                            <label className="text-white font-medium ms-5">
                                Seleccionar/Deseleccionar todos los direccionamientos NO anulados
                            </label>
                        </div>
                        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {data.map((direccionamiento) => (
                                <DireccionamientoCard
                                    key={direccionamiento.ID}
                                    direccionamiento={direccionamiento}
                                    selected={selected.some(item => item.ID === direccionamiento.IDDireccionamiento)}
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