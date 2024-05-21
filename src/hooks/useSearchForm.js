"use client"
import { useState } from "react";
import { useApiCall } from "./useApiCall";
import showAlert from "@/services/alertSweet";

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
    const [selected, setSelected] = useState([]) // Array para almacenar los direccionamientos (objetos) seleccionados 

    const { fetchDireccionamientoFecha, fetchDireccionamientoXPrescripcion } = useApiCall() // Destructuración de las peticiones del hook 

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
            const res = await fetchDireccionamientoFecha(startDate, endDate);
            if (res && typeof res === 'object') {
                setData(res);
                setStartDate('');
                setEndDate('');
            } else {
                showAlert(res);
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
        if (documentType === '' || documentNumber === '') {
            showAlert("Todos los campos son obligatorios para paciente", "error");
            return;
        }
        try {
            setLoading(true);
            setIsSearch(true);
            setSelected([])
            const res = await fetchDireccionamientoFecha(startDate, endDate, documentType, documentNumber);
            if (res && typeof res === 'object') {
                setData(res);
                setStartDate('');
                setEndDate('');
                setDocumentType('');
                setDocumentNumber('');
            } else {
                showAlert(res);
            }
        } catch (error) {
            console.log('Error al intentar buscar direccionamiento paciente por fecha: ', error);
        } finally {
            setLoading(false);
        }
    };

    // MANEJO DE CAMBIO EN LOS CHECKBOXS PARA SELECCIONAR LOS DIRECCIONAMIENTOS

    // Actualizar el estado selected, dependiendo del cambio en los checbox de cada direccionamiento
    const handleCheckboxChange = (direccionamiento) => {
        // Crear el direccionamiento que será enviado en la petición
        const programmingDireccionamiento = {
            ID: direccionamiento.ID,
            FecMaxEnt: direccionamiento.FecMaxEnt,
            TipoIDSedeProv: direccionamiento.TipoIDProv,
            NoIDSedeProv: direccionamiento.NoIDProv,
            CodSedeProv: "PROV000762",
            CodSerTecAEntregar: direccionamiento.CodSerTecAEntregar,
            CantTotAEntregar: direccionamiento.CantTotAEntregar
        }

        // Verificar si el direccionamiento está anulado o previamente programado
        const isNull = direccionamiento.EstDireccionamiento === 0
        const isProgramming = direccionamiento.EstDireccionamiento === 2

        if (!isNull && !isProgramming) {
             // Si el direccionamiento ya se encuentra en el array selected, lo quita. (deseleccionar el checkbox)
            if (selected.some(item => item.ID === programmingDireccionamiento.ID)) {
                setSelected(selected.filter(item => item.ID !== programmingDireccionamiento.ID))
            } else {
                // Si no está en el array selected, lo agrega. (seleccionar el checkbox)
                setSelected([...selected, programmingDireccionamiento])
            }
        }
    }

    // Seleccionar o deseleccionar todos los direccionamientos que no estén anulados
    const handleSelectAllAssets = (direccionamientos) => {
        // Filtrar el array direccionamientos y crear otro solo con los que esten activos (sin los anulados y los ya programados)
        const direccionamientosAssets = direccionamientos.filter((direccionamiento) => direccionamiento.EstDireccionamiento !== 0 && direccionamiento.EstDireccionamiento !== 2)

        // Crear el objeto direccionamiento (con base en el array de los activos) el cual será enviado en la petición
        const programmingDireccionamientos = direccionamientosAssets.map(direccionamiento => ({
            ID: direccionamiento.ID,
            FecMaxEnt: direccionamiento.FecMaxEnt,
            TipoIDSedeProv: direccionamiento.TipoIDProv,
            NoIDSedeProv: direccionamiento.NoIDProv,
            CodSedeProv: "PROV000762",
            CodSerTecAEntregar: direccionamiento.CodSerTecAEntregar,
            CantTotAEntregar: direccionamiento.CantTotAEntregar
        }))
        if (selected.length === programmingDireccionamientos.length) { // Si todos están seleccionados, los deselecciona.
            setSelected([])
        } else { // si no los selecciona.
            setSelected(programmingDireccionamientos)
        }
    }

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
        loading,
        isSearch,
        handleCheckboxChange,
        handleSelectAllAssets,
        selected
    }
}