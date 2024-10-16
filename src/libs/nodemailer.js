import nodemailer from "nodemailer"

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "10941875baca4d",
        pass: "5d12fcc6276357"
    }
})

export async function sendResetPasswordEmail(to, resetUrl) {

    // Opciones del correo 
    const mailOptions = {
        from: "admin@mennarsas.com.co",
        to,
        subject: "Recuperar contraseña",
        html: `
            <h1>Recuperación de contraseña</h1>
            <p>Para restablecer tu contraseña, haz click en el siguiente enlace:</p>
            <a href="${resetUrl}">Reestablecer mi contraseña</a>
            <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p>
            <p>Este enlace expirará en 10 minutos por razones de seguridad.</p>
        `,
    }

    // Enviar el correo
    try {
        await transporter.sendMail(mailOptions)
        console.log("Correo de recuperación enviado")
    } catch (error) {
        console.log("Error al enviar el correo de recuperación", error)
        throw new Error("Error al enviar el correo de recuperación")
    }
}