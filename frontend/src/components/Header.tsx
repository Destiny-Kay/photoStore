import { Link } from "react-router"
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
            <div className="hidden lg:block bg-primary-blue text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-primary-blue/90">
                Get started
            </div>
            {/* MOBILE DROPDOWN */}
            <div className="lg:hidden">
                <GiHamburgerMenu className="text-2xl"/>
            </div>
        </div>
    )
}