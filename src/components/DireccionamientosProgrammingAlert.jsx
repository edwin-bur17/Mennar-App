"use client"
import { useState } from 'react'
import showAlert from "@/services/alertSweet"
import axios from "axios"
import { fetchUpdateData } from "@/services/fetchUpdateData"

const DireccionamientosProgrammingAlert = ({ selected, setSelected, searchParams, setData }) => {
    const [isLoading, setIsLoading] = useState(false) // Estado de carga para la programación y actualización
    const programming = async () => {
        console.log("Direccionamientos para programación: ")
        console.log(selected)
        try {
            setIsLoading(true)
            const res = await axios.put("/api/programar/direccionamientos", { direccionamientos: selected })
            if (res.status === 200) {
                console.log(res.data.message)
                await fetchUpdateData(searchParams, setData) // Actualizar el estado de la consulta actual
                showAlert(res.data.message)
                setSelected([])
            } else {
                console.log(res.data)
            }
        } catch (error) {
            console.log("Error al enviar los direccionamientos desde el frontend: ", error)
            showAlert(error.response.data.error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="sticky top-0 z-10 flex justify-between items-center bg-slate-100 text-gray-950 p-3 mt-8 rounded-md transition-all duration-500 ease-in-out">
            <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
            <button
                className={`${isLoading ? "bg-green-400" : "bg-green-600 hover:bg-green-500"} text-white transition-all duration-500 ease-in-out rounded-md px-3 py-2`}
                onClick={programming}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-gray-300 mr-2"></span>
                        Programando ...
                    </div>
                ) : ("Programar")}
            </button>
        </div>
    )
}

export default DireccionamientosProgrammingAlert