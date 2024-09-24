"use client"
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"

export const LoginForm = () => {
    const { login, isAuthenticated, loading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const router = useRouter()

    const inputClass = "w-full p-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
    const buttonClass = "w-full px-4 py-2 font-bold text-white bg-sky-default rounded hover:bg-sky-500 focus:outline-none focus:shadow-outline"
    const labelClass = "block mb-2 text-sm font-bold text-gray-700"

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/direccionamientos")
        }
    }, [isAuthenticated, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)
        if (!email || !password) {
            setError("Todos los campos son obligatorios")
            return
        }
        try {
            const result = await login(email, password)
            if (result.success) {
                setSuccessMessage(result.message)
                setTimeout(() => {
                    router.push("/direccionamientos")
                }, 1500)
            } else {
                setError(result.error)
            }
        } catch (error) {
            console.log(error)
            setError("Ocurrió un error inesperado. Por favor, intenta de nuevo.")
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="w-full max-w-md bg-gray-50 p-5 border border-gray-300 shadow-xl rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Iniciar sesión</h3>
                {error && <p className="text-danger-default text-center m-3">{error}</p>}
                {successMessage && <p className="text-success-700 text-center">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className={labelClass}> Email: </label>
                        <input
                            type="email"
                            id="email"
                            className={inputClass}
                            value={email}
                            placeholder="Digita tu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-7">
                        <label htmlFor="password" className={labelClass}> Contraseña: </label>
                        <input
                            type="password"
                            id="password"
                            className={inputClass}
                            value={password}
                            placeholder="Digita tu contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={buttonClass} disabled={loading}>
                        {loading ? <Spinner text="" /> : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}