"use client"
import { createContext, useContext, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Iniciar sesión
    const login = async (email, password) => {
        try {
            setLoading(true)
            const res = await axios.post("/api/auth/login", { email, password }, { headers: { "Content-Type": "application/json" } })
            setUser(res.data.user)
            setIsAuthenticated(true)
            return { success: true, message: res.data.message }
        } catch (error) {
            console.error("Error de login:", error)
            setIsAuthenticated(false)
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error en la petición al intentar iniciar sesión"
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    // Cerrar sesión
    const logout = () => {
        Cookies.remove("token")
        Cookies.remove("queryToken")
        setUser("")
        setIsAuthenticated(false)
        setTimeout(() => {
            router.push("/")
        }, 800)
    }

    // Verificar si el usuario está logueado al cargar la página inicial o navegar en cualquier otra
    const checkAuth = async () => {
        const token = Cookies.get("token")
        if (!token) {
            // No hay token, el usuario no está autenticado
            setIsAuthenticated(false)
            setUser("")
            return
        }

        try {
            const res = await axios.post("/api/auth", { token }, { headers: { "Content-Type": "application/json" } })
            setUser(res.data.user)
            setIsAuthenticated(true)
        } catch (error) {
            console.error("Error de autenticación", error)
            if (error.response && error.response.status === 401) {
                // token expirado o inválido
                logout()
            }
            setIsAuthenticated(false)
        }
    }

    const value = {
        login,
        logout,
        user,
        loading,
        isAuthenticated,
        checkAuth
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("Debe usarse dentro de un AuthProvider")
    }
    return context
}  // Hook para acceder al contexto de autenticación