"use client"
import { useState, useEffect } from "react"
import Loading from "@/components/Loading"

const HomePage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div>
      <h1 className="text-3xl text-white">Bienvenid@, {user ? user.fullname : <Loading />}</h1>
    </div>
  )
}

export default HomePage 