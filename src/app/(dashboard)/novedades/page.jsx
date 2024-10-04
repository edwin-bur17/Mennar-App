"use client"
import { useState, useEffect } from "react"
import { useApiCall } from "@/hooks/useApiCall"
import { format, subMonths } from "date-fns"
import { formatDate, getSemaphorization } from "@/utils"

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
            setData(res)
        }
        getDireccionamientos()
    }, [])
    return (
        <section>
            <h1 className="text-white text-center text-2xl font-bold">NOVEDADES</h1>
            {data.length ? (
                <>
                    <p className="text-white mb-2">Listados los direccionamientos del último mes </p>
                    <ul className="grid grid-cols-3 gap-2">
                        {data.map(({ ID, NoPrescripcion, FecMaxEnt }, index) => {
                            const { status, style, remainingDays } = getSemaphorization(FecMaxEnt)
                            return (
                                <li key={index} className="bg-slate p-4 rounded-md">
                                    <div className="flex justify-between">
                                        <h2 className="font-bold">{ID}</h2>
                                        <span className={`text-white p-1 rounded-md ${style}`}>{status}</span>
                                    </div>
                                    <p>N° Prescripción: {NoPrescripcion}</p>
                                    <p>Fecha máxima de entrega: {formatDate(FecMaxEnt)}</p>
                                    <p className="mt-1 text-sm">{remainingDays}</p>
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <p className="text-white text-center">Cargando datos ...</p>
            )}
        </section>
    )
}

export default NewsPage