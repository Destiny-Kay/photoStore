import ProtectedRoute from "../auth/ProtectedRoutes";

export default function Home() {
    return(
        <ProtectedRoute>
            <p>this is the home component here</p>
        </ProtectedRoute>
    )
}