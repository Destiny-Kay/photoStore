import Header from "../components/Header"
import { GoArrowUpRight } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { ReactNode } from "react";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoFolderOpenOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";


const features: {name: string, icon: ReactNode, description: string}[] = [
    {
        name: "effortless photo storage",
        icon: <IoCloudDoneOutline />,
        description: "Upload your favorite moments and store them securely in your personal cloud."
    },
    {
        name: "Smart & Effortless Organization",
        icon: <IoFolderOpenOutline />,
        description: "Sort photos into albums, find them instantly with search, and relive your memories whenever you want."
    },
    {
        name: "Access Anywhere, Anytime",
        icon: <CiGlobe />,
        description: "View and manage your photos from any device, ensuring your memories are always within reach."
    },
]
export default function Landing() {
    const navigate = useNavigate()
    return(
        <div className="bg-gray-100 flex flex-col items-center">
            <Header />
            <div className="relative w-[98%] h-[90vh] rounded-4xl bg-[image:url('/hero.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50 z-10 rounded-4xl"></div>
                <div className="w-full h-full flex flex-col items-center justify-center text-white text-3xl md:text-6xl xl:text-8xl font-bold">
                    <p className="z-10"><span className="text-primary-orange">Capture,</span> <span className="text-primary-blue">organize,</span> <span className="text-green-600">share</span></p>
                    <p className="z-10">Your Visual story.</p>
                    <div onClick={() => navigate("/auth/register")} className="z-10 flex items-center mt-10 text-lg font-light bg-white/10 border rounded-md border-white px-20 py-2 cursor-pointer hover:bg-white hover:text-black hover:gap-1 text-white transition-all ease-in-out duration-200">
                        <p>Get started</p>
                        <GoArrowUpRight />
                    </div>
                </div>
            </div>
            {/* BENEFITS SECTION */}
            <div className="mt-10 w-[98%] mx-4 px-4 py-16 bg-gradient-to-r from-green-500 to-blue-900 rounded-4xl flex flex-col gap-4 items-center text-white">
                <p className="text-2xl md:text-4xl xl:text-5xl font-bold">Get more from every snapshot</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        features.map((feature, index) => (
                            <div key={index} className="flex flex-col gap-2 min-w-[300px] max-w-[350px]">
                                <div className="flex items-center justify-center text-4xl bg-white/30 p-4 rounded-md w-[80px] h-[80px] hover:text-5xl transition-all ease-in-out duration-300">
                                    {feature.icon}
                                </div>
                                <p className="font-bold text-xl">{feature.name}</p>
                                <p>{feature.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            {/* SEARCH SECTION */}
            <div className="mt-10 flex flex-col gap-4">
                <p className="text-4xl font-bold">Search memories easily</p>
                <div className="bg-primary-blue/40 rounded-4xl min-h-5 w-full">
                    <p>asd</p>
                </div>
            </div>
            {/* ORGANIZ SECTION */}
            <div className="mt-10 flex flex-col gap-4">
                <p className="text-4xl font-bold">Organize your photos with ease</p>
                <div className="bg-primary-blue/40 rounded-4xl min-h-5">

                </div>
            </div>
            {/* SAFETY SECTION */}
            <div className="flex flex-col items-center mt-10 bg-primary-blue/40 p-2 lg:p-6 rounded-4xl mx-2">
                <p className="text-4xl font-bold">Your Photos are safe</p>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="lg:col-span-2 m-auto mt-10 grid lg:grid-cols-2 bg-blue-500 rounded-4xl">
                        <div className="grid lg:col-start-2 lg:row-start-1">
                            <img src="/hero.jpg" className="rounded-4xl" width={600}></img>
                        </div>
                        <div className="flex flex-col justify-center items-center px-4 pb-10">
                            <CiLock className="text-8xl"/>
                            <p className="text-2xl lg:text-4xl font-bold">Safeguard your memories</p>
                            <p>Our secure storage keeps them protected</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-4xl min-h-[200px] p-4 flex flex-col items-center justify-center">
                        <CiLock className="text-4xl"/>
                        <p>Your data is uniquely yours</p>
                    </div>
                    <div className="bg-white rounded-4xl min-h-[200px] p-4 flex flex-col items-center justify-center">
                        <CiLock className="text-4xl"/>
                        <p>Your data is uniquely yours</p>
                    </div>
                </div>
            </div>
            {/* TESTIMONIALS SECTION */}
            <div className="mt-10 flex flex-col gap-4">
                {/* <p className="text-4xl font-bold">Clients about our work</p> */}
                <div className="max-w[900px]">
                    {/* add testimonials here */}
                </div>
            </div>
            <Footer />
        </div>
    )
}