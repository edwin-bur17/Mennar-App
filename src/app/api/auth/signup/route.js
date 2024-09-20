import { NextResponse } from "next/server"
import { hashPassword } from "@/helpers/hashPassword"
import connectDB from "@/libs/mongodb"
import User from "@/models/User"

export async function POST(request) {
    const { fullname, email, password } = await request.json()

    if (password.length < 8) { // Validar la longitud de la contraseña
        return NextResponse.json({ message: "la contraseña debe tener como mínimo 8 cráteres" }, { status: 422 })
    }

    try {
        await connectDB()
        const userFound = await User.findOne({ email })// verificar si el correo ya está en uso
        if (userFound) {
            return NextResponse.json({ message: "El correo electrónico ya está en uso" }, { status: 409 })
        }

        const hashedPassword = await hashPassword(password) //hashear la contraseña
        const newUser = new User({ fullname, email, password: hashedPassword }) // crear el json del usuario
        await newUser.save() // guardar el usuario en la db

        return NextResponse.json({ message: "Registro exitoso", data: newUser }, { status: 200 })
    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessages = {}
            for (const field in error.errors) {
                errorMessages[field] = error.errors[field].message
            }
            console.error("error de validación del modelo: ", errorMessages)
            return NextResponse.json({ message: errorMessages }, { status: 422 })
        }
        console.error("Error en el registro", error)
        return NextResponse.json({ message: "Error en el registro" }, { status: 500 })
    }
}