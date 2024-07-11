import { useSearchForm } from "@/context/searchFormContext";
import { useModule } from "@/context/moduleContext";
import DireccionamientoCard from "./direccionamientocard/DireccionamientoCard";
import Loading from "./Loading";
import ProgrammingAlert from "./ProgrammingAlert";
import CheckboxInput from "./CheckboxInput";
import SearchSumary from "./SearchSumary";
import DeliveryModal from "./delivery/DeliveryModal"

const ResultCardList = () => {
    const {
        data,
        loading,
        isSearch,
        handleCheckboxChange,
        handleSelectAllAssets,
        selected,
        searchModule,
        isModalOpen,
    } = useSearchForm()
    const { currentModule } = useModule()
    // Mostrar la data de acuerdo al módulo actual
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
                        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
                            {data.map((direccionamiento) => (
                                <DireccionamientoCard
                                    key={direccionamiento.ID}
                                    direccionamiento={direccionamiento}
                                    selected={selected.some(item => item.ID === direccionamiento.ID)}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            ))}
                        </article>
                        {isModalOpen &&
                            <DeliveryModal />
                        }
                    </>
                ) : (
                    <p className="text-white text-lg text-center mt-10">No hay resultados, revisa los campos de búsqueda e intenta nuevamente</p>
                )
            ) : isSearch ? (
                <p className="text-white text-lg text-center mt-10">Los resultados de la búsqueda no corresponden al módulo actual</p>
            ) : null}
        </section>
    )
}

export default ResultCardList