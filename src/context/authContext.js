import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    // Verificar si el usuario está logueado al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
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
        checkAuth()
    }, [])

    // Iniciar sesión
    const login = async (email, password) => { 
        try {
            const res = await axios.post("/api/auth/post", { email, password })
            if (res.status === 200) {
                setUser(res.data.user)
                router.push("/direccionamientos")
                return { success: true }
            } else {
                let error = res.data
                return { success: false, error: error.message }
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: "Error en la petición al intentar iniciar sesión" };
        }
    }

    const logout = () => {
        Cookies.remove("token")
        Cookies.remove("queryToken")
        setUser(null)
        router.push("/")
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