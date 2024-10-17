import nodemailer from "nodemailer"

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "auxiliar.sistemas@mennarsas.com.co",
        pass: "pmnt fbch yrje vfwx"
    }
})

export async function sendResetPasswordEmail(to, resetUrl) {
    // Opciones del correo 
    const mailOptions = {
        from: "admin@mennarsas.com.co",
        to,
        subject: "Recuperar contraseña",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 10px; padding: 0; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; padding: 20px;">
                    <img src="/public/logo-png.png" alt="Logo Mennar s.a.s" style="max-width: 200px; height: auto;">
                </div>
                <div style="padding: 20px;">
                    <h1 style="color: #2c3e50; text-align: center;">Recuperación de contraseña</h1>
                    <p style="margin-bottom: 20px;">
                        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has realizado esta solicitud, puedes ignorar este correo.
                    </p>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <a href="${resetUrl}" style="background-color: #3498db; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Restablecer mi contraseña
                        </a>
                    </div>
                    <p style="margin-bottom: 20px;">
                        Si el botón anterior no funciona, copia y pega la siguiente URL en tu navegador:
                    </p>
                    <p style="word-break: break-all; background-color: #f8f8f8; padding: 10px; border-radius: 5px; font-size: 14px;">
                        ${resetUrl}
                    </p>
                    <p style="background-color: #ffeaa7; padding: 10px; border-radius: 5px; font-weight: bold;">
                        Este enlace expirará en 10 minutos por razones de seguridad.
                    </p>
                </div>
                <div style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="margin: 0;">© 2024 Mennar S.A.S. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
        `,
    }

    // Enviar el correo
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error al enviar el correo de recuperación", error)
        throw new Error("Error al enviar el correo de recuperación")
    }
}