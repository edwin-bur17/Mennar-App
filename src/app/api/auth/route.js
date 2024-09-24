import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/libs/mongodb"
import User from "@/models/User"

export async function POST(request) {
    const { token } = await request.json()

    try {
        await connectDB()
        // Verificar el token de autenticación
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        console.log(user)

        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return NextResponse.json({ message: "Token inválido" }, { status: 401 }) // Unauthorized
        } else {
            console.error("Error en la verificación de autenticación:", error)
            return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
        }
    }
}