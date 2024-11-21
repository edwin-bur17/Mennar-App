"use client"
import { useState, useEffect } from "react"
import { useApiCall } from "@/hooks/useApiCall"
import { format, subMonths } from "date-fns"
import { formatDate, getSemaphorization } from "@/utils"
import DireccionamientoItem from "./DireccionamientoItem"
import { ExportButton } from "./ExportedButtom"
import Loading from "../Loading"

const PageContent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const apiCall = useApiCall()

    // Obtener la fecha de inicio y fin de acuerdo a la fecha actual
    const currentDate = new Date()
    const oneMonthAgo = subMonths(currentDate, 1)
    const endDate = format(currentDate, "yyyy-MM-dd")
    const startDate = format(oneMonthAgo, "yyyy-MM-dd")

    useEffect(() => {
        const getDireccionamientos = async () => {
            let res = await apiCall.fetchNextToExpire(startDate, endDate)
            setLoading(false)
            setData(res)
        }
        getDireccionamientos()
    }, [])

    if (loading) return <Loading />

    return (
        <section>
            {data.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-white">Listados los direccionamientos del último mes: {`${formatDate(startDate)}`} - {`${formatDate(endDate)}`}</p>
                        <ExportButton data={data} startDate={startDate} endDate={endDate} />
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {data.map((direccionamiento, index) => {
                            const semaphorization = getSemaphorization(direccionamiento.FecMaxEnt)
                            return (
                                <DireccionamientoItem
                                    key={index}
                                    direccionamiento={direccionamiento}
                                    {...semaphorization}
                                />
                            );
                        })}
                    </ul>
                </>
            ) : (
                <p className="text-white text-center">No hay direccionamientos activos</p>
            )}
        </section>
    )
}

export default PageContent