"use client"
import { useModule } from "./moduleContext"
import { createContext, useContext, useReducer, useCallback, useMemo } from "react"
import { useApiCall } from "@/hooks/useApiCall"
import showAlert from "@/services/alertSweet"
import { useOnChangeCheckbox } from "@/hooks/useOnChangeCheckbox"
import { usePagination } from "./paginationContext"

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
    completeDireccionamientos: {},
    deliveryStatus: {},
    invoiceStatus: {},
    deliveryReportStatus: {},
}

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FORM": // Actualizar los inputs del formulario
            return { ...state, formData: { ...state.formData, [action.field]: action.value } }
        case "RESET_FORM": // Setear (limpiar) el formulario
            return { ...state, formData: initialState.formData };
        case "SET_SEARCH_RESULTS": // 
            return { ...state, searchResults: { ...state.searchResults, ...action.payload } };
        case "UPDATE_COMPLETE_DIRECCIONAMIENTO": // Completar el direccionamiento 
            return { ...state, completeDireccionamientos: { ...state.completeDireccionamientos, [action.payload.ID]: action.payload } }
        case "RESET_COMPLETE_DIRECCIONAMIENTOS":
            return { ...state, completeDireccionamientos: {} }
        case "UPDATE_DELIVERY_STATUS": // Verificar estado del direccionamiento: entregado
            return { ...state, deliveryStatus: { ...state.deliveryStatus, ...action.payload } }
        case "UPDATE_INVOICE_STATUS": // Verificar estado del direccionamiento: facturado
            return { ...state, invoiceStatus: { ...state.invoiceStatus, ...action.payload } }
        case "UPDATE_DELIVERY_REPORT_STATUS": // Verificar estado del direccionamiento: reportada la entrega
            return { ...state, deliveryReportStatus: { ...state.deliveryReportStatus, ...action.payload } }
        default:
            return state
    }
}

export const SearchFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { fecthByPrescriptionNumber, fetchByDate, fecthAdditionalData, fetchInvoiceData } = useApiCall()
    const { selected, setSelected, handleCheckboxChange, handleSelectAllAssets } = useOnChangeCheckbox()
    const { currentModule } = useModule()
    const { currentPage, itemsPerPage, setPage: setPaginationPage, getPaginatedData } = usePagination();

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

    // Completar el direccionamiento con la data faltante
    const fetchCompleteDireccionamiento = useCallback(async (direccionamiento) => {
        try {
            const [additionalData, invoiceData, deliveryReportData] = await Promise.all([
                fecthAdditionalData(direccionamiento.NoPrescripcion, direccionamiento.ID),
                fetchInvoiceData(direccionamiento.NoPrescripcion),
                fecthByPrescriptionNumber(direccionamiento.NoPrescripcion, "reporteEntrega"),
            ])
            // Filtrar los direccionamientos que cumplan la condición (servicio entregado)
            let invoice = invoiceData.filter((item) => item.CodSerTecAEntregado === direccionamiento.CodSerTecAEntregar)
            // Iterar sobre el array invoice y obtener los valores deseados de facturación 
            let invoiceWithMatchingNoEntrega = invoice.find((item) => item.NoEntrega === direccionamiento.NoEntrega && item.EstFacturacion !== 0)
            let ValorTotFacturado = invoiceWithMatchingNoEntrega ? invoiceWithMatchingNoEntrega.ValorTotFacturado : null
            let FecFacturacion = invoiceWithMatchingNoEntrega ? invoiceWithMatchingNoEntrega.FecFacturacion : null
            let IdFacturacion = invoiceWithMatchingNoEntrega ? invoiceWithMatchingNoEntrega.IDFacturacion : null
            // Obtener el id reporte de entrega
            let deliveryReport = deliveryReportData.find((item) => item.ID === direccionamiento.ID && item.EstRepEntrega !== 0)
            let IDReporteEntrega = deliveryReport ? deliveryReport.IDReporteEntrega : null
        
            const completeDireccionamiento = {
                ...direccionamiento,
                ...additionalData,
                ValorTotFacturado: ValorTotFacturado,
                FecFacturacion: FecFacturacion,
                IdFacturacion: IdFacturacion,
                IdReporteEntrega: IDReporteEntrega,
            }
            dispatch({ type: 'UPDATE_COMPLETE_DIRECCIONAMIENTO', payload: completeDireccionamiento })
        } catch (error) {
            console.error("Error al obtener datos completos del direccionamiento:", error)
            return direccionamiento
        }
    }, [fecthAdditionalData, fetchInvoiceData, dispatch, fecthByPrescriptionNumber])

    // Verificar el estado de los direccionamientos listados en la data de la paginación actual
    const checkStatus = useCallback(async (direccionamientos) => {
        await Promise.all(direccionamientos.map(async (direccionamiento) => {
            try { // Hacer las peticiones a la api para saber los diferentes estados del direccionamiento
                const [invoiceData, deliveryReportData, deliveryData] = await Promise.all([
                    fetchInvoiceData(direccionamiento.NoPrescripcion, direccionamiento.CodSerTecAEntregar),
                    fecthByPrescriptionNumber(direccionamiento.NoPrescripcion, "reporteEntrega"),
                    fecthByPrescriptionNumber(direccionamiento.NoPrescripcion, "entregaTrue")
                ]);

                // Buscar y filtrar los datos de acuerdo a cada direccionamiento
                let invoice = invoiceData.filter((item) => item.CodSerTecAEntregado === direccionamiento.CodSerTecAEntregar);
                let deliveryReport = deliveryReportData.find((item) => item.ID === direccionamiento.ID && item.EstRepEntrega !== 0);
                let delivery = deliveryData.find((item) => item.ID === direccionamiento.ID && item.EstEntrega !== 0);

                // Iterar sobre el array invoice y obtener los datos de la facturación 
                let invoiceWithMatchingNoEntrega = invoice.find((item) => item.NoEntrega === direccionamiento.NoEntrega && item.EstFacturacion !== 0)
                let EstFacturacion = invoiceWithMatchingNoEntrega ? invoiceWithMatchingNoEntrega.EstFacturacion : null

                dispatch({
                    type: "UPDATE_DELIVERY_STATUS",
                    payload: { [direccionamiento.ID]: delivery ? delivery.EstEntrega : null }
                })
                dispatch({
                    type: "UPDATE_INVOICE_STATUS",
                    payload: { [direccionamiento.ID]: EstFacturacion ? EstFacturacion : null }
                })
                dispatch({
                    type: "UPDATE_DELIVERY_REPORT_STATUS",
                    payload: { [direccionamiento.ID]: deliveryReport ? deliveryReport.EstRepEntrega : null }
                })
            } catch (error) {
                console.error(`Error al obtener el estado de (facturación y reporte entrega) para el direccionamiento: ${direccionamiento.NoPrescripcion}`, error);
                dispatch({ type: "UPDATE_INVOICE_STATUS", payload: { [direccionamiento.ID]: null } })
                dispatch({ type: "UPDATE_DELIVERY_REPORT_STATUS", payload: { [direccionamiento.ID]: null } })
                dispatch({ type: "UPDATE_DELIVERY_STATUS", payload: { [direccionamiento.ID]: null } })
            }
        }))
    }, [fetchInvoiceData, fecthByPrescriptionNumber])

    // Actualizar la página actual - estado de la facturación y reporte entrega en la paginación actual
    const setPage = useCallback((page) => {
        setPaginationPage(page, (newPage) => {
            const paginatedData = getPaginatedData(state.searchResults.data, newPage);
            checkStatus(paginatedData);
        });
    }, [setPaginationPage, getPaginatedData, state.searchResults.data, checkStatus]);

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
                fetchFunction = () => fecthByPrescriptionNumber(prescriptionNumber, currentModule)
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
                const firstPage = getPaginatedData(res)
                await checkStatus(firstPage)
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

    }, [state.formData, fetchByDate, fecthByPrescriptionNumber, setSelected, validateFields, resetForm, setSearchResults, checkStatus, currentModule, getPaginatedData, setPage])

    // Actualizar la data 
    const updateData = useCallback(async () => {
        const { searchParams } = state.searchResults
        let fetchFunction
        if (searchParams.prescriptionNumber) {
            fetchFunction = () => fecthByPrescriptionNumber(searchParams.prescriptionNumber, currentModule)
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
            dispatch({ type: "RESET_COMPLETE_DIRECCIONAMIENTOS" })
            const freshData = await fetchFunction();
            if (freshData && typeof freshData === "object") {
                setSearchResults({ data: freshData, loading: false })
                let firstPage = getPaginatedData(freshData)
                await checkStatus(firstPage)
            } else {
                setSearchResults({ loading: false })
                showAlert("Error al actualizar los datos", "error");
            }
        } catch (error) {
            console.error("Error al actualizar los datos después de la programación:", error);
            setSearchResults({ loading: false });
            showAlert("Error al actualizar la data", "error");
        }
    }, [state.searchResults, setSearchResults, currentModule, checkStatus, fecthByPrescriptionNumber, fetchByDate, getPaginatedData])

    // Paginación
    const paginatedData = useMemo(() => {
        const { data } = state.searchResults
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
    }, [state.searchResults, currentPage, itemsPerPage])

    const value = useMemo(() => ({
        ...state,
        ...state.formData,
        ...state.searchResults,
        updateForm,
        handleSubmit,
        selected,
        setSelected,
        handleSelectAllAssets,
        handleCheckboxChange,
        updateData,
        paginatedData,
        fetchCompleteDireccionamiento,
        setPage,
    }), [state, updateForm, handleSubmit, selected, setSelected, handleSelectAllAssets, handleCheckboxChange, updateData, paginatedData, fetchCompleteDireccionamiento, setPage])

    return (<SearchFormContext.Provider value={value}> {children} </SearchFormContext.Provider>)
}
export const useSearchForm = () => {
    const context = useContext(SearchFormContext)
    if (!context) {
        throw new Error("useSearchForm debe utilizarse dentro de un SearchFormProvider")
    }
    return context
}