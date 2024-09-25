"use client"
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import { TbEyeOff, TbEye, TbLock } from "react-icons/tb"
import { MdAlternateEmail } from "react-icons/md"
import showAlert from "@/services/alertSweet"

export const LoginForm = () => {
    const { login, isAuthenticated, loading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const inputClass = "w-full pl-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
    const buttonClass = "w-full px-4 py-2 font-bold text-white bg-sky-default rounded hover:bg-sky-500 focus:outline-none focus:shadow-outline"
    const labelClass = "block mb-2 text-sm font-bold text-gray-700"
    const iconClass = "absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
    const buttonShowPassClass = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/direccionamientos")
        }
    }, [isAuthenticated, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            showAlert("Todos los campos son obligatorios", "error")
            return
        }
        try {
            const result = await login(email, password)
            if (result.success) {
                showAlert(result.message, "success")
                setTimeout(() => {
                    router.push("/direccionamientos")
                }, 1500)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error)
            showAlert("Ocurrió un error inesperado. Por favor, intenta de nuevo.", "error")
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="w-full max-w-md bg-gray-50 p-5 border border-gray-300 shadow-xl rounded-lg">
                <h3 className="text-2xl text-center font-bold mb-4">Iniciar sesión</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className={labelClass}> Correo: </label>
                        <div className="relative">
                            <MdAlternateEmail className={iconClass} size={20} />
                            <input
                                type="email"
                                id="email"
                                className={`${inputClass} pr-1.5`}
                                value={email}
                                placeholder="Digita tu correo"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-7">
                        <label htmlFor="password" className={labelClass}> Contraseña: </label>
                        <div className="relative">
                            <TbLock className={iconClass} size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`${inputClass} pr-10`}
                                value={password}
                                placeholder="Digita tu contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={buttonShowPassClass}
                            >
                                {showPassword ? <TbEyeOff size={20} /> : <TbEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={buttonClass} disabled={loading}>
                        {loading ? <Spinner text="" /> : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}