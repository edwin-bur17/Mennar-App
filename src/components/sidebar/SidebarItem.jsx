import { useState } from "react"

const SidebarItem = ({ icon: Icon, text, isOpen, isActive, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const classToltip = "fixed ml-10 px-3 py-1 bg-sky-500 text-white rounded-full whitespace-nowrap"

  return (
    <li
      className={`relative flex items-center align-middle p-2 cursor-pointer rounded-full mt-2 ${isActive ? "bg-sky-500" : "hover:bg-secondary"}`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Icon className="text-2xl" />
      {isOpen && <span className="ml-2">{text}</span>}
      {!isOpen && showTooltip && (
        <span className={classToltip} >
          {text}
        </span>
      )}
    </li>
  )
}

export default SidebarItem