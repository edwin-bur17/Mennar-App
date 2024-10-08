import bcrypt from "bcrypt"

const saltRounds = 10

export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}
