"use client"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem"
import { HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from "react-icons/hi2";
import { sidebarItems } from "@/utils/sidebarItems";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const toggleSidebar = () => setIsOpen(!isOpen) 

  const isItemActive = (icon) => {
    return icon.matchPath.test(pathname)
  }

  const handleNavigation = (path) => {router.push(path)}

  return (
    <aside className={`sticky top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} overflow-y-auto`}>
      <header className={`p-4 ${isOpen ? "text-right" : "text-center"}`}>
        {isOpen ?  <HiMiniChevronDoubleLeft onClick={toggleSidebar} className="cursor-pointer hover:bg-gray-700 rounded text-2xl inline-block" /> : 
        <HiMiniChevronDoubleRight onClick={toggleSidebar} className="cursor-pointer hover:bg-gray-700 rounded text-2xl inline-block" />}
        {/* <HiMenuAlt3 onClick={toggleSidebar} className="cursor-pointer hover:bg-gray-700 rounded text-2xl inline-block" /> */}
      </header>
      <nav>
        <ul className={`p-4 ${isOpen ? "" : "flex flex-col items-center"}`}>
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