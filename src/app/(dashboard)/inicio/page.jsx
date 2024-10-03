"use client"
import { useState, useEffect } from "react"

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
      <h1 className="text-4xl text-white">Bienvenid@, {user ? user.fullname : "..."}</h1>
    </div>
  )
}

export default HomePage 