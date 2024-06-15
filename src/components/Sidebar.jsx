"use client"
import { useState } from "react"
import SidebarItem from "./SidebarItem"
import {FaHome, FaUser, FaCog} from "react-icons/fa"
import {IoMdMenu} from "react-icons/io"
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen) 

  return (
    <aside className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <header className="p-4 text-center">
        <IoMdMenu onClick={toggleSidebar} className="cursor-pointer text-2xl inline-block" />
      </header>
      <nav>
        <ul className={`p-4 ${isOpen ? '' : 'flex flex-col items-center'}`}>
          <SidebarItem icon={FaHome} text="Inicio" isOpen={isOpen} />
          <SidebarItem icon={FaUser} text="Perfil" isOpen={isOpen} />
          <SidebarItem icon={FaCog} text="Configuración" isOpen={isOpen} />
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar