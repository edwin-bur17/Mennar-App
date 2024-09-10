import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";
import { getOverrideEndPoint } from "@/utils";

export async function PUT(request) {
    let { type, id } = await request.json()

    if (!id) return NextResponse.json({ message: "No hay un id para hacer la anulación :(" }, { status: 422 })
    // Obtener el query token
    const cookieStore = cookies()
    const queryToken = cookieStore.get("queryToken")
    
    let endPoint = getOverrideEndPoint(type)  // Obtener el endpoint adecuado
    if (!endPoint) return NextResponse.json({ message: "Tipo de anulación inválida (revisar los endpoints) :(" }, { status: 422 })

    // Obtener la base url
    let baseUrl = type === "facturacion" ? process.env.NEXT_PUBLIC_API_FAC_URL : process.env.NEXT_PUBLIC_API_URL
    try {
        if (!queryToken) {
            console.log("no se pudo obtener el querytoken")
            return
        }
        let urlQuery = `${baseUrl}/${endPoint}/${process.env.NEXT_PUBLIC_NIT}/${queryToken.value}/${id}`
        const res = await axios.put(urlQuery)
        return NextResponse.json(res.data[0])
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
            console.error(`Error al intentar hacer una anulación de tipo ${type}, con id. ${id}.`, error.message)
            return NextResponse.json({ error: "Error al intentar hacer un reporte entrega (desde el api router)", message: error.message }, { status: 500 })
        }
    }
}