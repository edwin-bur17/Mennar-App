import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Por favor define la variable de entorno MONGODB_URI antes de hacer la conexión")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false
        }
        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            const url = MONGODB_URI.split(':');
            const host = url[2].split('/')[2];
            const port = url[2].split('/')[3];
            console.log(`Conectado a la base de datos en el host ${host} en el puerto ${port}`);
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        console.log("Mongodb is running...")
    } catch (error) {
        cached.promise = null
        throw new Error("Error al intentar connectarse a la base de datos", error)
    }
}

export default connectDB