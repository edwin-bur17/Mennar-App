import { useSearchForm } from "@/context/searchFormContext"
import axios from "axios"
import { useState } from "react"
import { typeOptions } from "@/utils/documentTypeOptions"
import { getNameProduct } from "@/utils/getName"
import showAlert from "@/services/alertSweet"
import { Button, Alert, Input } from "./ui/ui"
const DeliveryForm = () => {
    const { closeModal, currentDireccionamiento, updateData, openModalInvoice } = useSearchForm()
    const { ID, CodSerTecAEntregar, CantTotAEntregar } = currentDireccionamiento
    const [formData, setFormData] = useState({
        ID: ID,
        CodSerTecEntregado: CodSerTecAEntregar,
        CantTotEntregada: "",
        EntTotal: 1,
        CausaNoEntrega: 0,
        FecEntrega: "",
        NoLote: "",
        TipoIDRecibe: "",
        NoIDRecibe: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState("")

    const validateFields = () => { // Validar los campos 
        if (Number(formData.CantTotEntregada) > Number(CantTotAEntregar)) {
            setAlert("La cantidad entregada no puede ser mayor que la cantidad a entregar")
            return false
        }
        return Object.values(formData).every(value => value !== "" && value !== null && value !== undefined);
    };

    const handleChange = (e) => { // Manejo del cambio en los inputs
        const { id, value } = e.target
        if (id === 'CantTotEntregada') {
            const numValue = Number(value)
            if (numValue > Number(CantTotAEntregar)) {
                setAlert("La cantidad entregada no puede ser mayor que la cantidad a entregar")
                return
            }
        }
        if (id === 'NoIDRecibe') {
            if (value.length > 10) {
                setAlert("El número de identificación no puede tener más de 10 dígitos")
                return
            }
        }
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }))
        setAlert("")
    }

    const handleSubmit = async (e) => { // Envío del formulario
        e.preventDefault()
        if (!validateFields()) {
            setAlert("Todos los campos son obligatorios para hacer la entrega")
            return
        }
        try {
            setIsLoading(true)
            const res = await axios.put("/api/direccionamiento/entrega", { formData })
            await new Promise(resolve => setTimeout(resolve, 1200))
            await updateData()
            closeModal()
            showAlert(res.data.message, "success")
            await openModalInvoice(currentDireccionamiento)
        } catch (error) {
            if (error.response && error.response.status === 422) {
                showAlert("Error al hacer la entrega, revisa la alerta", "error")
                setAlert(error.response.data.details)
            } else {
                console.error("Error en la solicitud:", error.response?.data || error.message);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const formFields = [ //Campos del formulario
        { label: "Código servicio a entregar:", id: "CodSerTecAEntregar", type: "text", value: `${CodSerTecAEntregar} - ${getNameProduct(CodSerTecAEntregar)}`, readOnly: true },
        { label: "Cantidad Total a entregar:", id: "CantTotAEntregar", type: "text", value: CantTotAEntregar, readOnly: true },
        { label: "Cantidad entregada:", id: "CantTotEntregada", type: "number", value: formData.CantTotEntregada, placeholder: "Digita la cantidad entregada", max: CantTotAEntregar },
        { label: "Fecha de Entrega:", id: "FecEntrega", type: "date", value: formData.FecEntrega },
        { label: "Número de lote:", id: "NoLote", type: "number", value: formData.NoLote, placeholder: "Digita el número del lote" },
        { label: "Tipo de Identificación:", id: "TipoIDRecibe", type: "select", value: formData.TipoIDRecibe, options: typeOptions },
        { label: "Número de Identificación:", id: "NoIDRecibe", type: "number", value: formData.NoIDRecibe, maxLength: 10, placeholder: "Digita el número de identificación" },
    ];
    return (
        <form onSubmit={handleSubmit}>
            {alert && <Alert message={alert} />}
            <div className="grid grid-cols-2 gap-3">
                {formFields.map((field, index) => (
                    <Input
                        key={field.id}
                        {...field}
                        onChange={handleChange}
                        colSpan={index === 0 ? "col-span-2" : ""}
                        className="w-full py-2 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                ))}
            </div>
            <Button isLoading={isLoading} title="Entregar" />
        </form>
    )
}

export default DeliveryForm