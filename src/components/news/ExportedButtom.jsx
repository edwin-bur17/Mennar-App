import { useState } from "react"
import { exportToExcel } from "@/utils"
import showAlert from "@/services/alertSweet"
export const ExportButton = ({ data, startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [exportInfo, setExportInfo] = useState(null)

    const handleExport = async () => {
        setIsLoading(true)
        setExportInfo(null)
        try {
            const result = await exportToExcel(
                data,
                `Direccionamientos_${startDate.split("-").reverse().join("-")}_${endDate.split("-").reverse().join("-")}.xlsx`
            )
            setExportInfo({
                duration: result.duration,
                totalItems: result.totalItems
            })
        } catch (error) {
            console.error("Error exportando: ", error)
            showAlert("Error al exportar los datos ", "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleExport}
                disabled={isLoading}
                className={`
                    ${isLoading ? "bg-gray-400 cursor-not-allowed " : "bg-success-700 hover:bg-success-hover "}
                    text-white font-bold py-2 px-4 rounded transition-colors
                `}
            >
                {isLoading ? "Exportando... " : "Exportar a Excel "}
            </button>

            {isLoading && (
                <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
            )}

            {exportInfo && (
                showAlert(` Exportados ${exportInfo.totalItems} registros en ${exportInfo.duration} segundos`, "success")
            )}
        </div>
    )
}