import { BiChevronRight } from "react-icons/bi";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate()
    const handleLogin =() => {
        // This is the google link here
        // window.location.href = " http://127.0.0.1:8000/accounts/google/login"
         window.location.href = "http://127.0.0.1:8000/login/redirect"
    }
    console.log(import.meta.env)
    return(
        <AuthLayout>
            <p className="font-bold">Don't have an account? <span onClick={() => navigate("/auth/register")} className="text-primary-blue cursor-pointer">Register</span></p>
            <div className="h-1/2 mt-10 flex flex-col gap-4">
                <p className="text-4xl">Sign in</p>
                <p>Keep your memories safe</p>
                <div onClick={handleLogin} className="border border-primary-blue rounded-2xl p-2 flex gap-2 items-center justify-center cursor-pointer">
                    <img src="/google.png" className="w-10 h-10"/>
                    <p>continue with google</p>
                    <BiChevronRight/>
                </div>
            </div>
        </AuthLayout>
    )
}