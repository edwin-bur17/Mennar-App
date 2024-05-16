"use client"
import { useSearchForm } from "@/hooks/useSearchForm";
import SearchForm from "./SearchForm";
import { useState } from "react";
import { documentTypeOptions } from "@/services/documentTypeOptions";
import ResultCardList from "./ResultCardList";

const SearchFormContainer = () => {
    // Estados para los campos del formulario
    const [startDate, setStartDate] = useState("") // Fecha de inicio
    const [endDate, setEndDate] = useState("") // Fecha fin
    const [documentType, setDocumentType] = useState(""); // Tipo de documento
    const [documentNumber, setDocumentNumber] = useState(""); // Número de documento
    const [prescriptionNumber, setPrescriptionNumber] = useState(""); // Número de prescripción

    const { // Destructuro el hook con los resultados del onChange en su respectivo handleChange, ademas de la data, loading e isSearch
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
        handleSelectAllNotNull,
        selected
    } = useSearchForm({ // Envío los estados (PROPS) al hook para hacer el onChange 
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
    });

    // *************** CAMPOS (PROPS) DE CADA FORMULARIO ***************

    // Formulario búsqueda por rango de fecha
    const fieldsDateRange = [
        {
            id: 'startDate',
            label: 'Fecha Inicio:',
            type: 'date',
            value: startDate,
            onChange: handleStartDateChange,
        },
        {
            id: 'endDate',
            label: 'Fecha Fin:',
            type: 'date',
            value: endDate,
            onChange: handleEndDateChange,
        },
    ];

    // Formulario búsqueda por paciente mediante un rango de fecha
    const fieldsDatePatient = [
        {
            id: 'documentType',
            label: 'Tipo de documento:',
            type: 'select',
            value: documentType,
            onChange: handleDocumentTypeChange,
            options: documentTypeOptions,
        },
        {
            id: 'documentNumber',
            label: 'Número de documento:',
            type: 'number',
            value: documentNumber,
            onChange: handleDocumentNumberChange,
        },
    ];

    // Formulario búsqueda por número de prescripción
    const fieldsPrescriptionNumber = [
        {
            id: 'prescriptionNumber',
            label: 'Número de prescripción:',
            type: 'number',
            value: prescriptionNumber,
            onChange: handlePrescriptionNumberChange,
        },
    ];

    return (
        <div>
            <div className="flex justify-between">
                <SearchForm
                    title="Por rango de fecha"
                    fields={fieldsDateRange}
                    onSubmit={handleSubmitDateRange}
                />
                <SearchForm
                    title="Por fecha y paciente"
                    fields={fieldsDatePatient}
                    onSubmit={handleSubmitDatePatient}
                    rangeStart={startDate}
                    rangeEnd={endDate}
                />
                <SearchForm
                    title="Por número de prescripción"
                    fields={fieldsPrescriptionNumber}
                    onSubmit={handleSubmitPrescriptionNumber}
                />
            </div>
            <ResultCardList 
            data={data} 
            loading={loading} 
            isSearch={isSearch}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllNotNull={handleSelectAllNotNull}
            selected={selected} 
            />
        </div>
    )
}

export default SearchFormContainer