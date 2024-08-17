import { useSearchForm } from "@/context/searchFormContext";
import { useModule } from "@/context/moduleContext";
import { usePagination } from "@/context/paginationContext";
import { useModal } from "@/context/modalContext";
import DireccionamientoCard from "./direccionamientocard/DireccionamientoCard";
import Loading from "./Loading";
import ProgrammingAlert from "./ProgrammingAlert";
import CheckboxInput from "./CheckboxInput";
import SearchSumary from "./SearchSumary";
import Modal from "./delivery/Modal"
import Pagination from "./Pagination";

const ResultCardList = () => {
    const {
        paginatedData,
        loading,
        isSearch,
        handleCheckboxChange,
        handleSelectAllAssets,
        selected,
        searchModule,
        completeDireccionamientos,
        fetchCompleteDireccionamiento,
        setPage,
        totalItems,
    } = useSearchForm()
    const {isOpen} = useModal()
    const {itemsPerPage, currentPage} = usePagination()
    const { currentModule } = useModule()
    // Mostrar la data de acuerdo al módulo actual
    const showData = isSearch && (currentModule === searchModule)

    // Direcionamientos activos
    const activeDireccionamientos = paginatedData.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length > 0

    // todos los direccionamientos activos están seleccionados
    const isCheckedAllAssets = selected.length === paginatedData.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length

    return (
        <section>
            {loading ? (
                <Loading />
            ) : showData ? (
                paginatedData.length > 0 ? (
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
                                    data={paginatedData} />
                                <label className="text-white ms-4">
                                    {isCheckedAllAssets ? "Deseleccionar todos los direccionamientos activos" : "Seleccionar todos los direccionamientos activos"}
                                </label>
                            </div>
                        )}
                        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-5">
                            {paginatedData.map((direccionamiento) => (
                                <DireccionamientoCard
                                    key={direccionamiento.ID}
                                    direccionamiento={direccionamiento}
                                    completeData={completeDireccionamientos[direccionamiento.ID]}
                                    fetchCompleteData={() => fetchCompleteDireccionamiento(direccionamiento)}
                                    selected={selected.some(item => item.ID === direccionamiento.ID)}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            ))}
                        </article>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalItems / itemsPerPage)}
                            onPageChange={setPage}
                        />
                        {isOpen &&
                            <Modal />
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