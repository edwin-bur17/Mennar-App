import { NextResponse } from "next/server"
import User from "@/models/User"
import { randomBytes, createHash } from "node:crypto"
import { sendResetPasswordEmail } from "@/libs/nodemailer"
import connectDB from "@/libs/mongodb"

export async function POST(request) {
    const { email } = await request.json()

    try {
        await connectDB()
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 400 })
        }

        // Generar un token de reseteo y hashearlo para almacenarlo en la base de datos
        const resetToken = randomBytes(20).toString("hex")
        const resetPasswordToken = createHash("sha256").update(resetToken).digest("hex")

        // Guardar el token y el tiempo de expiración
        user.resetPasswordToken = resetPasswordToken // token hasheado
        user.resetPasswordTokenExpiration = Date.now() + 10 * 60 * 1000; // 10 minutos
        await user.save()

        // url con el token sin hashear
        const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/restablecer-contrasena/${resetToken}`

        // Enviar email con el link de reseteo de contraseña
        await sendResetPasswordEmail(user.email, resetUrl)

        return NextResponse.json({ message: "Correo de recuperación enviado, revisa el correo y sigue las instrucciones." }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error al enviar el correo de recuperación" }, { status: 500 })
    }
}