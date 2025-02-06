import { ReactNode } from "react"

export default function AuthLayout({children}:{children: ReactNode}) {
    return(
        <div className="min-h-screen lg:grid lg:grid-cols-2 mx-4 lg:m-0">
            <div className="relative hidden lg:block h-screen bg-red-200 bg-[image:url('/hero.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
            </div>
            <div className="flex flex-col items-center justify-start lg:justify-evenly gap-2 border-2 py-10 border-gray-200 shadow-xl rounded-xl min-h-[70vh] lg:min-h-screen my-10 lg:my-0">
               {children}
            </div>
        </div>
    )
}
