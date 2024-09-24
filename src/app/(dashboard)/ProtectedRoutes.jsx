"use client"
import { useEffect } from "react"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"

export function ProtectedRoutes({ children }) {
    const { checkAuth, loading, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])
    // useEffect(() => {
    //     const redirectIfNotAuthenticated = async () => {
    //       try {
    //         await checkAuth()
    //         if (!isAuthenticated && !loading) {
    //           router.replace("/")
    //         }
    //       } catch (error) {
    //         console.error("Error checking authentication:", error)
    //       }
    //     }

    //     redirectIfNotAuthenticated()
    //   }, [checkAuth, isAuthenticated, loading, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                    <p className="mt-4">Cargando página...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated && !loading) {
        router.replace("/")
        return null
    }

    return <>{children}</>
}