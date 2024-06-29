"use client"
import { createContext, useContext, useReducer, useCallback } from "react"
import { useApiCall } from "@/hooks/useApiCall"
import showAlert from "@/services/alertSweet"
import { useOnChangeCheckbox } from "@/hooks/useOnChangeCheckbox"

// Crear el context 
const SearchFormContext = createContext()

// Estados Iniciales
const initialState = {
    formData: { // Formulario de búsqueda
        startDate: "",
        endDate: "",
        documentType: "",
        documentNumber: "",
        prescriptionNumber: "",
    },
    searchResults: { // estados de la búsqueda
        data: [],
        loading: false,
        isSearch: false,
        searchParams: {},
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FORM": // Actualizar los inputs del formulario
            return { ...state, formData: { ...state.formData, [action.field]: action.value } }
        case "RESET_FORM": // Setear (limpiar) el formulario
            return { ...state, formData: initialState.formData };
        case "SET_SEARCH_RESULTS": // 
            return { ...state, searchResults: { ...state.searchResults, ...action.payload } };
        default:
            return state
    }
}

export const SearchFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { fecthByPrescriptionNumber, fetchByDate } = useApiCall()
    const { selected, setSelected, handleCheckboxChange, handleSelectAllAssets } = useOnChangeCheckbox()

    // Actualizar (los valores) de los inputs del formulario
    const updateForm = useCallback((field, value) => {
        dispatch({ type: "UPDATE_FORM", field, value })
    }, [])

    // Limpiar formulario
    const resetForm = useCallback(() => {
        dispatch({ type: "RESET_FORM" })
    }, [])

    // Actualizar los estados del resultado de la búsqueda
    const setSearchResults = useCallback((results) => {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    }, [])

    // Validar los campos del formulario
    const validateFields = useCallback((fields) => {
        return fields.every(field => state.formData[field] !== "")
    }, [state.formData])


    // Envío del formulario
    const handleSubmit = useCallback(async (e, type) => {
        e.preventDefault()
        const { startDate, endDate, documentType, documentNumber, prescriptionNumber } = state.formData;

        let isValid = false
        let searchParams = {}
        let fetchFunction;

        switch (type) {
            case "dateRange":
                console.log("switch en rango de fecha")
                isValid = validateFields(["startDate", "endDate"])
                searchParams = { startDate, endDate }
                fetchFunction = () => fetchByDate(startDate, endDate)
                break;
            case "datePatient":
                console.log("switch en paciente fecha")
                isValid = validateFields(["startDate", "endDate", "documentType", "documentNumber"])
                searchParams = { startDate, endDate, documentType, documentNumber }
                fetchFunction = () => fetchByDate(startDate, endDate, documentType, documentNumber)
                break;

            case "prescriptionNumber":
                console.log("switch en número de prescripción")
                isValid = validateFields(["prescriptionNumber"])
                searchParams = { prescriptionNumber }
                fetchFunction = () => fecthByPrescriptionNumber(prescriptionNumber)
                break;
            default:
                console.log("Tipo de búsqueda no reconocido: ", type)
                return
        }

        if (!isValid) { // Validación de los campos
            showAlert("Todos los campos son obligatorios", "error")
            return
        }

        try {
            setSearchResults({ loading: true, isSearch: true, data: [], searchParams });
            setSelected([])

            if (typeof fetchFunction !== "function") { // Validar si es una función 
                throw new Error(`fetchFunction no es una función válida para el tipo: ${type}`)
            }
            const res = await fetchFunction()
            if (res && typeof res === "object") {
                setSearchResults({ data: res, loading: false })
                resetForm()
            } else {
                setSearchResults({ loading: false })
                showAlert(res, "error")
            }
            console.log("respuesta de la api: ", res)
        } catch (error) {
            console.log("Error al ejecutar una búsqueda, (desde el context): ", error)
            setSearchResults({ loading: false })
        }

    }, [state.formData, fetchByDate, fecthByPrescriptionNumber, setSelected, validateFields, resetForm, setSearchResults])

    // Actualizar la data despues de programar los direccionamientos
    const updateDataAfterProgramming = useCallback(async (programmedIds) => {
        const { searchParams } = state.searchResults

        // Actualiza los datos localmente
        const updatedData = data.map(item =>
            programmedIds.includes(item.id) ? { ...item, status: 'programmed' } : item
        );

        // Actualiza el estado con los datos modificados inmediatamente
        setSearchResults(prevState => ({ ...prevState, data: updatedData }));

        let fetchFunction
        if (searchParams.prescriptionNumber) {
            console.log("actualizando data por número d eprescripción")
            fetchFunction = () => fecthByPrescriptionNumber(searchParams.prescriptionNumber)
        } else if (searchParams.documentType && searchParams.documentNumber) {
            console.log("actualizando data por paciente fecha")
            fetchFunction = () => fetchByDate(searchParams.startDate, searchParams.endDate, searchParams.documentType, searchParams.documentNumber);
        } else {
            console.log("actualizando data por rango de fecha")
            fetchFunction = () => fetchByDate(searchParams.startDate, searchParams.endDate);
        }

        try {
            setSearchResults(prevState => ({ ...prevState, loading: true }));
            const freshData = await fetchFunction();
            console.log(typeof (freshData))
            console.log("data actualizada: ", freshData)
            if (freshData && typeof freshData === "object") {
                // Combina los datos frescos con el estado actualizado localmente
                const finalData = freshData.map(item => {
                    const localItem = updatedData.find(localItem => localItem.id === item.id);
                    return localItem || item;
                });

                setSearchResults(prevState => ({ ...prevState, data: finalData, loading: false }));
            } else {
                setSearchResults({ loading: false });
                showAlert("Error al actualizar los datos", "error");
            }
        } catch (error) {
            console.error("Error al actualizar los datos después de la programación:", error);
            setSearchResults({ loading: false });
            showAlert("Error al actualizar los datos despues de programarlos", "error");
        }
    }, [state.searchResults, setSearchResults, fecthByPrescriptionNumber, fetchByDate])

    const value = {
        ...state.formData,
        ...state.searchResults,
        updateForm,
        handleSubmit,
        selected,
        setSelected,
        handleSelectAllAssets,
        handleCheckboxChange,
        updateDataAfterProgramming
    }

    return (
        <SearchFormContext.Provider value={value}>
            {children}
        </SearchFormContext.Provider>
    )
}
export const useSearchForm = () => {
    const context = useContext(SearchFormContext)
    if (!context) {
        throw new Error("useSearchForm debe utilizarse dentro de un SearchFormProvider")
    }
    return context
}