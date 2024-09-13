import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(request) {
    const { direccionamientos } = await request.json() // Extraer el array de direccionamientos para programar
    const cookieStore = cookies()
    const queryToken = cookieStore.get("queryToken")
    try {
        const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/Programacion/${process.env.NEXT_PUBLIC_NIT}/${queryToken.value}`
        const responses = [] // respuestas
        for (const direccionamiento of direccionamientos) { // Ciclo for para enviar cada direccionamiento del array
            try {
                await axios.put(ulrQuery, direccionamiento)
                responses.push({ direccionamiento, success: true })
            } catch (error) {
                if (error.response && error.response.data && error.response.data.Errors) {
                    const message = error.response.data.Message
                    console.log("data error:", error.response.data.Errors[0])
                    const error = error.response.data.Errors[0] // si hay un error, lo almaceno
                    console.log(errorMessages)
                    responses.push({ direccionamiento, success: false, message: message, error: error })
                } else {
                    responses.push({ direccionamiento, success: false, error })
                }
            }
        }
        // Si al menos un direccionamiento falló devuelve un multi-status 207
        if (responses.some(({ success }) => !success)) {
            return NextResponse.json({ responses }, { status: 207 })
        } else { // Si no devuelve un mensaje de exito
            return NextResponse.json({ message: "Programación de direccionamiento(s) exitosa" }, { status: 200 })
        }
    } catch (error) {
        console.log("Error al realizar la programación de uno o más direccionamientos", error)
        return NextResponse.json({ error: "Error al realizar la programación de uno o más direccionamientos" }, { status: 500 })
    }
}
