import { Link, useNavigate } from "react-router"
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../pages/auth/hooks/Auth";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const navItems: {name: string, href: string}[] = [
    {
        name: "features",
        href: "/#features"
    },
    {
        name: "search",
        href: "/#search"
    },
    {
        name: "organize",
        href: "/#organize"
    },
    {
        name: "safety",
        href: "/#safety"
    },
]
export default function Header(){
    const navigate = useNavigate()
    const {isAuthenticated} = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    return(
        <div className="z-50 bg-white/80 w-[98%] sticky top-4 my-3 rounded-full px-4 py-3 flex items-center justify-between">
            <p className="font-bold text-lg md:text-2xl"><span className="text-primary-orange">photo</span><span className="text-primary-blue">store</span></p>
            {/* TODO: make this as good as possible */}
            {/* DESKTOP NAV */}
            <div className="hidden lg:flex gap-4">
                {
                    navItems.map((item, index) => (
                        <Link to={item.href} key={index} className="cursor-pointer font-bold">{item.name}</Link>
                    ))
                }
            </div>
            <div className="hidden lg:flex gap-4">
                {
                    isAuthenticated ?
                        <button
                            onClick={() => navigate("/app/home")}
                            className="bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">My account</button>
                    :
                    <>
                        <button onClick={() => navigate("/auth/register")} className="bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">
                            Get started
                        </button>
                        <button onClick={() => navigate("/auth/login")} className="border-2 border-primary-blue text-primary-blue font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue hover:text-white">
                            Login
                        </button>
                    </>     
                }
            </div>
            {/* MOBILE DROPDOWN */}
            <div className="lg:hidden">
                <GiHamburgerMenu onClick={() => setDropdownOpen(true)} className="text-2xl"/>
                {
                    dropdownOpen &&
                    <div className="fixed top-0 left-0 w-full min-h-[80vh] bg-white p-4">
                        <div className="flex items-center justify-between">
                            <p className="font-bold">PhotoStore</p>
                            <IoMdClose className="text-3xl" onClick={() => setDropdownOpen(false)}/>
                        </div>
                        <div className="flex flex-col items-center pt-10 gap-4">
                            {
                                navItems.map((item, index) =>(
                                    <Link onClick={() => setDropdownOpen(false)} to={item.href} key={index} className="font-bold text-2xl">{item.name}</Link>
                                ))
                            }
                            <div className="mt-6 flex flex-col gap-4">
                                {
                                    isAuthenticated ?
                                        <button
                                            onClick={() => navigate("/app/home")}
                                            className="bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">My account</button>
                                    :
                                    <>
                                        <button onClick={() => navigate("/auth/register")} className="bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">
                                            Get started
                                        </button>
                                        <button onClick={() => navigate("/auth/login")} className="border-2 border-primary-blue text-primary-blue font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue hover:text-white">
                                            Login
                                        </button>
                                    </>     
                                }
                            </div>
                        </div>
                        {/* START */}
                        {/* END */}
                    </div>
                }
            </div>
        </div>
    )
}