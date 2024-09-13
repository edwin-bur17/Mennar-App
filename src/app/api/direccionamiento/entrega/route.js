import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(request) {
    const { formData } = await request.json()
    // Obtener el query token
    const cookieStore = cookies()
    const queryToken = cookieStore.get("queryToken")
    try {
        const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/Entrega/${process.env.NEXT_PUBLIC_NIT}/${queryToken.value}`
        const res = await axios.put(ulrQuery, formData)
        return NextResponse.json({ message: "Entrega exitosa", Ids: res.data[0] }, { status: 200 })
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422) {
                return NextResponse.json({
                    error: "Error de validación",
                    message: error.response.data.Message,
                    details: error.response.data.Errors
                }, { status: 422 }); 
            }
            return NextResponse.json({ error: error.response.data }, { status: error.response.status });
        }else if (error.request) {
            console.error("No se recibió respuesta del servidor");
            return NextResponse.json({ error: "No se recibió respuesta del servidor" }, { status: 503 });
        } else {
            console.error("Error al intentar hacer una entrega (desde el api router): ", error.message)
            return NextResponse.json({ error: "Error al intentar hacer una entrega (desde el api router)", message: error.message}, { status: 500 })
        }
    }
}