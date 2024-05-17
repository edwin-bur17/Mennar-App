import getQueryToken from "@/services/queryToken";
import { NextResponse } from "next/server";
import axios from "axios";


export function GET() {
    return NextResponse.json({ "message": "Hola desde programar direccionamientos" })
}

export async function PUT(request) {
    const { selected } = await request.json()
        console.log(selected)
    try {
        const queryToken = await getQueryToken()
        const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/Programacion/${process.env.NEXT_PUBLIC_NIT}/${queryToken}`
        for (const direccionamiento of selected) {
            await axios.put(ulrQuery, direccionamiento)
        }
        return NextResponse.json({ "message": "Programación de direccionamiento(s) completada" }, { status: 200 })
    } catch (error) {
        console.log("Error al realizar la programación de uno o más direccionamientos", error)
        return NextResponse.json({ error: "Error al realizar la programación de uno o más direccionamientos" }, { status: 500 })
    }
}
