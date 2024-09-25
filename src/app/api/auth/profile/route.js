import { NextResponse } from "next/server" 
import connectDB from "@/libs/mongodb" 
import User from "@/models/User" 
import jwt from "jsonwebtoken" 

export async function GET(request) {
    try {
        const session = request.cookies.get("session")?.value 

        if (!session) { // validar el token de la sesión
            return NextResponse.json({ message: "No autorizado" }, { status: 401 }) 
        }

        const decoded = jwt.verify(session, process.env.JWT_SECRET) // Verificar el token
        
        await connectDB() 
        
        const user = await User.findById(decoded.userId).select("-password") // Buscar el usuario
        console.log(user)

        if (!user) { // validar si no hay un usuario
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 }) 
        }

        return NextResponse.json({ user }, { status: 200 }) // devolver la data del usuario
    } catch (error) {
        console.error("Error al obtener el perfil:", error) 
        return NextResponse.json({ message: "Error del servidor" }, { status: 500 }) 
    }
}