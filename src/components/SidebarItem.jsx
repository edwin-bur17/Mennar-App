import Link from "next/link"

const SidebarItem = ({ icon: Icon, text, path, isOpen, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center align-middle p-2 cursor-pointer rounded mt-2 ${isActive ? "bg-sky-500" : "hover:bg-gray-700"}`}
      // className="relative flex items-center align-middle p-2 cursor-pointer hover:bg-gray-700 rounded mt-2 group" 
      // href={path}
      onClick={onClick}
      >
      <Icon className="text-xl" />
      {isOpen && <span className="ml-2">{text}</span>}
    </li>
  )
}

export default SidebarItem