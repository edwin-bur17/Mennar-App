"use client"
import getQueryToken from "@/utils/query_token";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [token, setToken] = useState("")

  useEffect(()=> {
    const getToken = async () => {
      const token = await getQueryToken()
      setToken(token)
    }
    getToken()
  }, [])
  console.log(token)
  return (
    <div>
      HOME PAGE
      <p>su token es: {token}</p>
    </div>
  );
}

