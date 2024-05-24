import axios from "axios";
import Cookies from "js-cookie";

export default async function getQueryToken() {
    try {
        const queryToken = Cookies.get("queryToken") // Buscar el token en la cookie
        if (queryToken) { // Si hay un token en la cookie retorna ese toke
            return queryToken
        } else {
            const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/GenerarToken/${process.env.NEXT_PUBLIC_NIT}/${process.env.NEXT_PUBLIC_TOKEN}`) // Petición a la api
            if (res.status !== 200) { throw new Error(`Fallo en la respuesta HTTP con estado ${res.status}`) } // Manejo de errores
            const newQueryToken = res.data;
            const cookieOptions = { path: "/", httpOnly: false, secure: true, sameSite: "strict" };
            Cookies.set('queryToken', newQueryToken, cookieOptions) // Agregar el nuevo token a la cookie
            return newQueryToken
        }
    } catch (error) {
        console.log("Error al intentar obtener el token de consulta", error)
        return null
    }
}


