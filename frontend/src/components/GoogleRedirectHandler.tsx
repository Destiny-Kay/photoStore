import { useEffect } from "react"
import { useNavigate } from "react-router"
import { GOOGLE_ACCESS_TOKEN } from "../constants/tokenVals"


export default function GoogleRedirectHandler() {
    const navigate =useNavigate()

    useEffect(() =>{
        const queryParams = new URLSearchParams(window.location.search)
        const accessToken = queryParams.get(('tkn'))
        console.log(accessToken)
        
        if (accessToken) {
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken)
            navigate('/app/home')
        } 
    },[navigate])
    return(
        <div>
            Logging In.....
        </div>
    )
}