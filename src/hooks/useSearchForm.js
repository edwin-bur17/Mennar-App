"use client"
import { useState } from "react";
import { useApiCall } from "./useApiCall";
import showAlert from "@/services/alertSweet";
import { useOnChangeCheckbox } from "./useOnChangeCheckbox";

export const useSearchForm = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    documentType,
    setDocumentType,
    documentNumber,
    setDocumentNumber,
    prescriptionNumber,
    setPrescriptionNumber,
}) => {
    // Estados para la petición y respuesta de la api
    const [data, setData] = useState([]) // Array de respuestas
    const [loading, setLoading] = useState(false) // Cargando
    const [isSearch, setIsSearch] = useState(false) // Búsqueda
    const [searchParams, setSearchParmas] = useState({})

    const { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion } = useApiCall() // Destructuración de las peticiones del hook 
    const {selected, setSelected, handleCheckboxChange, handleSelectAllAssets} = useOnChangeCheckbox()

    // *************** MANEJO DEL ONCHANGE PARA CADA INPUT ***************

    const handleStartDateChange = (e) => { setStartDate(e.target.value) } // Fecha de inicio

    const handleEndDateChange = (e) => { setEndDate(e.target.value) } // Fecha de fin

    const handleDocumentTypeChange = (e) => { setDocumentType(e.target.value) } // Tipo de documento

    const handleDocumentNumberChange = (e) => { setDocumentNumber(e.target.value) } // Número de documento

    const handlePrescriptionNumberChange = (e) => { setPrescriptionNumber(e.target.value) } // Número de prescripción

    // *************** ENVÍO DE LOS FORMULARIOS ***************

    // Formulario por rango de fecha
    const handleSubmitDateRange = async (e) => {
        e.preventDefault();
        if (startDate === '' || endDate === '') {
            showAlert("Todos los campos son obligatorios para rango de fecha", "error");
            return;
        }
        try {
            setLoading(true);
            setIsSearch(true);
            setSelected([])
            setData([])
            setSearchParmas({ startDate, endDate })
            const res = await fetchDireccionamientoFecha(startDate, endDate);
            if (res && typeof res === 'object') {
                setData(res);
                setStartDate('');
                setEndDate('');
            } else {
                showAlert(res, "error");
            }
        } catch (error) {
            console.log('Error al ejecutar la función de direccionamiento por fecha', error);
        } finally {
            setLoading(false);
        }
    };

    // Formulario por número de prescripción
    const handleSubmitPrescriptionNumber = async (e) => {
        e.preventDefault();
        if (prescriptionNumber === '') {
            showAlert("Todos los campos son obligatorios para número de prescripción", "error");
            return;
        }
        try {
            setLoading(true);
            setIsSearch(true);
            setSelected([])
            setData([])
            setSearchParmas({ prescriptionNumber })
            const res = await fetchDireccionamientoXPrescripcion(prescriptionNumber);
            setData(res);
            setPrescriptionNumber('');
        } catch (error) {
            console.log('Error al intentar buscar direccionamiento por número de prescripción: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Formulario por paciente mediante un rango de fecha
    const handleSubmitDatePatient = async (e) => {
        e.preventDefault();
        if (documentType === "" || documentNumber === "" || startDate === "" || endDate === "") {
            showAlert("Todos los campos son obligatorios para paciente", "error");
            return;
        }
        try {
            setLoading(true);
            setIsSearch(true);
            setSelected([])
            setData([])
            setSearchParmas({ startDate, endDate, documentType, documentNumber })
            const res = await fetchDireccionamientoFecha(startDate, endDate, documentType, documentNumber);
            if (res && typeof res === 'object') {
                setData(res);
                setStartDate('');
                setEndDate('');
                setDocumentType('');
                setDocumentNumber('');
            } else {
                showAlert(res, "error");
            }
        } catch (error) {
            console.log('Error al intentar buscar direccionamiento paciente por fecha: ', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleStartDateChange,
        handleEndDateChange,
        handleDocumentTypeChange,
        handleDocumentNumberChange,
        handlePrescriptionNumberChange,
        handleSubmitDateRange,
        handleSubmitPrescriptionNumber,
        handleSubmitDatePatient,
        data,
        setData,
        loading,
        isSearch,
        handleCheckboxChange,
        handleSelectAllAssets,
        selected,
        setSelected,
        searchParams
    }
}