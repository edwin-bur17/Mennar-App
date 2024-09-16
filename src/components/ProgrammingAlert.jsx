"use client"
import { useState, useCallback } from 'react'
import showAlert from "@/services/alertSweet"
import axios from "axios"
import { useSearchForm } from '@/context/searchFormContext'
import Spinner from './Spinner'

const ProgrammingAlert = () => {
    const [isProgramming, setIsProgramming] = useState(false)
    const { selected, setSelected, updateData } = useSearchForm()
   
    // Programar direccionamientos 
    const programming = useCallback(async () => {
        if (isProgramming) return
        try {
            setIsProgramming(true)
            const res = await axios.put("/api/direccionamiento/programar", { direccionamientos: selected })
            if (res.status === 200) {
                await new Promise(resolve => setTimeout(resolve, 1500))
                await updateData()
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
    }, [selected, setSelected, updateData, isProgramming])

    return (
        <div className="sticky top-0 z-10 flex justify-between items-center bg-slate text-black-default p-3 mt-8 rounded-md transition-all duration-500 ease-in-out">
            <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
            <button
                className={`${isProgramming ? "bg-success-400" : "bg-success-default hover:bg-success-hover"} text-white transition-all duration-500 ease-in-out rounded-md px-3 py-2`}
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