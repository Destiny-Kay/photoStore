import { ReactNode } from "react";
import { useAuth } from "./hooks/Auth";
import { Navigate } from "react-router";

export default function ProtectedRoute({children}:{children: ReactNode}) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated === null) {
        // TODO: Add a spinner here
        return <div>Loading...</div>
    } else if (isAuthenticated === false) {
        return <Navigate to={"/"} />
    }
    return children
}