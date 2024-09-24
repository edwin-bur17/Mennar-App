"use client"
import { useAuth } from "@/context/authContext"
import { getInitials } from "@/utils";
import { MdOutlineAlternateEmail } from "react-icons/md"
import { TbUserCircle } from "react-icons/tb";

const Profile = () => {
  const { user, logout } = useAuth()
  const fullname = user.fullname

  return (
    <div className="bg-white max-w-md mx-auto rounded-lg">
      <div className="h-32 bg-sky-default rounded-t-lg relative mb-12">
        <div className="absolute -bottom-12 inset-x-0 flex justify-center">
          <span className="w-28 h-28 bg-sky-default rounded-full flex justify-center items-center text-white text-7xl -mt-16 border-4 border-white">
            {getInitials(fullname)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <TbUserCircle size={25} className="text-muted-foreground mr-1" />
          <span className="text-base ">{user.fullname}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MdOutlineAlternateEmail size={25} className="mr-1" />
          <span className="">{user.email}</span>
        </div>
        <button
          onClick={logout}
          className="w-full text-white p-2 bg-danger-600 hover:bg-danger-400 rounded-md mt-5">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Profile