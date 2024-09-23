"use client"
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Verificar si el usuario está logueado al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            if (user){
                setUser(user)
            }else{
                try {
                    const res = await axios.post("/api/auth/login")
                    setUser(res.data.user)
                } catch (error) {
                    setUser(null)
                    console.error("Error de autenticación", error)
                } finally {
                    setLoading(false)
                }
            }
        }
        checkAuth()
    }, [user])

    // Iniciar sesión
    const login = async (email, password) => { 
        console.log(email, password)
        try {
            const res = await axios.post("/api/auth/login", { email, password }, {
                headers:{
                    "Content-Type": "application-json",
                }
            })
            console.log(res)
            setUser(res.data.user)
            return { success: true, message: res.data.message }
        } catch (error) {
            console.error("Error de login:", error)
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error en la petición al intentar iniciar sesión"
            return { success: false, error: errorMessage }
        }
    }

    const logout = () => {
        Cookies.remove("token")
        Cookies.remove("queryToken")
        setUser(null)
    }

    const value = {
        login,
        logout,
        user,
        loading
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}
export const useAuth = () => useContext(AuthContext)  // Hook para acceder al contexto de autenticación