import jwt from "jsonwebtoken"
import axios from "axios"

export function generateJWT(userId) {
    return jwt.sign(
        { userId : userId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

export async function generateQueryToken() {    
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GenerarToken/${process.env.NEXT_PUBLIC_NIT}/${process.env.NEXT_PUBLIC_TOKEN}`)
        return res.data
    } catch (error) {
        console.error("Error al intentar generar el token consulta", error)
        throw new Error("Error al intentar generar el token consulta")
    }
}