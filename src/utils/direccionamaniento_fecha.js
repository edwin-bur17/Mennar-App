import axios from "axios"

export default async function direccionamientoFecha(startDate, endDate, queryToken) {

    const responses = []

    if (startDate > endDate) {
        return "La fecha de inicio de ser menor a la fecha de fin"
    }
    let currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
        const formattedDate = currentDate.toISOString().split('T')[0]
        console.log(formattedDate)
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXFecha/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`
            console.log(url)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXFecha/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`)
            if (res.status === 200) {
                responses.push(res.data);
            }else {
                console.error(`La solicitud para la fecha ${formattedDate} falló con el código de estado: ${res.status}`)
            }
        } catch (error) {
            console.log("Error al procesar la petición de direccionamiento por fecha")
        }
         currentDate.setDate(currentDate.getDate() + 1)
    }
    return responses
}