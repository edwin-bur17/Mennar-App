import SearchFormContainer from "@/components/SearchFormContainer"

export const metadata = {
    title: "Mennar - direccionamiento"
};
const DireccionamientosPage = () => {
    return (
        <section>
            <h1 className="text-center text-white text-2xl font-bold mb-4">Consultar Direccionamiento</h1>
            <SearchFormContainer />
        </section>
    )
}

export default DireccionamientosPage