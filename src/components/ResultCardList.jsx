import DireccionamientoCard from "./DireccionamientoCard";
import Loading from "./Loading";

const ResultCardList = ({ data, loading, isSearch }) => {
    return (
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-5">
            {loading ? (
                <Loading />
            ) : isSearch ? (
                data.length > 0 ? (
                    data.map((direccionamiento) => (
                        <DireccionamientoCard
                            key={direccionamiento.ID}
                            direccionamiento={direccionamiento}
                        />
                    ))
                ) : (
                    <h3 className="text-white text-lg">No hay resultados, revisa los campos de búsqueda e intenta nuevamente</h3>
                )
            ) : null}
        </article>
    )
}

export default ResultCardList