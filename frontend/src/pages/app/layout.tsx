import { ReactNode } from "react";
import ProtectedRoute from "../auth/ProtectedRoutes";
import TopBar from "../../components/TopBar";

export default function AppLayout({children}: {children: ReactNode}) {
    return(
        <ProtectedRoute>
            <div className="w-screen h-screen bg-gray-50 flex flex-col">
                <TopBar />
                <div className="overflow-y-scroll pt-10">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    )
}