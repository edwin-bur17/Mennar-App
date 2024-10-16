"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import { TbEyeOff, TbEye, TbLock } from "react-icons/tb"
import { MdAlternateEmail } from "react-icons/md"
import showAlert from "@/services/alertSweet"

const inputClass = "w-full pl-8 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
const buttonClass = "w-full px-4 py-2 mt-6 font-bold text-white bg-sky-default rounded hover:bg-sky-500 focus:outline-none focus:shadow-outline"
const labelClass = "block mb-1 font-bold text-gray-700"
const iconClass = "absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
const buttonShowPassClass = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"

const LoginForm = () => {
    const { login, isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const formFields = [ // Campos del formulario
        { id: "email", label: "Correo:", type: "email", placeholder: "Digita tu correo", icon: MdAlternateEmail, },
        { id: "password", label: "Contraseña:", type: "password", placeholder: "Digita tu contraseña", icon: TbLock, },
    ]

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/inicio")
        }
    }, [isAuthenticated, router])

    const handleChange = (e) => {// Manejo del onChange
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {// Envío del formulario (iniciar sesión)
        e.preventDefault()
        if (!formData.email || !formData.password) {
            showAlert("Todos los campos son obligatorios", "error")
            return
        }
        try {
            const result = await login(formData.email, formData.password)
            if (result.success) {
                showAlert(result.message, "success")
                setTimeout(() => router.push("/inicio"), 1500)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.error(error)
            showAlert("Ocurrió un error inesperado. Por favor, intenta de nuevo.", "error")
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="w-full max-w-lg bg-gray-50 p-5 border border-gray-300 shadow-xl rounded-lg">
                <h3 className="text-3xl text-sky-default text-center font-bold mb-2">Iniciar sesión</h3>
                <p className="mb-5 text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div key={field.id} className="mb-2">
                            <label htmlFor={field.id} className={labelClass}>
                                {field.label}
                            </label>
                            <div className="relative">
                                <field.icon className={iconClass} size={20} />
                                <input
                                    type={field.id === "password" ? (showPassword ? "text" : "password") : field.type}
                                    id={field.id}
                                    className={`${inputClass} ${field.id === "password" ? "pr-10" : "pr-1.5"}`}
                                    value={formData[field.id]}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                />
                                {field.id === "password" && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={buttonShowPassClass}
                                    >
                                        {showPassword ? <TbEyeOff size={20} /> : <TbEye size={20} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <a className="hover:text-sky-default hover:underline" href="/olvide-contrasena">Olvidé mi contraseña</a>
                    <button type="submit" className={buttonClass} disabled={loading}>
                        {loading ? <Spinner text="" /> : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm 