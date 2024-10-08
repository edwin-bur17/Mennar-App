"use client"
import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import SidebarItem from "./SidebarItem"
import { HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from "react-icons/hi2"
import { sidebarItems } from "@/utils"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const isItemActive = (icon) => {
    return icon.matchPath.test(pathname)
  }

  const handleNavigation = (path) => { router.push(path) }

  const classIcon = "cursor-pointer hover:bg-secondary rounded text-2xl inline-block"

  useEffect(() => {
    // Abrir - cerrar el sidebar con el comando (Ctrl + B)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  return (
    <aside
      className={`sticky top-0 h-screen bg-primary text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} overflow-y-auto z-50`}
    >
      <header className={`p-4 ${isOpen ? "text-right" : "text-center"}`}>
        {isOpen ? <HiMiniChevronDoubleLeft onClick={toggleSidebar} className={classIcon} /> :
          <HiMiniChevronDoubleRight onClick={toggleSidebar} className={classIcon} />}
      </header>
      <nav>
        <ul className={`px-4 ${isOpen ? "" : "flex flex-col items-center"}`}>
          {sidebarItems.map((icon, index) => (
            <SidebarItem
              key={index}
              icon={icon.icon}
              text={icon.text}
              path={icon.path}
              isOpen={isOpen}
              isActive={isItemActive(icon)}
              onClick={() => handleNavigation(icon.path)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar