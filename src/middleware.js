import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const token = request.cookies.get("session")

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    try {
        await jwtVerify( token.value,new TextEncoder().encode(process.env.JWT_SECRET) )
        return NextResponse.next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [
        "/inicio",
        "/direccionamientos",
        "/entrega",
        "/mi-perfil",
        "/novedades",
        "/api/direccionamiento/:path"
        // Agregar aquí otras rutas para proteger
    ],
}