"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import getQueryToken from "@/utils/query_token";
import direccionamientoFecha from "@/utils/direccionamaniento_fecha";
import DireccionamientoCard from "@/components/DireccionamientoCard";
import Loading from "@/components/Loading";
import SearchForm from "@/components/SearchForm";
import { documentTypeOptions } from "@/services/documentTypeOptions";
import showAlert from "@/services/alertSweet";

function DireccionamientoPage() {
    const [token, setToken] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [documentType, setDocumentType] = useState("")
    const [documentNumber, setDocumentNumber] = useState("")
    const [prescriptionNumber, setPrescriptionNumber] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    // ---------------- OBTENER EL TOKEN CONSULTA ---------------
    useEffect(() => {
        const getToken = async () => {
            const token = await getQueryToken()
            setToken(token)
        }
        getToken()
    }, [])
    console.log(token)

    // ---------------- MANEJO DEL CAMBIO ( ONCHANGE ) PARA CADA FORMULARIO ---------------

    // Formulario de búsqueda por rango de fechas
    const handleStarDateChange = (e) => { setStartDate(e.target.value) } // fecha inicio
    const handleEndDateChange = (e) => { setEndDate(e.target.value) } // fecha fin

    // Formulario de búsqueda por número de prescripción
    const handlePrescriptionNumber = (e) => { setPrescriptionNumber(e.target.value) } // número de prescripción

    // Formulario por usuario
    const handleDocumentTypeChange = (e) => { setDocumentType(e.target.value) } // tipo documento
    const handleDocumentNumberChange = (e) => { setDocumentNumber(e.target.value) } // número documento


    // --------------- PROPS: CAMPOS PARA CADA FORMULARIO --------------

    // -------- Búsqueda por rango de fecha
    const fieldsDateRange = [ // Campos del formulario
        { id: "startDate", label: "Fecha Inicio:", type: "date", value: startDate, onChange: handleStarDateChange, },
        { id: "endDate", label: "Fecha Fin:", type: "date", value: endDate, onChange: handleEndDateChange, },
    ]
    
    // -------- Búsqueda por número de prescripción
    const fieldsPrescriptionNumber = [ // Campos del formulario
        { id: "prescriptionNumber", label: "Número de prescripción:", type: "number", value: prescriptionNumber, onChange: handlePrescriptionNumber }
    ]

    // -------- Búsqueda por paciente fecha
    const fieldsDatePatient = [ // Campos del formulario
        { id: "documentType", label: "Tipo de documento:", type: "select", value: documentType, onChange: handleDocumentTypeChange, options: documentTypeOptions, },
        { id: "documentNumber", label: "Número de documento:", type: "number", value: documentNumber, onChange: handleDocumentNumberChange, }
    ]

    // --------------- HANDLESUBMIT PARA LOS FORMULAROS --------------

    // Envio del formulario por rango de fecha
    const handleSubmitDateRange = async (e) => {
        e.preventDefault()
        if (startDate === "" || endDate === "") { // Validar los campos
            showAlert("Todos los campos son obligatorios")
            return
        }
        try {
            setLoading(true)
            setIsSearch(true)
            const res = await direccionamientoFecha(startDate, endDate, token)
            if (res && typeof res === "object") { // Validar la respuesta para settiar correctamente
                setData(res)
                setStartDate("")
                setEndDate("")
            } else {
                showAlert(res)
            }
        } catch (error) {
            console.log("Error al ejecutar la función de direccionamiento por fecha", error)
        } finally {
            setLoading(false)
        }
    }

    // Envio del formulario por número de prescripción
    const handleSubmitPrescriptionNumber = async (e) => {
        e.preventDefault()
        if (prescriptionNumber === "") {
            showAlert("Todos los campos son obligatorios")
            return
        }
        try {
            setLoading(true)
            setIsSearch(true)
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`) // Petición a la api
            setData(res.data)
            setPrescriptionNumber("") 
        } catch (error) {
            console.log("Error al intentar buscar direccionamiento por número de prescripción: ", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitDatePatient = async (e) => {
        e.preventDefault()
        if (documentType === "" || documentNumber === "") {
            showAlert("Todos los campos son obligatorios")
            return
        }
        try {
            setLoading(true)
            setIsSearch(true)
            const res = await direccionamientoFecha(startDate, endDate, token, documentType, documentNumber)
            if (res && typeof res === "object") { // Validar la respuesta para settiar correctamente
                setData(res)
                setStartDate("")
                setEndDate("")
                setDocumentType("")
                setDocumentNumber("")
            } else {
                showAlert(res)
            }
        } catch (error) {
            console.log("Error al intentar buscar direccionamiento paciente por fecha: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section>
            <h1 className="text-center text-white text-2xl font-bold my-5">Consultar Direccionamiento</h1>
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

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-5">
                {loading ? (
                    <Loading />
                ) : isSearch ? (
                    data.length > 0 ? (
                        data.map((direccionamiento) => (
                            <DireccionamientoCard
                                key={direccionamiento.ID}
                                direccionamiento={direccionamiento}
                            />
                        ))
                    ) : (
                        <h3 className="text-white text-lg">No hay resultados, revisa los campos de búsqueda e intenta nuevamente</h3>
                    )
                ) : null}
            </article>
        </section>
    )
}

export default DireccionamientoPage