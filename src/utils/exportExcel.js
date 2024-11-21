import * as XLSX from "xlsx" 
import { getNameEps, getNameProduct } from "@/utils" 
/**
 * Prepara los datos para exportación a Excel
 * @param {Array} data - Datos originales
 * @returns {Array} Datos formateados para Excel
 */
const prepareDataForExcel = (data) => {
    return data.map(direccionamiento => ({
        "Número de Prescripción": direccionamiento.NoPrescripcion,
        "Tipo de documento": direccionamiento.TipoIDPaciente,
        "Número de documento": direccionamiento.NoIDPaciente,
        "Código EPS": direccionamiento.CodEPS,
        "Nombre EPS": getNameEps(direccionamiento.CodEPS),
        "Número de entrega": direccionamiento.NoEntrega,
        "Cantidad total a entregar": direccionamiento.CantTotAEntregar,
        "Código servicio/tecnología": direccionamiento.CodSerTecAEntregar,
        "Servicio/Tecnología": getNameProduct(direccionamiento.CodSerTecAEntregar),
        "Fecha Máxima de Entrega": direccionamiento.FecMaxEnt ? new Date(direccionamiento.FecMaxEnt).toLocaleDateString() : "",
        "Fecha del direccionamiento": direccionamiento.FecDireccionamiento ? new Date(direccionamiento.FecDireccionamiento).toLocaleDateString() : "",
        "Estado": direccionamiento.EstDireccionamiento,
    }))
} 

/**
 * Exporta datos a un archivo Excel
 * @param {Array} data - Datos a exportar
 * @param {string} fileName - Nombre del archivo
 * @returns {Promise} Promesa con información de la exportación
 */
export const exportToExcel = async (data, fileName = "direccionamientos_reporte.xlsx") => {
    const startTime = performance.now() 
    const totalItems = data.length 

    return new Promise((resolve, reject) => {
        try {
            const excelData = prepareDataForExcel(data) 
            const workbook = XLSX.utils.book_new() 
            const worksheet = XLSX.utils.json_to_sheet(excelData) 
            
            XLSX.utils.book_append_sheet(workbook, worksheet, "Direccionamientos") 
            
            setTimeout(() => {
                XLSX.writeFile(workbook, fileName) 
                const endTime = performance.now() 
                resolve({
                    duration: ((endTime - startTime) / 1000).toFixed(2),
                    totalItems
                }) 
            }, 500) 
        } catch (error) {
            reject(error) 
        }
    }) 
} 