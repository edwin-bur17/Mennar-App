"use client"
import getQueryToken from "@/utils/query_token";
import { useEffect, useState } from "react";
import direccionamientoFecha from "@/utils/direccionamaniento_fecha";
import DireccionamientoCard from "@/components/DireccionamientoCard";
import Loading from "@/components/Loading";

function DireccionamientoPage() {
    const [token, setToken] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSearch, setIsSearch] = useState(false)

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
        console.log(startDate)
        console.log(endDate)
        if (startDate === '' && endDate === '') { // Validar los campos
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
                ) : null }
            </article>
        </section>
    )
}

export default DireccionamientoPage