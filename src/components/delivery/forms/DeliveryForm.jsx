import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext"
import axios from "axios"
import { useState } from "react"
import { getNameProduct, typeOptions, validateFields } from "@/utils"
import showAlert from "@/services/alertSweet"
import { Button, Alert, Input } from "./ui/ui"

const DeliveryForm = () => {
    const { updateData } = useSearchForm()
    const { closeModal, currentData, openModalInvoice } = useModal()
    const { ID, CodSerTecAEntregar, CantTotAEntregar } = currentData
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
    const [errors, setErrors] = useState({})

    const validateFormFields = () => { // validar los campos
        const { isValid, errors } = validateFields(formData, currentData)
        setErrors(errors);
        return isValid;
    }

    const handleChange = (e) => { // Manejo del onChange para los inputs
        const { id, value } = e.target
        setFormData(prevData => ({ ...prevData, [id]: value, }))
        setErrors(prevErrors => ({ ...prevErrors, [id]: undefined }))
        switch (id) { // Validaciones extras para determinados campos
            case "CantTotEntregada":
                if (Number(value) > Number(CantTotAEntregar)) {
                    setErrors(prevErrors => ({
                        ...prevErrors, CantTotEntregada: `La cantidad entregada no puede ser mayor a ${CantTotAEntregar}`
                    }))
                }
                break;
            case "NoIDRecibe":
                if (value.length > 15) {
                    setErrors(prevErrors => ({ 
                        ...prevErrors, NoIDRecibe: "El número de identificación no puede tener más de 15 dígitos" 
                    }))
                }
                break;
            default:
                break;
        }
        if (Object.values(errors).every(value => value === undefined)){ setAlert("") }
    }

    const handleSubmit = async (e) => { // Envío del formulario
        e.preventDefault()
        if (!validateFormFields()) {
            setAlert("Por favor, corrige los errores antes de enviar el formulario")
            return
        }
        try {
            setIsLoading(true)
            const res = await axios.put("/api/direccionamiento/entrega", { formData })
            await new Promise(resolve => setTimeout(resolve, 1200))
            await updateData()
            closeModal()
            showAlert(res.data.message, "success")
            await openModalInvoice(currentData)
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

    const formFields = [// Campos de renderizado
        { label: "Código servicio a entregar:", id: "CodSerTecAEntregar", type: "text", value: `${CodSerTecAEntregar} - ${getNameProduct(CodSerTecAEntregar)}`, readOnly: true },
        { label: "Cantidad Total a entregar:", id: "CantTotAEntregar", type: "text", value: CantTotAEntregar, readOnly: true },
        { label: "Cantidad entregada:", id: "CantTotEntregada", type: "number", value: formData.CantTotEntregada, placeholder: "Digita la cantidad entregada" },
        { label: "Fecha de Entrega:", id: "FecEntrega", type: "date", value: formData.FecEntrega },
        { label: "Número de lote:", id: "NoLote", type: "text", value: formData.NoLote, placeholder: "Digita el número del lote" },
        { label: "Tipo de Identificación:", id: "TipoIDRecibe", type: "select", value: formData.TipoIDRecibe, options: typeOptions },
        { label: "Número de Identificación:", id: "NoIDRecibe", type: "number", value: formData.NoIDRecibe, placeholder: "Digita el número de identificación" },
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
                        error={errors[field.id]}
                    />
                ))}
            </div>
            <Button isLoading={isLoading} title="Entregar" />
        </form>
    )
}

export default DeliveryForm