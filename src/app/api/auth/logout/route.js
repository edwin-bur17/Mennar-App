import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = NextResponse.json( { message: "Sesión cerrada exitosamente" }, { status: 200 } )

        // Eliminar las cookies
        response.cookies.set("session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        });

        response.cookies.set("queryToken", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}