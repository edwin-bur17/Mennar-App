import DireccionamientoCard from "./DireccionamientoCard";
import Loading from "./Loading";
import ProgrammingAlert from "./ProgrammingAlert";
import CheckboxInput from "./CheckboxInput";
import SearchSumary from "./SearchSumary";
import { useSearchForm } from "@/context/searchFormContext";
import { useModule } from "@/context/moduleContext";

const ResultCardList = () => {
    const { data, loading, isSearch, handleCheckboxChange, handleSelectAllAssets, selected, searchModule } = useSearchForm()
    const { currentModule } = useModule()

    // Mostrar la data de acuerdoal módulo actual
    const showData = isSearch && (currentModule === searchModule)

    // Direcionamientos activos
    const activeDireccionamientos = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length > 0

    // todos los direccionamientos activos están seleccionados
    const isCheckedAllAssets = selected.length === data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length
    
    return (
        <section>
            {loading ? (
                <Loading />
            ) : showData ? (
                data.length > 0 ? (
                    <>
                        <SearchSumary />
                        {selected.length > 0 && (
                            <ProgrammingAlert />
                        )}
                        {activeDireccionamientos && (
                            <div className="my-5">
                                <CheckboxInput
                                    checked={isCheckedAllAssets}
                                    onCheckboxChange={handleSelectAllAssets}
                                    selectAll
                                    data={data} />
                                <label className="text-white ms-4">
                                    {isCheckedAllAssets ? "Deseleccionar todos los direccionamientos activos" : "Seleccionar todos los direccionamientos activos"}
                                </label>
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
            ) : isSearch ? (
                <h3 className="text-white text-lg">Los resultados de la búsqueda no corresponden al módulo actual</h3>
            ) : null}
        </section>
    )
}

export default ResultCardList