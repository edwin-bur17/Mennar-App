"use client"
import { createContext, useContext, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState("")

    // Iniciar sesión
    const login = async (email, password) => {
        try {
            setLoading(true)
            const res = await axios.post("/api/auth/login", { email, password }, {
                headers: { "Content-Type": "application/json" }
            })
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setUser(res.data.user)
            setIsAuthenticated(true)
            return { success: true, message: res.data.message }
        } catch (error) {
            console.error("Error de login:", error)
            setUser("")
            setIsAuthenticated(false)
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error en la petición al intentar iniciar sesión"
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    // Cerrar sesión
    const logout = async () => {
        try {
            const res = await axios.post("/api/auth/logout", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            return { success: true, message: res.data.message }
        } catch (error) {
            console.error("Error al cerrar la sesión: ", error)
            return { success: false, error: "Error al cerrar sesión" }
        }
    }

    // Obtener el perfil del usuario
    const getProfile = async () => {
        try {
            const res = await axios("/api/auth/profile", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            return { data: res.data.user }
        } catch (error) {
            console.error("Error al obtener el perfil del usuario autenticado: ", error)
            return { success: false, error: "Error al obtener el perfil del usuario autenticado" }
        }
    }

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        getProfile
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