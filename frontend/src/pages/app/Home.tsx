import { useEffect, useState } from "react";
import AppLayout from "./layout";
import { User } from "../../types/types";
import apiClient from "../../lib/apiClient";
import { toast } from "sonner";
import UserCard from "../../components/UserCard";
import { useNavigate } from "react-router";

export default function Home() {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
        fetchAlbums()
    },[])

    const fetchUsers = () => {
        apiClient.get('users/')
        .then( res => {
            if (res.status === 200) {
                // console.log(res.data.results)
                setUsers(res.data.results)
            }
        }
        ).catch(err => {
            console.error(err)
            toast.error("An error occurred while fetching users")
        })
    }

    const fetchAlbums = () => {
        apiClient.get('albums/')
        .then( res => {
            if (res.status === 200) {
                setUsers(res.data.result)
            }
        }
        ).catch(err => {
            console.error(err)
            toast.error("An error occurred while fetching users")
        })
    }

    return(
        <AppLayout>
            <div className="mb-4 flex justify-center">
            <p onClick={() => navigate("/")} className="font-bold text-lg md:text-2xl">PhotoStore</p>
            </div>
            <div className="bg-gray-50 min-h-screen mb-4 px-2">
                <div className="grid gap-4 m-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                    {
                        users?.length > 0 ? users?.map(user => (
                        <UserCard key={user.id} user={user}/>
                        ))
                        :
                        <p>There are no users in the database</p>
                    }
                </div>
            </div>
        </AppLayout>
    )
}