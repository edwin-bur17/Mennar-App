import SearchFormContainer from "@/components/SearchFormContainer";
export const metadata = {
    title: "Mennar - Entrega"
};

const DeliveryPage = () => {
  return (
    <section>
        <h1 className="text-center text-white text-2xl font-bold">ENTREGA - FACTURACIÓN - REPORTE ENTREGA </h1>
        <SearchFormContainer />
    </section>
  )
}

export default DeliveryPage