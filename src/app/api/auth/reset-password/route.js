import { NextResponse } from "next/server"
import User from "@/models/User"
import { createHash } from "node:crypto"
import { hashPassword } from "@/helpers/hashPassword"
import connectDB from "@/libs/mongodb"

export async function POST(request) {
    const { token, newPassword } = await request.json()

    try {
        await connectDB()
        // Hashear el token para poder verificarlo
        const resetPasswordToken = createHash("sha256").update(token).digest("hex")

        // Verificar el token y la fecha de expiración
        const user = await User.findOne({ 
            resetPasswordToken,
            resetPasswordTokenExpiration: { $gt: Date.now() },
        })
        if (!user) { 
            return NextResponse.json({ message: "Token inválido o expirado" }, { status: 400 })
        }

        // Actualizar la contraseña del usuario y eliminar el token
        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
        user.resetPasswordToken = null
        user.resetPasswordTokenExpiration = null
        await user.save()

        return NextResponse.json({ message: "Tu contraseña se ha reestablecido correctamente" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error al reestablecer la contraseña" }, { status: 500 })
    }
}