"use client"
import getQueryToken from "@/services/queryToken";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [token, setToken] = useState("")

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
    </div>
  );
}

