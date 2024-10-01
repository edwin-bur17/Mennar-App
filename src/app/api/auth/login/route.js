import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import connectDB from "@/libs/mongodb"
import User from "@/models/User"
import { generateJWT, generateQueryToken } from "@/helpers/generateToken"

export async function POST(request) {
    const { email, password } = await request.json()
    if (!email || !password) {
        return NextResponse.json({ error: "El correo y contraseña son requeridos" }, { status: 400 })
    }

    try {
        await connectDB()
        const user = await User.findOne({ email }).select("+password") // verificar si el usuario existe
        if (!user) {
            return NextResponse.json({ message: "El usuario no existe, revisa tus credenciales" }, { status: 422 })
        }

        const isMatch = await bcrypt.compare(password, user.password) // verificar la si la contraseña es la correcta
        if (!isMatch) {
            return NextResponse.json({ message: "Credenciales incorrectas, revisalas e intenta nuevamente" }, { status: 422 })
        }

        const token = generateJWT(user._id) // generar el jwt (token de la sesión)
        const queryToken = await generateQueryToken() // generar el query token (mipres)

        const response = NextResponse.json(
            {
                message: "Inicio de sesión exitoso",
                user: {
                    //     id: user._id,
                    fullname: user.fullname,
                    //     email: user.email
                },
            },
            { status: 200 }
        );

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });

        response.cookies.set("queryToken", queryToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });

        return response

    } catch (error) {
        console.error("Error en el inicio de sesión:", error)
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
    }
}