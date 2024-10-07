import { differenceInDays, parseISO, startOfDay } from "date-fns"

export function getSemaphorization(FecMaxEnt) {
    const today = startOfDay(new Date()) // fecha actual
    const maximumDeliveryDate = startOfDay(parseISO(FecMaxEnt)) // FecMaxEnt

    // Obtener la diferencia 
    let remainingDays = differenceInDays(maximumDeliveryDate, today) 

    // Devolver el estado de acuerdo a la diferencia de días
    if (remainingDays < 0) return { status: "Fecha vencida", style: "bg-danger-600", remainingDays: `Vencido hace ${Math.abs(remainingDays)} días` }
    if (remainingDays <= 15) return { status: "Próximo a vencer", style: "bg-danger-400", remainingDays: `Quedan ${remainingDays} días` }
    if (remainingDays <= 30) return { status: "Alerta", style: "bg-warning-default", remainingDays: `Quedan ${remainingDays} días` }
    return { status: "A tiempo", style: "bg-success-700", remainingDays: `Quedan ${remainingDays} días` }
}