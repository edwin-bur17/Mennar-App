"use client"
import { useState } from "react"
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchForm } from "@/context/searchFormContext";

const SearchSumary = () => {
    const [isVisible, setIsVisible] = useState(true)
    const {data, searchParams} = useSearchForm()

    // Resumen de la búsqueda
    const total = data.length
    const cancelled = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 0).length
    const assets = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1).length
    const programmed = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 2).length
    console.log(searchParams)

    const handleToggleVisibility = () => { setIsVisible(!isVisible) }

    return (
        <div className="flex items-center mt-4">
            <button
                className="bg-sky-500 rounded-lg p-2 me-3"
                onClick={handleToggleVisibility}>
                {isVisible ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
            </button>
            <div
                className={`grow rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${isVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="bg-white flex justify-around items-center p-2 h-full">
                    <h3>Resumen de la búsqueda</h3>
                    <p>Total: {total}</p>
                    <p className="text-red-500">Anulados: {cancelled}</p>
                    <p>Activos: {assets}</p>
                    <p className="text-green-600">Programados: {programmed}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchSumary