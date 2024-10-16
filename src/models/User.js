import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Por favor, digita un nombre completo"],
        maxlength: [40, "El nombre no puede tener más de 40 carácteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor, digita un correo"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: "Por favor, digita un correo válido"
        },
    },
    password: {
        type: String,
        required: [true, "Por favor digita una contraseña"],
        minlength: [8, "La contraseña debe tener mínimo 8 carácteres"],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
},{timestamps: true})

export default mongoose.models.User || mongoose.model("User", UserSchema)