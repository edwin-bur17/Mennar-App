"use client"
import getQueryToken from "@/services/queryToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    const getToken = async () => {
      const token = await getQueryToken()
      setToken(token)
    }
    getToken()
  }, [])
  console.log(token)
  return (
    <div className="text-white">
      <h1>Página de inicio</h1>
      <p>Token para hacer la consulta:{token}</p>
      <input 
      type="button" 
      value="Ir a la página direccionamiento" 
      className="mt-10 bg-sky-500 hover:bg-sky-600 text-white cursor-pointer rounded-lg px-4 py-2 transition-colors"
      onClick={ () => {
        router.push("/direccionamiento")
      }} 
      />
    </div>
  );
}

