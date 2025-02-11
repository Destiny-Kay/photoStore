import apiClient from "../../../lib/apiClient";
import { GOOGLE_ACCESS_TOKEN } from "../../../constants/tokenVals";
import { useEffect, useState } from "react";
import { UserData } from "../../../types/types";
import { useNavigate } from "react-router";


export const useAuth = () =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<Partial<UserData>>({})
    const navigate = useNavigate()

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
        try {
            const res = await apiClient.post("/google-validate/", {
                access_token: googleAccessToken
            })

            if (res.status == 200) {
                setUserData(res.data.user_data)
                return true
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN)
        setIsAuthenticated(false)
        navigate('/')
    }

    return { isLoading, isAuthenticated, userData, logout }
}