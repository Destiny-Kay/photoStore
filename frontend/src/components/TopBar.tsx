import { BiLogOut } from "react-icons/bi"
import { useAuth } from "../pages/auth/hooks/Auth"

export default function TopBar() {
    const {userData, logout} = useAuth()
    return(
        <div className="h-fit flex justify-between items-center px-8 py-2 bg-white/90">
            <img src={userData.profile_photo} width={40} height={40} className="rounded-full"></img>
            <p className="hidden md:block">Hello, {userData.name}</p>
            <div onClick={logout} className="flex items-center gap-2 border cursor-pointer border-primary-blue px-2 py-1 rounded-4xl hover:bg-primary-blue hover:text-white">
                <BiLogOut/>
                <p>Logout</p>
            </div>
        </div>
    )
}