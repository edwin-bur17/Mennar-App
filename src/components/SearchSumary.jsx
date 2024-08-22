import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchForm } from "@/context/searchFormContext";
import { useModule } from "@/context/moduleContext";

const SearchSumary = () => {
    const [isVisible, setIsVisible] = useState(true)
    const {data} = useSearchForm()
    const {currentModule} = useModule()

    // Resumen de la búsqueda
    const total = data.length
    const cancelled = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 0 || direccionamiento.EstProgramacion === 0 ).length 
    const assets = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 1 || direccionamiento.EstProgramacion === 1).length
    const programmed = data.filter((direccionamiento) => direccionamiento.EstDireccionamiento === 2 || direccionamiento.EstProgramacion === 2).length

    const handleToggleVisibility = () => { setIsVisible(!isVisible) }

    return (
        <div className="flex items-center mt-4">
            <button
                className="bg-sky-default hover:bg-sky-500 rounded-lg p-2 me-3"
                onClick={handleToggleVisibility}>
                {isVisible ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
            </button>
            <div
                className={`grow rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${isVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="bg-white flex justify-around items-center p-2 h-full">
                    <h3>Resumen de la búsqueda</h3>
                    <span className="text-black-default">Total: {total}</span>
                    <span className="text-danger-default">Anulados: {cancelled}</span>
                    <span className="text-black-default">Activos: {assets}</span>
                    <span className="text-success-default">{currentModule === "direccionamientos" ? "Programados:" : "Procesados:"} {programmed}</span>
                </div>
            </div>
        </div>
    )
}

export default SearchSumary