import { useNavigate, useParams } from "react-router";
import AppLayout from "./layout";
import { useEffect, useState } from "react";
import apiClient from "../../lib/apiClient";
import { Album, User } from "../../types/types";
import { toast } from "sonner";
import AlbumCard from "../../components/AlbumCard";
import { BsArrowLeft } from "react-icons/bs";

export default function UserAlbums() {
    const navigate =useNavigate()
    const params = useParams<{userId: string}>()
    const [albums, setAlbums] = useState<Album[]>([])
    const [userDetails, setUserDetails] = useState<Partial<User>>({})
    useEffect(() => {
        const fetchAlbums= () => {
            apiClient.get(`user-albums/${params.userId}`)
            .then(res => {
                if (res.status === 200) {
                    setAlbums(res.data.results)
                }
            })
            .catch(err => {
                console.error(err)
                if (err.response && err.response.status === 404) {
                    toast.info(`The selected user does not have any albums`)
                    return
                }
                toast.error("An error occurred while fetching albums")
            })
        }

        const fetchUserDetails =() => {
            apiClient.get(`users/${params.userId}`)
            .then(res=> {
                if (res.status === 200) {
                    setUserDetails(res.data)
                }
            })
            .catch(err => {
                console.error(err)
                if (err.response && err.response.status === 404) {
                    toast.error("The user does not exist")
                    navigate("/app/home")
                    return
                }
                toast.error("An error occurred while fetching user details")
            })
        }
        
        fetchAlbums()
        fetchUserDetails()
    },[navigate, params.userId])

    return(
        <AppLayout>
            <div className="flex flex-col">
                <div onClick={()=> navigate('/app/home')} className="flex gap-2 items-center cursor-pointer underline pb-6 hover:font-bold pl-4">
                    <BsArrowLeft />
                    <p>Back home</p>
                </div>
                <div>

                </div>
                <div className="flex flex-col items-center">
                    {
                        albums.length > 0 ?
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 w-full max-w-[1400px] px-2">
                            {
                                albums.map(album => (
                                    <AlbumCard key={album.id} album={album}/>
                                ))
                            }
                        </div>
                        :
                        <p>No albums for {userDetails.name}</p>
                    }
                </div>
            </div>
        </AppLayout>
    )
}