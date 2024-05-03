import { NextResponse } from "next/server";
import axios from "axios";
import Cookies from "js-cookie";

export async function POST(request){
    const {startDate, endDate} = await request.json()
    let queryToken = Cookies.get("queryToken")
    const responses = []
    console.log(startDate, endDate)
    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)
    

    if (currentDate > lastDate) {
        return NextResponse.json({
            "message": "La fecha de inicio debe ser menor a la de fin"
        })
    }

    while (currentDate <= lastDate) {
        try {
            const res = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DireccionamientoXFecha/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${currentDate.toISOString()}`)
            console.log(res)
            responses.push(res.data)
        } catch (error) {
            console.error('Error al obtener datos para la fecha', currentDate.toISOString(), error);
        }
        currentDate.setDate(currentDate.getDate() + 1); // Incrementar la fecha en un día
    }
    
    return NextResponse.json({
        "message": "fechas de consulta procesadas",
        "responses": responses
    })
}