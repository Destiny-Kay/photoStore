import { BiChevronRight } from "react-icons/bi"
import { useNavigate } from "react-router"
import AuthLayout from "./AuthLayout"
import apiClient from "../../lib/apiClient"


export default function Register() {
    const navigate = useNavigate()
    const handleSignup = () => {
    //    apiClient.post("users")
    window.location.href = "http://127.0.0.1:8000/google-login"
    // apiClient.get('/auth/google/')
    // .then(res => {
    //     window.location.href = res.data.auth_url
    // }).catch(err => {
    //     console.error(err)
    // })
    }
    return(
        <AuthLayout>
            <p className="font-bold">Already have an account? <span onClick={() => navigate("/auth/login")} className="text-primary-blue cursor-pointer">Login</span></p>
            <div className="h-1/2 mt-10 flex flex-col gap-4">
                <p className="text-4xl">Sign up</p> 
                <p>Keep your memories safe</p>
                <div onClick={handleSignup} className="border border-primary-blue rounded-2xl p-2 flex gap-4 items-center justify-center cursor-pointer">
                    <img src="/google.png" className="w-10 h-10"/>
                    <p>continue with google</p>
                    <BiChevronRight/>
                </div>
            </div>
        </AuthLayout>
    )
}
