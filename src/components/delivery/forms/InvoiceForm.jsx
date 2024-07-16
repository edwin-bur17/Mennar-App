import { useState, useEffect } from "react";
import { useSearchForm } from "@/context/searchFormContext";
import { Input, Button, Alert } from "./ui/ui"
import totalInvoiceValue from "@/utils/totalInvoiceValue";

export const InvoiceForm = () => {
  const { closeModal, currentDireccionamiento, updateDataAfterProgramming } = useSearchForm()
  const { NoPrescripcion, TipoTec, ConTec, TipoIDPaciente, NoIDPaciente, NoEntrega, CodSerTecAEntregar, NoSubEntrega, NoIDEPS, CodEPS } = currentDireccionamiento
  const [invoiceData, setInvoiceData] = useState({ // json de la facturación
    NoPrescripcion: NoPrescripcion,
    TipoTec: TipoTec,
    ConTec: ConTec,
    TipoIDPaciente: TipoIDPaciente,
    NoIDPaciente: NoIDPaciente,
    NoEntrega: NoEntrega,
    NoSubEntrega: NoSubEntrega,
    NoFactura: "",
    NoIDEPS: NoIDEPS,
    CodEPS: CodEPS,
    CodSerTecAEntregado: CodSerTecAEntregar,
    CantUnMinDis: "",
    ValorUnitFacturado: "",
    ValorTotFacturado: "0",
    CuotaModer: "",
    Copago: ""
  })
  const [alert, setAlert] = useState("")

  const validateFields = () => { // Validar los campos 
    return Object.values(invoiceData).every(value => value !== "" && value !== null && value !== undefined);
  };

  useEffect(() => { // Manejo del onChange del cálculo de ValorTotFacturado
    setInvoiceData(prevData => ({
      ...prevData,
      ValorTotFacturado: totalInvoiceValue(prevData.CantUnMinDis,
        prevData.ValorUnitFacturado,
        prevData.CuotaModer,
        prevData.Copago)
    }))
  }, [invoiceData.CantUnMinDis, invoiceData.ValorUnitFacturado, invoiceData.CuotaModer, invoiceData.Copago])

  const handleOnChange = (e) => { // Manejo del onChange de los inputs
    const { id, value } = e.target
    setInvoiceData(prevData => ({
      ...prevData,
      [id]: value,
      ...(id === "CuotaModer" && value !== "" ? { Copago: "0" } : {}),
      ...(id === "Copago" && value !== "" ? { CuotaModer: "0" } : {})

    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (!validateFields()) {
      setAlert("Todos los campos son obligatorios para hacer la entrega")
      return
    }
  }

  const invoiceFields = [ // Campos del formulario
    { label: "Número de prescripción:", id: "NoPrescripcion", type: "text", value: NoPrescripcion, readOnly: true },
    { label: "Número de entrega:", id: "NoEntrega", type: "text", value: NoEntrega, readOnly: true },
    { label: "Número de factura:", id: "NoFactura", type: "number", value: invoiceData.NoFactura, placeholder: "Digita el número de la factura" },
    { label: "Cantidad mínima dispensada:", id: "CantUnMinDis", type: "number", value: invoiceData.CantUnMinDis, placeholder: "Digita la cant mínima dispensada" },
    { label: "Valor unitario facturado:", id: "ValorUnitFacturado", type: "number", value: invoiceData.ValorUnitFacturado, placeholder: "Digita el valor unitario" },
    { label: "Cuota moderada:", id: "CuotaModer", type: "number", value: invoiceData.CuotaModer, placeholder: "Digita el valor de la cuota moderada" },
    { label: "Copago:", id: "Copago", type: "number", value: invoiceData.Copago, placeholder: "Digita el valor del copago" },
    { label: "Valor total facturado:", id: "ValorTotFacturado", type: "number", value: invoiceData.ValorTotFacturado, readOnly: true },
  ]
  return (
    <form onSubmit={handleOnSubmit} >
      <p>ID Entrega: {currentDireccionamiento.IDEntrega}</p>
      {alert && <Alert message={alert} />}
      <div className="grid grid-cols-2 gap-2">
        {invoiceFields.map((field, index) => (
          <Input
            key={field.id}
            {...field}
            onChange={handleOnChange}
            className="w-full py-2 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        ))}
      </div>
      <Button title="Facturar" />
    </form>
  );
}

export default InvoiceForm