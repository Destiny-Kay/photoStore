import ProtectedRoute from "../auth/ProtectedRoutes";

export default function Home() {
    return(
        <ProtectedRoute>
            <p>this is a default function for something here</p>
        </ProtectedRoute>
    )
}