import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchForm } from "@/context/searchFormContext";
import { useModal } from "@/context/modalContext";
import { Input, Button, Alert } from "./ui/ui"
import { totalInvoiceValue, formatCOP, unformatCOP, validateFields } from "@/utils"
import showAlert from "@/services/alertSweet";

export const InvoiceForm = () => {
  const { updateData } = useSearchForm()
  const { closeModal, currentData, openModalReport } = useModal()
  const { NoPrescripcion, TipoTec, ConTec, TipoIDPaciente, NoIDPaciente, NoEntrega, CodSerTecAEntregar, NoSubEntrega, NoIDEPS, CodEPS, CantidadEntregada } = currentData
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
    CantUnMinDis: CantidadEntregada,
    ValorUnitFacturado: "",
    ValorTotFacturado: "0",
    CuotaModer: "",
    Copago: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState("")
  const [errors, setErrors] = useState({})

  const formatMonetaryField = (value) => { // Formatear a formato moneda - COP
    return ["ValorUnitFacturado", "CuotaModer", "Copago", "ValorTotFacturado"].includes(value) ? formatCOP(invoiceData[value]) : invoiceData[value];
  };

  const validateFormFields = () => { // Validar los campos
    const { isValid, errors } = validateFields(invoiceData);
    setErrors(errors);
    return isValid;
  }

  useEffect(() => { // Manejo del onChange del cálculo de ValorTotFacturado
    setInvoiceData(prevData => ({
      ...prevData,
      ValorTotFacturado: totalInvoiceValue(
        prevData.CantUnMinDis,
        prevData.ValorUnitFacturado,
        prevData.CuotaModer,
        prevData.Copago)
    }))
  }, [invoiceData.CantUnMinDis, invoiceData.ValorUnitFacturado, invoiceData.CuotaModer, invoiceData.Copago])

  const handleOnChange = (e) => { // Manejo del onChange de los inputs
    const { id, value } = e.target
    let newValue = ["ValorUnitFacturado", "CuotaModer", "Copago"].includes(id) ? unformatCOP(value) : value
    setInvoiceData(prevData => ({
      ...prevData, [id]: newValue,
      ...(id === "CuotaModer" && value !== "" ? { Copago: "0" } : {}),
      ...(id === "Copago" && value !== "" ? { CuotaModer: "0" } : {})
    }))
    setErrors(prevErrors => ({ ...prevErrors, [id]: undefined }))
    if (id === "CuotaModer" && value !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, Copago: undefined }));
    } else if (id === "Copago" && value !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, CuotaModer: undefined }));
    }
    if (Object.values(errors).every(value => value === undefined)) { setAlert("") }
  }

  const handleOnSubmit = async (e) => { // Envío del formulario 
    e.preventDefault()
    if (!validateFormFields()) {
      setAlert("Por favor, corrige los errores antes de enviar el formulario")
      return
    }
    try {
      setIsLoading(true)
      const res = await axios.put("/api/direccionamiento/facturar", { invoiceData })
      await new Promise(resolve => setTimeout(resolve, 1200))
      await updateData()
      closeModal()
      showAlert(res.data.message, "success")
      openModalReport(currentData)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setAlert(error.response.data.details)
      } else {
        console.error("Error en la solicitud (facturar un direccionamiento):", error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false)
    }
  }

  const invoiceFields = [ // Campos del formulario
    { label: "Número de prescripción:", id: "NoPrescripcion", type: "text", value: NoPrescripcion, readOnly: true },
    { label: "Número de entrega:", id: "NoEntrega", type: "text", value: NoEntrega, readOnly: true },
    { label: "Número de factura:", id: "NoFactura", type: "text", value: invoiceData.NoFactura, placeholder: "Digita el número de la factura" },
    { label: "Cantidad mínima dispensada:", id: "CantUnMinDis", type: "number", value: invoiceData.CantUnMinDis, readOnly: true },
    { label: "Valor unitario facturado:", id: "ValorUnitFacturado", type: "text", value: invoiceData.ValorUnitFacturado, placeholder: "Digita el valor unitario" },
    { label: "Cuota moderada:", id: "CuotaModer", type: "text", value: invoiceData.CuotaModer, placeholder: "Digita el valor de la cuota moderada" },
    { label: "Copago:", id: "Copago", type: "text", value: invoiceData.Copago, placeholder: "Digita el valor del copago" },
    { label: "Valor total facturado:", id: "ValorTotFacturado", type: "text", value: invoiceData.ValorTotFacturado, readOnly: true },
  ]
  return (
    <form onSubmit={handleOnSubmit} >
      {alert && <Alert message={alert} />}
      <div className="grid grid-cols-2 gap-2">
        {invoiceFields.map((field) => (
          <Input
            key={field.id}
            {...field}
            value={formatMonetaryField(field.id)}
            onChange={handleOnChange}
            error={errors[field.id]}
          />
        ))}
      </div>
      <Button isLoading={isLoading} title="Facturar" />
    </form>
  )
}
export default InvoiceForm