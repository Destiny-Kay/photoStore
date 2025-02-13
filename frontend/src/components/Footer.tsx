import { IoSend } from "react-icons/io5";
import { FaXTwitter, FaInstagram,  } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { ReactNode } from "react";
import { Link } from "react-router";

const socials: {name: string,icon: ReactNode, link: string}[] = [
    {
        name: "Twitter",
        icon: <FaXTwitter />,
        link: "https://x.com"
    },
    {
        name: "Facebook",
        icon: <LuFacebook />,
        link: "https://facebook.com"
    },
    {
        name: "Instagram",
        icon: <FaInstagram />,
        link: "https://instagram.com"
    }
]
export default function Footer() {
    const year = new Date().getFullYear()
    return(
        <footer className="flex flex-col items-center w-full gap-4 py-10 px-4 mt-10 bg-black/10">
            <div className="w-full flex flex-wrap justify-evenly gap-4">
                <div className="flex flex-col gap-4">
                    <p>Get your photos organized and securely stored with photostore.</p>
                    <div>
                        <p>subscribe to our newsletter</p>
                        <div className="w-fit flex items-center bg-gray-300 rounded-2xl">
                            <input className="py-2 px-4 focus:outline-none" placeholder="johndoe@email.com"></input>
                            <div className="bg-black text-white p-4 rounded-full cursor-pointer">
                                <IoSend />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-lg font-bold">Application</p>
                    <Link to={'/auth/register'}>Get started</Link>
                    <Link to={'/auth/login'}>Login to account</Link>
                </div>
                <div>
                    <p className="text-lg font-bold">Legal</p>
                    <p>Privacy policy</p>
                    <p>Terms of use</p>
                    <p>FAQs</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                {/* SOCIALS HERE */}
                <p className="text-xl font-bold">Follow us</p>
                <div className="flex gap-4">
                    {
                        socials.map(item => (
                            <Link to={item.link} key={item.name}>
                                <div className="bg-black p-3 rounded-full text-white flex items-center justify-center text-xl">
                                    {item.icon}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <p>&copy;{year} Photostore. All rights reserved</p>
        </footer>
    )
}