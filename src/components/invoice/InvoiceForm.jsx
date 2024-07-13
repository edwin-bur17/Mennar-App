import { useState } from "react";
import { useSearchForm } from "@/context/searchFormContext";
import Input from "@/components/Input";

export const InvoiceForm = () => {
  const { closeModal, currentDireccionamiento, updateDataAfterProgramming } = useSearchForm()
  const { NoPrescripcion, TipoTec, ConTec, TipoIDPaciente, NoIDPaciente, NoEntrega, CodSerTecAEntregar,  } = currentDireccionamiento
  const [invoiceData, setInvoiceData] = useState({ // json de la facturación
    NoPrescripcion: NoPrescripcion,
    TipoTec: TipoTec,
    ConTec: ConTec,
    TipoIDPaciente: TipoIDPaciente,
    NoIDPaciente: NoIDPaciente,
    NoEntrega: NoEntrega,
    NoSubEntrega: "",
    NoFactura: "",
    NoIDEPS: "",
    CodEPS: "",
    CodSerTecAEntregado: CodSerTecAEntregar,
    CantUnMinDis: "",
    ValorUnitFacturado: "",
    ValorTotFacturado: "",
    CuotaModer: "",
    Copago: ""
  })

  const handleOnChange = (e) => {
    const {id, value} = e.target
    setInvoiceData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("datos a facturar:")
    console.log(invoiceData)
  }

  const invoiceFields = [ // Campos del formulario
    { label: "Número de Prescripción:", id: "NoPrescripcion", type: "text", value: NoPrescripcion, readOnly: true },
    { label: "Número de entrega:", id: "NoEntrega", type: "text", value: NoEntrega, readOnly: true },
    { label: "Número de Factura:", id: "NoFactura", type: "number", value: invoiceData.NoFactura },
    { label: "Cantidad Mínima dispensada:", id: "CantUnMinDis", type: "number", value: invoiceData.CantUnMinDis },
    { label: "Valor Unitario Facturado:", id: "ValorUnitFacturado", type: "number", value: invoiceData.ValorUnitFacturado },
    { label: "Valor Total Facturado:", id: "ValorTotFacturado", type: "number", value: invoiceData.ValorTotFacturado },
    { label: "Cuota Moderada:", id: "CuotaModer", type: "number", value: invoiceData.CuotaModer },
    { label: "Copago:", id: "Copago", type: "number", value: invoiceData.Copago },
  ]
  return (
    <form onSubmit={handleOnSubmit} >
      <div className="grid grid-cols-2 gap-2">
        {invoiceFields.map((field) => (
          <Input
            key={field.id}
            {...field}
            onChange={handleOnChange}
            className="w-full py-2 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        ))}
      </div>
      <input type="submit" value="Enviar" />
    </form>
  );
}

export default InvoiceForm