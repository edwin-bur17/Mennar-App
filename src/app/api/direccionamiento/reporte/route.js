import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(request) {
    const { deliveryReportData } = await request.json()
    const cookieStore = cookies()
    const queryToken = cookieStore.get("queryToken")
    try {
        const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/ReporteEntrega/${process.env.NEXT_PUBLIC_NIT}/${queryToken.value}`
        await axios.put(ulrQuery, deliveryReportData)
        return NextResponse.json({ message: "Reporte entrega exitoso" }, { status: 200 })
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
        } else if (error.request) {
            console.error("No se recibió respuesta del servidor");
            return NextResponse.json({ error: "No se recibió respuesta del servidor" }, { status: 503 });
        } else {
            console.error("Error al intentar hacer un reporte entrega (desde el api router): ", error.message)
            return NextResponse.json({ error: "Error al intentar hacer un reporte entrega (desde el api router)", message: error.message }, { status: 500 })
        }
    }
}