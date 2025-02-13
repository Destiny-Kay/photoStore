import { useNavigate, useParams } from "react-router";
import AppLayout from "./layout";
import { useEffect, useState } from "react";
import apiClient from "../../lib/apiClient";
import { Album, Photo } from "../../types/types";
import { toast } from "sonner";
import { BsArrowLeft } from "react-icons/bs";


export default function AlbumDetail () {
    const params = useParams<{albumId: string}>()
    const navigate = useNavigate()
    const [photos, setPhotos] = useState<Photo[]>([])
    const [albumDetails, setAlbumDetails] = useState<Partial<Album>>({})

    useEffect(() => {
        const fetchPhotos = () =>{
            apiClient.get(`albums/${params.albumId}/photos`)
            .then(res => {
                if (res.status === 200) {
                    setPhotos(res.data.results)
                }
            })
            .catch(err => {
                console.error(err)
                toast.info("No photos in this album")
            })
        }

        const fetchAlbumDetails =() =>{
            apiClient.get(`albums/${params.albumId}`)
            .then(res => {
                if (res.status === 200) {
                    setAlbumDetails(res.data)
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("An error occurred while fetching album information")
            })
        }

        fetchAlbumDetails();
        fetchPhotos();
    },[params.albumId])

    const formatDate = (dateString: string | undefined) => {
        if (dateString === undefined) return
        const date = new Date(dateString)
        const options: Intl.DateTimeFormatOptions = {
            month:'short',
            day: 'numeric',
            year: 'numeric'
        }
        return new Intl.DateTimeFormat("en-US", options).format(date)
    }
    return (
        <AppLayout>
            {
                albumDetails ?
                <div className="flex flex-col px-4 min-h-screen">
                    <div onClick={()=> navigate(-1)} className="flex gap-2 items-center cursor-pointer underline pb-6 hover:font-bold">
                        <BsArrowLeft />
                        <p>Go Back</p>
                    </div>
                    <div className="py-4">
                        <p className="font-bold text-2xl md:text-4xl">{albumDetails.title}</p>
                        <p>created: {formatDate(albumDetails.created_at)}</p>
                    </div>
                    <div className="flex flex-col items-center w-screenpx-4">
                        {
                            photos.length > 0 ?
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
                                {photos.map((photo, index) => (
                                    <div key={index} className="h-64 overflow-hidden aspect-ratio-auto cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/app/photo/${photo.id}`)}
                                            src={`${import.meta.env.VITE_API_URL}${photo.image}`}
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            :
                            <p>This album does not have any photos</p>
                        }
                    </div>
                </div>
                :
                <p>Loading...</p>
            }
        </AppLayout>
    )
}