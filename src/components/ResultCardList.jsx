import DireccionamientoCard from "./DireccionamientoCard";
import Loading from "./Loading";
import DireccionamientosProgrammingAlert from "./DireccionamientosProgrammingAlert";
import CheckboxInput from "./CheckboxInput";
import SearchSumary from "./SearchSumary";
import { useSearchForm } from "@/context/searchFormContext";

const ResultCardList = () => {
    const {data, loading, isSearch, handleCheckboxChange, handleSelectAllAssets, selected} = useSearchForm()
    // todos los direccionamientos activos están seleccionados
    const isCheckedAllAssets = selected.length === data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length
    return (
        <section>
            {loading ? (
                <Loading />
            ) : isSearch ? (
                data.length > 0 ? (
                    <>
                        <SearchSumary />
                        {selected.length > 0 && (
                            <DireccionamientosProgrammingAlert />
                        )}
                        {data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length > 0 && (
                            <div className="my-5">
                                <CheckboxInput
                                    checked={isCheckedAllAssets}
                                    onCheckboxChange={handleSelectAllAssets}
                                    selectAll
                                    data={data}
                                />
                                <label className="text-white ms-4">{isCheckedAllAssets ? "Deseleccionar todos los direccionamientos activos" : "Seleccionar todos los direccionamientos activos"}</label>
                            </div>
                        )}
                        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {data.map((direccionamiento) => (
                                <DireccionamientoCard
                                    key={direccionamiento.ID}
                                    direccionamiento={direccionamiento}
                                    selected={selected.some(item => item.ID === direccionamiento.ID)}
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