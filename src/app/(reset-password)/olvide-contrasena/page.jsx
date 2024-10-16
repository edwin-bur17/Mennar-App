import PasswordResetForm from "@/components/auth/PasswordResetForm";
export const metadata = {
    title: "Mennar - Olvidé mi contraseña"
}

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <PasswordResetForm mode="forgot" title="Correo de recuperación" />
        </div>
    )
}

export default ForgotPassword