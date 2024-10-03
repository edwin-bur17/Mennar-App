"use client"
import { useState, useEffect } from "react"
import { useApiCall } from "@/hooks/useApiCall"
import { format, subMonths } from "date-fns"
import { formatDate } from "@/utils"

const NewsPage = () => {
    const [data, setData] = useState([])
    const apiCall = useApiCall()

    useEffect(() => {
        const currentDate = new Date()
        const oneMonthAgo = subMonths(currentDate, 1)
        const endDate = format(currentDate, "yyyy-MM-dd ")
        const startDate = format(oneMonthAgo, "yyyy-MM-dd ")

        const getDireccionamientos = async () => {
            let res = await apiCall.fetchNextToExpire(startDate, endDate)
            console.log(res)
            setData(res)
        }
        getDireccionamientos()
    }, [])
    return (
        <section>
            <h1 className="text-white text-center text-2xl font-bold">NOVEDADES</h1>
            <p className="text-white mb-2">Listados los direccionamientos del último mes </p>
            {data ? (
                <ul className="grid grid-cols-3 gap-2">
                    {data.map((direccionamiento, index) => (
                        <li key={index} className="bg-slate mb-3 p-4 rounded-md">
                            <h2>{direccionamiento.ID}</h2>
                            <p>N° Prescripción: {direccionamiento.NoPrescripcion}</p>
                            <p>Fecha máxima de entrega: {formatDate(direccionamiento.FecMaxEnt)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white">Cargando datos...</p>
            )}
        </section>
    )
}

export default NewsPage