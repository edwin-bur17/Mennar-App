"use client"
import { useAuth } from "@/context/authContext"

const HomePage = () => {
    const { user } = useAuth()
    console.log(user)
  return (
    <div>
        <h1>Bienvenido, {user.fullname}</h1>

    </div>
  )
}

export default HomePage