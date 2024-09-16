"use client"
import { createContext, useContext, useState, useCallback } from "react";
import { useApiCall } from "@/hooks/useApiCall";
import showAlert from "@/services/alertSweet";

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const { fecthAdditionalData, fetchInvoiceData } = useApiCall()
    const [modalState, setModalState] = useState({
        isOpen: false,
        currentData: null,
        step: "delivery"
    })

    // Abri la modal
    const openModal = useCallback((data, step = "delivery") => {
        setModalState({ isOpen: true, currentData: data, step })
    }, [])

    // Cerrar la modal
    const closeModal = useCallback(() => {
        setModalState({ isOpen: false, currentData: null, step: null })
    }, [])

    // Tipo de formulario (entrega, facturación o reporte de entrega)
    const setModalStep = useCallback((step) => {
        setModalState(prevState => ({ ...prevState, step }))
    }, [])

    // Abrir la modal de facturación (automáticamente) luego de hacer una entrega exitosa
    const openModalInvoice = useCallback(async (direccionamiento) => {
        try {
            let additionalData = await fecthAdditionalData(direccionamiento.NoPrescripcion, direccionamiento.ID)
            let completeData = { ...direccionamiento, ...additionalData }
            openModal(completeData, "invoice")
        } catch (error) {
            console.error("Error al abrir la modal de facturación con la data adicional luego de hacer una entrega: ", error)
            showAlert("Error al cargar los datos para la facturación", "error")
        }
    }, [fecthAdditionalData, openModal])

    // Abrir la modal de reporte entrega (automáticamente) luego de hacer una facturación exitosa
    const openModalReport = useCallback(async (direccionamiento) => {
        try {
            let invoiceData = await fetchInvoiceData(direccionamiento.NoPrescripcion)
            // Filtrar los direccionamientos que cumplan la condición (servicio entregado)
            let invoice = invoiceData.filter((item) => item.CodSerTecAEntregado === direccionamiento.CodSerTecAEntregar)
            // Iterar sobre el array invoice y obtener el ValorTotFacturado  del direccionamiento
            let invoiceWithMatchingNoEntrega = invoice.find((item) => item.NoEntrega === direccionamiento.NoEntrega && item.EstFacturacion !== 0)
            let ValorTotFacturado = invoiceWithMatchingNoEntrega ? invoiceWithMatchingNoEntrega.ValorTotFacturado : null
            let completeDireccionamiento = { ...direccionamiento, ValorTotFacturado: ValorTotFacturado }
            openModal(completeDireccionamiento, "report")
        } catch (error) {
            console.error("Error al abrir la modal de facturación con la data adicional luego de hacer una entrega: ", error)
            showAlert("Error al cargar los datos para la facturación", "error")
        }
    }, [fetchInvoiceData, openModal])

    const value = {...modalState, openModal, closeModal, setModalStep, openModalInvoice, openModalReport}
    return (<ModalContext.Provider value={value} >{children}</ModalContext.Provider>)
}
export const useModal = () => useContext(ModalContext)