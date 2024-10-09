"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/authContext"
import { getInitials } from "@/utils"
import { useRouter } from "next/navigation"
import Loading from "./Loading"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { TbUserCircle } from "react-icons/tb"

const ProfileCard = () => {
    const { getProfile, logout } = useAuth()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => { // Obtener los datos del usuario
        const fetchProfile = async () => {
            try {
                const profile = await getProfile()
                setUser(profile.data)
            } catch (error) {
                console.error("Error al obtener el perfil:", error)
            }
        }
        fetchProfile()
    }, [getProfile])

    const handleLogout = async () => { // Cerrar sesión
        try {
            setLoading(true)
            await logout()
            setLoading(false)
            router.push("/")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    if (!user) return <Loading />

    return (
        <div className="bg-white max-w-md mx-auto rounded-lg mt-3">
            <div className="h-32 bg-sky-default rounded-t-lg relative mb-12">
                <div className="absolute -bottom-12 inset-x-0 flex justify-center">
                    <span className="w-28 h-28 bg-sky-default rounded-full flex justify-center items-center text-white text-7xl -mt-16 border-4 border-white">
                        {getInitials(user.fullname)}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <ul>
                    <li className="flex items-center mb-3">
                        <TbUserCircle size={25} className="mr-1" />
                        <span>{user.fullname}</span>
                    </li>
                    <li className="flex items-center mb-3">
                        <MdOutlineAlternateEmail size={25} className="mr-1" />
                        <span>{user.email}</span>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full text-white p-2 bg-danger-600 hover:bg-danger-400 rounded-md mt-5">
                            {loading ? "Cerrando sesión ..." : "Cerrar sesión"}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileCard