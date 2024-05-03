import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/GenerarToken/${process.env.NEXT_PUBLIC_NIT}/${process.env.NEXT_PUBLIC_TOKEN}`)
        if (res.status !== 200) {
            throw new Error(`Fallo en la respuesta HTTP con estado ${res.status}`)
        } 
        const token = res.data
        console.log("respuesta del token desde la api de next js")
        console.log(res.data)
        return NextResponse.json({
            token : token
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "message": "Error al obtener el token query"
        },
        {
            status: 400,
        }
    )
    }
}
