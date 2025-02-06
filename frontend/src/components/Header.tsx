import { Link, useNavigate } from "react-router"
import { GiHamburgerMenu } from "react-icons/gi";

const navItems: {name: string, href: string}[] = [
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
                <button onClick={() => navigate("/auth/register")} className="bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">
                    Get started
                </button>
                <button onClick={() => navigate("/auth/login")} className="border-2 border-primary-blue text-primary-blue font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue hover:text-white">
                    Login
                </button>
            </div>
            {/* MOBILE DROPDOWN */}
            <div className="lg:hidden">
                <GiHamburgerMenu className="text-2xl"/>
            </div>
        </div>
    )
}