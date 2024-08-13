export function formatDate(dateStr) { // Formatear fecha
   
    if(!dateStr){
        dateStr = "1900-01-01 00:00"
    }

    const [datepart, timepart] = dateStr.split(' ');
    const [year, month, day] = datepart.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (timepart) {
        const [hours, minutes] = timepart.split(':').map(Number);
        date.setUTCHours(hours, minutes);
    }
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    const dia = date.getUTCDate()
    const mes = months[date.getUTCMonth()]
    const año = date.getUTCFullYear()

    //veriifcar si tiene hora
    const hasHour = timepart !== undefined

    // si no hay hora 
    if (!hasHour) {
        return `${dia} de ${mes} del ${año}`
    }

    // si hay hora
    let hours = date.getUTCHours()
    let period = "am"
    if (hours >= 12) {
        period = "pm"
        if (hours > 12) {
            hours -= 12
        }
    }
    // Manejar el caso de medianoche (00:00)
    if (hours === 0) {
        hours = 12;
    }
    const minutes = date.getUTCMinutes().toString().padStart(2, "0")
    hours = hours.toString().padStart(2, "0")
    return `${dia} de ${mes} del ${año} - ${hours}:${minutes} ${period}`
}