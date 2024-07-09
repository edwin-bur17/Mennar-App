"use client"
import { useState, useCallback } from 'react'
import showAlert from "@/services/alertSweet"
import axios from "axios"
import { useSearchForm } from '@/context/searchFormContext'
import Spinner from './Spinner'

const ProgrammingAlert = () => {
    const [isProgramming, setIsProgramming] = useState(false)
    const { selected, setSelected, updateDataAfterProgramming } = useSearchForm()
   
    // Programar direccionamientos 
    const programming = useCallback(async () => {
        if (isProgramming) return
        try {
            setIsProgramming(true)
            const res = await axios.put("/api/direccionamiento/programar", { direccionamientos: selected })
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
                    <Spinner text="Programando ..."/>
                ) : ("Programar")}
            </button>
        </div>
    )
}

export default ProgrammingAlert