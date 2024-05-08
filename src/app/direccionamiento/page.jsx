"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import getQueryToken from "@/utils/query_token";
import direccionamientoFecha from "@/utils/direccionamaniento_fecha";
import DireccionamientoCard from "@/components/DireccionamientoCard";
import Loading from "@/components/Loading";
import SearchForm from "@/components/SearchForm";

function DireccionamientoPage() {
    const [token, setToken] = useState("")
    // const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" })
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [user, setUser] = useState({ date: "", documentType: "", documentNumber: "" })
    const [prescriptionNumber, setPrescriptionNumber] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
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
    const handleStarDateChange = (e) => { // Campo fecha inicio
        setStartDate(e.target.value)
    }
    const handleEndDateChange = (e) => { // Campo fecha fin
        setEndDate(e.target.value)
    }

    // Formulario de búsqueda por número de prescripción
    const handlePrescriptionNumber = (e) => { // Campo número de prescripción
        setPrescriptionNumber(e.target.value)
    }


    // --------------- PROPS: CAMPOS PARA CADA FORMULARIO --------------

    // Búsqueda por rango de fecha
    const fieldsDateRange = [
        {
            id: "startDate",
            label: "Fecha Inicio",
            type: "date",
            value: startDate,
            onChange: handleStarDateChange
        },
        {
            id: "endDate",
            label: "Fecha Fin",
            type: "date",
            value: endDate,
            onChange: handleEndDateChange
        },
    ]

    // Búsqueda por Número de prescripción
    const fieldsPrescriptionNumber = [
        {
            id: "prescriptionNumber",
            label: "Número de prescripción",
            type: "number",
            value: prescriptionNumber,
            onChange: handlePrescriptionNumber
        }
    ]


    // --------------- HANDLESUBMIT PARA LOS FORMULAROS --------------

    // Envio del formulario por rango de fecha
    const handleSubmitDateRange = async (e) => {
        e.preventDefault()
        console.log("fecha inicio: ", startDate)
        console.log("fecha fin: ", endDate)
        if (startDate === "" && endDate === "") { // Validar los campos
            setError("Todos los campos son obligatorios")
            return
        }
        try {
            setLoading(true)
            setIsSearch(true)
            const res = await direccionamientoFecha(startDate, endDate, token)
            if (res && typeof res === "object") { // Validar la respuesta para settiar correctamente
                setData(res)
                setError(null)
            } else {
                setError(res)
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
        console.log("Estas buscando por numero de prescripción: ", prescriptionNumber)
        if (prescriptionNumber === "") {
            setError("Todos los campos son obligatorios")
            return
        }
        try {
            setLoading(true)
            setIsSearch(true)
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXPrescripcion/${process.env.NEXT_PUBLIC_NIT}/${token}/${prescriptionNumber}`) // Petición a la api
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            console.log("Error al intentar buscar direccionamiento por número de prescripción: ", error)
        }finally {
            setLoading(false)
        }
        
    }

    return (
        <section>
            <h1 className="text-center text-white mb-5">Consultar Direccionamiento</h1>
            <SearchForm
                title="Por rango de fecha"
                fields={fieldsDateRange}
                onSubmit={handleSubmitDateRange}
            />

            <SearchForm
                title="Por número de prescripción"
                fields={fieldsPrescriptionNumber}
                onSubmit={handleSubmitPrescriptionNumber}
            />

            {error && <div className="bg-red-500 text-white text-lg rounded-lg px-4 py-2 w-1/2">
                {error}
            </div>}

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
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
                        <h3 className="text-white text-lg">No hay resultados</h3>
                    )
                ) : null}
            </article>
        </section>
    )
}

export default DireccionamientoPage