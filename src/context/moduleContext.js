"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation";

// Crear el context
const ModuleContex = createContext()

export const ModuleProvider = ({ children }) => {
    const [currentModule, setCurrentModule] = useState("")// Módulo actual
    const pathname = usePathname() // Hook para obtener url del lado del cliente

    useEffect(() => {
        const updateModule = () => {
          if (pathname.startsWith("/direccionamientos")) {
            setCurrentModule("direccionamientos");
          } else if (pathname.startsWith("/entrega")) {
            setCurrentModule("entrega");
          }
        };
        updateModule();
      }, [pathname]);
    return (
        <ModuleContex.Provider value={{ currentModule, setCurrentModule }}>
            {children}
        </ModuleContex.Provider>
    )
}
export const useModule = () => useContext(ModuleContex)