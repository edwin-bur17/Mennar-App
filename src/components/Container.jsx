"use client"
import { useSearchForm } from "@/context/searchFormContext";
import SearchForm from "./SearchForm";
import { documentTypeOptions } from "@/utils";
import ResultCardList from "./ResultCardList";

const SearchFormContainer = () => {

    const { startDate,
        endDate,
        documentType,
        documentNumber,
        prescriptionNumber,
        updateForm,
        handleSubmit,
    } = useSearchForm()

    // *************** CAMPOS (PROPS) DE CADA FORMULARIO ***************

    // Formulario búsqueda por rango de fecha
    const fieldsDateRange = [
        { id: 'startDate', label: 'Fecha Inicio:', type: 'date', value: startDate, },
        { id: 'endDate', label: 'Fecha Fin:', type: 'date', value: endDate, },
    ];

    // Formulario búsqueda por paciente mediante un rango de fecha
    const fieldsDatePatient = [
        { id: 'documentType', label: 'Tipo de documento:', type: 'select', value: documentType, options: documentTypeOptions, },
        { id: 'documentNumber', label: 'Número de documento:', type: 'number', placeholder: "Digita aquí el número", value: documentNumber, },
    ];

    // Formulario búsqueda por número de prescripción
    const fieldsPrescriptionNumber = [
        { id: 'prescriptionNumber', label: 'Número de prescripción:', type: 'number', placeholder: "Digita aquí el número", value: prescriptionNumber, },
    ];

    return (
        <>
            <div className="flex justify-between">
                <SearchForm
                    title="Por rango de fecha"
                    fields={fieldsDateRange}
                    onSubmit={(e) => handleSubmit(e, "dateRange")}
                    onChange={updateForm}
                />
                <SearchForm
                    title="Por fecha y paciente"
                    fields={fieldsDatePatient}
                    onSubmit={(e) => handleSubmit(e, "datePatient")}
                    onChange={updateForm}
                />
                <SearchForm
                    title="Por número de prescripción"
                    fields={fieldsPrescriptionNumber}
                    onSubmit={(e) => handleSubmit(e, "prescriptionNumber")}
                    onChange={updateForm}
                />
            </div>
            <ResultCardList/>
        </>
    )
}

export default SearchFormContainer