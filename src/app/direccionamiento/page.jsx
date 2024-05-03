"use client"
import getQueryToken from "@/utils/query_token";
import { useEffect, useState } from "react";
import direccionamientoFecha from "@/utils/direccionamaniento_fecha";

function DireccionamientoPage() {
    const [token, setToken] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        const getToken = async () => {
            const token = await getQueryToken()
            setToken(token)
        }
        getToken()
    }, [])
    console.log(token)

    // Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("DATOS A BUSCAR")
        console.log("fecha de inicio: ", startDate)
        console.log("fecha de fin: ", endDate)
        const res = direccionamientoFecha(startDate, endDate, token)
        console.log(res)
    }
    
    return (
        <section>
            <h1 className="text-center text-white mb-5">Página direccionamiento</h1>
            <form 
            className="bg-slate-300 text-gray-900 rounded-md w-1/2 p-4"
            onSubmit={handleSubmit}
            >
                <label htmlFor="startDate" className="me-4">Fecha de inicio:</label>
                <input
                    type="date"
                    id="startDate"
                    className="px-3 py-2 rounded-md"
                    onChange={(e) => { setStartDate(e.target.value) }}
                />
                <label htmlFor="endDate" className="mx-4">Fecha de fin:</label>
                <input
                    type="date"
                    id="endDate"
                    className="px-3 py-2 rounded-md"
                    onChange={(e) => {setEndDate(e.target.value)}}
                />

                <button className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer rounded-lg ms-10 px-4 py-2 transition-colors">
                    Buscar
                </button>
            </form>
        </section>
    )
}

export default DireccionamientoPage