import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const res = await axios("https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api/GenerarToken/817005385/F6BF055E-4200-43E4-89AA-198B0A66010D")
        if (res.status !== 200) {
            throw new Error(`Fallo en la respuesta HTTP con estado ${res.status}`)
        } 
        const token = res.data
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
