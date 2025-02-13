import { useEffect, useState } from "react"
import { User } from "../types/types"
import apiClient from "../lib/apiClient"
import { toast } from "sonner"
import { useNavigate } from "react-router"

export default function UserCard({user}: {user:User}) {
    const navigate = useNavigate()
    const [numAlbums, setNumALbums] =useState<null | number>(null)
    useEffect(() => {
        fetchNumUserAlbums(user.id)
    },[user.id])

    const fetchNumUserAlbums = (userId: string) => {
        apiClient.get(`num-albums/${userId}`)
        .then(res => {
            const numAlbums = res.data.albums
            setNumALbums(numAlbums)
        }).catch(err => {
            console.error(err)
            toast.error("An error occurred while fetching user albums")
        })
    }
    return(
        <div onClick={() => navigate(`/app/users/${user.id}`)} key={user.id} className="m-auto w-[300px] h-[300px] flex flex-col gap-2 items-center justify-center rounded-lg p-4 bg-white shadow-md border border-black/10 cursor-pointer">
            <div className="w-40 h-40 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-600">{user.name?.charAt(0)}</div>
            <p>{user.name}</p>
            <p>Albums: {numAlbums}</p>
        </div>
    )
}