import SearchFormContainer from "@/components/SearchFormContainer";
export const metadata = {
    title: "Mennar - Entrega"
};

const DeliveryPage = () => {
  return (
    <section>
        <h1 className="text-center text-white text-2xl font-bold mb-4">Página de entrega </h1>
        <SearchFormContainer />
    </section>
  )
}

export default DeliveryPage