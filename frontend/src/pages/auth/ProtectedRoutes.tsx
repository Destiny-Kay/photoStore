import { ReactNode } from "react";
import { useAuth } from "./hooks/Auth";
import { Navigate } from "react-router";

export default function ProtectedRoute({children}:{children: ReactNode}) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        // TODO: Add a spinner here
        return <div>Loading...</div>
    } else if (!isAuthenticated) {
        return <Navigate to={"/"} />
    }
    return children
}