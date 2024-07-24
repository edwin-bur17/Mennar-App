"use client"
import { useModule } from "./moduleContext"
import { createContext, useContext, useReducer, useCallback, useMemo } from "react"
import { apiCall } from "@/api/apiCall"
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
        searchModule: null,
        totalItems: 0
    },
    modalDelivery: {
        isModalOpen: false,
        currentDireccionamiento: null
    },
    completeDireccionamientos: {},
    currentPage: 1,
    itemsPerPage: 10
}

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FORM": // Actualizar los inputs del formulario
            return { ...state, formData: { ...state.formData, [action.field]: action.value } }
        case "RESET_FORM": // Setear (limpiar) el formulario
            return { ...state, formData: initialState.formData };
        case "SET_SEARCH_RESULTS": // 
            return { ...state, searchResults: { ...state.searchResults, ...action.payload } };
        case "UPDATE_COMPLETE_DIRECCIONAMIENTO":
            return { ...state, completeDireccionamientos: { ...state.completeDireccionamientos, [action.payload.ID]: action.payload } }
        case "SET_PAGE":
            return { ...state, currentPage: action.payload }
        case "OPEN_MODAL":
            return { ...state, modalDelivery: { isModalOpen: true, currentDireccionamiento: action.payload } }
        case "CLOSE_MODAL":
            return { ...state, modalDelivery: { isModalOpen: false, currentDireccionamiento: null } }
        default:
            return state
    }
}

export const SearchFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { fecthByPrescriptionNumber, fetchByDate, fecthAdditionalData } = apiCall()
    const { selected, setSelected, handleCheckboxChange, handleSelectAllAssets } = useOnChangeCheckbox()
    const { currentModule } = useModule()

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

    // Actualizar el direccionamiento con la data faltante para facturar
    const updateCompleteDireccionamiento = useCallback((direccionamiento) => {
        dispatch({ type: 'UPDATE_COMPLETE_DIRECCIONAMIENTO', payload: direccionamiento })
    }, [])

    // Actualizar la página actual
    const setPage = useCallback((page) => {
        dispatch({ type: 'SET_PAGE', payload: page })
    }, [])

    // Validar los campos del formulario
    const validateFields = useCallback((fields) => {
        return fields.every(field => state.formData[field] !== "")
    }, [state.formData])

    // Abrir modal entrega
    const openModal = (direccionamiento) => {
        if (direccionamiento && typeof direccionamiento === "object") {
            dispatch({ type: "OPEN_MODAL", payload: direccionamiento })
        } else {
            console.error("Intento de abrir la modal inválido", direccionamiento)
        }
    }

    // Cerrar modal entrega
    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" })
    }

    // Completar el direccionamiento con la data faltante
    const fetchCompleteDireccionamiento = useCallback(async (direccionamiento) => {
        try {
            const additionalData = await fecthAdditionalData(direccionamiento.NoPrescripcion, direccionamiento.ID)
            const completeDireccionamiento = { ...direccionamiento, ...additionalData }
            updateCompleteDireccionamiento(completeDireccionamiento)
            return completeDireccionamiento
        } catch (error) {
            console.error("Error al obtener datos completos del direccionamiento:", error)
            return direccionamiento
        }
    }, [fecthAdditionalData, updateCompleteDireccionamiento])

    // Abrir la modal de facturación (automáticamente) luego de hacer una entrega exitosa
    const openModalInvoice = useCallback(async (direccionamiento) => {
        try {
            const completeData = await fetchCompleteDireccionamiento(direccionamiento)
            dispatch({ type: "OPEN_MODAL", payload: completeData })
        } catch (error) {
            console.error("Error al abrir la modal de facturación con la data adicional luego de hacer una entrega: ", error)
            showAlert("Error al cargar los datos para la facturación", "error")
        }
    }, [fetchCompleteDireccionamiento])
    
    // Envío del formulario
    const handleSubmit = useCallback(async (e, type) => {
        e.preventDefault()
        const { startDate, endDate, documentType, documentNumber, prescriptionNumber } = state.formData;

        let isValid = false
        let searchParams = {}
        let fetchFunction;

        switch (type) {
            case "dateRange":
                isValid = validateFields(["startDate", "endDate"])
                searchParams = { startDate, endDate }
                fetchFunction = () => fetchByDate(startDate, endDate)
                break;
            case "datePatient":
                isValid = validateFields(["startDate", "endDate", "documentType", "documentNumber"])
                searchParams = { startDate, endDate, documentType, documentNumber }
                fetchFunction = () => fetchByDate(startDate, endDate, documentType, documentNumber)
                break;

            case "prescriptionNumber":
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
            setSearchResults({ loading: true, isSearch: true, data: [], searchParams, searchModule: currentModule });
            setSelected([])
            setPage(1) // Reiniciar a la primera página luego de hacer una nueva búsquedaa
            if (typeof fetchFunction !== "function") { // Validar si es una función 
                throw new Error(`fetchFunction no es una función válida para el tipo: ${type}`)
            }
            const res = await fetchFunction()
            if (res && typeof res === "object") {
                setSearchResults({ data: res, loading: false, totalItems: res.length, isSearch: true, searchParams, searchModule: currentModule })
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

    }, [state.formData, fetchByDate, fecthByPrescriptionNumber, setSelected, validateFields, resetForm, setSearchResults, state.totalItems])

    // Actualizar la data 
    const updateData = useCallback(async () => {
        const { searchParams } = state.searchResults
        let fetchFunction

        if (searchParams.prescriptionNumber) {
            fetchFunction = () => fecthByPrescriptionNumber(searchParams.prescriptionNumber)
        } else if (searchParams.documentType && searchParams.documentNumber) {
            fetchFunction = () => fetchByDate(searchParams.startDate, searchParams.endDate, searchParams.documentType, searchParams.documentNumber);
        } else {
            fetchFunction = () => fetchByDate(searchParams.startDate, searchParams.endDate);
        }

        if (typeof fetchFunction !== "function") { // Validar si es una función 
            throw new Error(`fetchFunction no es una función válida`)
        }

        try {
            setSearchResults({ loading: true })
            const freshData = await fetchFunction();
            if (freshData && typeof freshData === "object") {
                setSearchResults({ data: freshData, loading: false })
            } else {
                setSearchResults({ loading: false })
                showAlert("Error al actualizar los datos", "error");
            }
        } catch (error) {
            console.error("Error al actualizar los datos después de la programación:", error);
            setSearchResults({ loading: false });
            showAlert("Error al actualizar la data", "error");
        }
    }, [state.searchResults, setSearchResults])

    // Paginación
    const paginatedData = useMemo(() => {
        const { data } = state.searchResults
        const startIndex = (state.currentPage - 1) * state.itemsPerPage
        return data.slice(startIndex, startIndex + state.itemsPerPage)
    }, [state.searchResults.data, state.currentPage, state.itemsPerPage])

    const value = {
        ...state,
        ...state.formData,
        ...state.searchResults,
        ...state.modalDelivery,
        updateForm,
        handleSubmit,
        selected,
        setSelected,
        handleSelectAllAssets,
        handleCheckboxChange,
        updateData,
        openModal,
        closeModal,
        paginatedData,
        fetchCompleteDireccionamiento,
        setPage,
        openModalInvoice
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