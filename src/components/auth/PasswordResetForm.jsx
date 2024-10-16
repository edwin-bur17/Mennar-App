"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"
import showAlert from "@/services/alertSweet"
import Input from "./Input"
import Spinner from "../Spinner"

const PasswordResetForm = ({ mode, title }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { token } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let response
            if (mode === "forgot") {
                response = await axios.post("/api/auth/forgot-password", { email })
            } else if (mode === "reset") {
                if (password !== confirmPassword) {
                    showAlert("Las contraseñas no coinciden", "error")
                    return;
                }
                response = await axios.post("/api/auth/reset-password", { token, newPassword: password })
                setTimeout(() => router.push("/"), 3000)
            }
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            showAlert(response.data.message, "success")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showAlert(error.response?.data?.message, "error")
            } else {
                showAlert("Ocurrió un error, intenta nuevamente", "error")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-lg bg-gray-50 p-5 border border-gray-300 shadow-xl rounded-lg">
            <h1 className="text-2xl text-sky-default font-bold mb-6">{title}</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "forgot" && (
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digita un correo electrónico"
                    />
                )}
                {mode === "reset" && (
                    <>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmar nueva contraseña"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2 h-4 w-4 accent-sky-default"
                            />
                            <label>{showPassword ? "Ocultar" : "Mostrar"} contraseñas</label>
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white bg-sky-default rounded-md hover:bg-sky-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? <Spinner text="Enviando ..." />
                        : mode === "forgot" ? "Enviar correo" : "Restablecer contraseña"}
                </button>
            </form>
        </div>

    )
}

export default PasswordResetForm 