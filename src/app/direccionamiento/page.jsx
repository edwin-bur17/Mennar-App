"use client"
import getQueryToken from "@/utils/query_token";
import { useEffect, useState } from "react";
import direccionamientoFecha from "@/utils/direccionamaniento_fecha";

function DireccionamientoPage() {
    const [token, setToken] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

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
        if (startDate === '' && endDate === '') {
            setError("Todos los campos son obligatorios")
            return
        }
        try {
            const res = await direccionamientoFecha(startDate, endDate, token)
            console.log("respuesta en la page.jsx: ", res)
            
            if (res && typeof res === "object") {
                setData(res)
                setError(null)
            } else {
                setError(res)
            }
        } catch (error) {
            console.log("Error al ejecutar la función de direccionamiento por fecha", error)
        }
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
                    onChange={(e) => { setEndDate(e.target.value) }}
                />

                <button className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer rounded-lg ms-10 px-4 py-2 transition-colors">
                    Buscar
                </button>
            </form>

            {error && <div className="bg-red-500 text-white text-lg rounded-lg px-4 py-2 w-1/2">
                {error}
            </div>}

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {data.map((direccionamiento) => {
                    <div key={direccionamiento.ID}>
                        <p>Id direccionaiento: {direccionamiento.IDDireccionamiento}</p>
                        <p>N° Paciente: {direccionamiento.NoIDPaciente}</p>
                        <p>FEcha máxima de entrega: {direccionamiento.FecMaxEnt}</p>
                        <p>Cant tot a entregar{direccionamiento.CantTotAEntregar}</p>
                    </div>
                })}
            </article>
            
        </section>
    )
}

export default DireccionamientoPage