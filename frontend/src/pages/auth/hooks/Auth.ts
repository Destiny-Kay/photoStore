import apiClient from "../../../lib/apiClient";
import { GOOGLE_ACCESS_TOKEN } from "../../../constants/tokenVals";
import { useEffect, useState } from "react";


export const useAuth = () =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() =>{
        const auth = async() => {
            const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN)
            if (googleAccessToken) {
                const isValidGoogleToken = await validateGoogleToken(googleAccessToken)
                if (isValidGoogleToken) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            };
        }
        auth().catch(() => setIsAuthenticated(false))
    }, [])
    
    const validateGoogleToken = async (googleAccessToken: string): Promise<boolean> => {
        apiClient.post("/google-validate", {
            access_token: googleAccessToken
        })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem(GOOGLE_ACCESS_TOKEN, googleAccessToken)
                return true
            }
        }).catch(err => {
            console.error(err)
            return false
        })
        return false
    }

    const logout = () => {
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN)
        setIsAuthenticated(false)
        window.location.reload()
    }

    return { isAuthenticated, logout}
}