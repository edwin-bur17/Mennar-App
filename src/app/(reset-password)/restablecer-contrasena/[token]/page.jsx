import PasswordResetForm from "@/components/auth/PasswordResetForm";
export const metadata = {
  title: "Mennar - Restablecer contraseña"
}

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PasswordResetForm mode="reset" title="Actualizar contraseña" />
    </div>
  )
}

export default ResetPassword