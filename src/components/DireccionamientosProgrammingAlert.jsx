"use client"
import { useState, useCallback } from 'react'
import showAlert from "@/services/alertSweet"
import axios from "axios"
import { useSearchForm } from '@/context/searchFormContext'

const DireccionamientosProgrammingAlert = () => {
    const [isProgramming, setIsProgramming] = useState(false)
    const { selected, setSelected, updateDataAfterProgramming } = useSearchForm()
   
    // Programar direccionamientos 
    const programming = useCallback(async () => {
        if (isProgramming) return
        try {
            setIsProgramming(true)
            const res = await axios.put("/api/programar/direccionamientos", { direccionamientos: selected })
            if (res.status === 200) {
                await new Promise(resolve => setTimeout(resolve, 1500))
                await updateDataAfterProgramming()
                setSelected([])
                showAlert(res.data.message)
            } else {
                console.log(res.data)
            }
        } catch (error) {
            console.log("Error al enviar los direccionamientos desde el frontend: ", error)
            showAlert(error.response?.data?.error || "Error desconocido", "error")
        } finally {
            setIsProgramming(false)
        }
    }, [selected, setSelected, updateDataAfterProgramming])

    return (
        <div className="sticky top-0 z-10 flex justify-between items-center bg-slate-100 text-gray-950 p-3 mt-8 rounded-md transition-all duration-500 ease-in-out">
            <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
            <button
                className={`${isProgramming ? "bg-green-400" : "bg-green-600 hover:bg-green-500"} text-white transition-all duration-500 ease-in-out rounded-md px-3 py-2`}
                onClick={programming}
                disabled={isProgramming}
            >
                {isProgramming ? (
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