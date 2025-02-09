import { useEffect } from "react"
import { useNavigate } from "react-router"
import { GOOGLE_ACCESS_TOKEN } from "../constants/tokenVals"


export default function GoogleRedirectHandler() {
    const navigate =useNavigate()

    useEffect(() =>{
        const queryParams = new URLSearchParams(window.location.search)
        const accessToken = queryParams.get(('access_token'))
        
        if (accessToken) {
            console.log('Inside the function to authenticate')
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken)
            // Make api call to validate the user before logging in
            navigate('/app/home')
        } 
        // else {
        //     // No token founds
        //     console.log('No token found')
        //     navigate('/')
        // }

    },[])
    return(
        <div>
            Logging In.....
        </div>
    )
}