import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request) {
  // Verifica si la ruta comienza con /api/direccionamiento
  if (request.nextUrl.pathname.startsWith("/api/direccionamiento")) {
    const token = request.cookies.get("token")

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    try {
      const decoded = verify(token.value, process.env.JWT_SECRET) // Verifica el token

      // Si la verificación es exitosa, permite que la solicitud continúe
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("user", JSON.stringify(decoded))

      // Continúa con la solicitud, añadiendo los headers modificados
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }
  }

  // Para todas las demás rutas, permite que la solicitud continúe sin modificaciones
  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
};