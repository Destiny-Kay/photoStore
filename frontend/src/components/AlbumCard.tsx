import { useNavigate } from "react-router";
import { Album } from "../types/types";
import { IoMdPhotos } from "react-icons/io";


export default function AlbumCard({album}: {album:Album}) {
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate(`/app/albums/${album.id}`)} className="m-auto w-[300px] flex flex-col gap-2 items-center rounded-lg p-4 bg-white shadow-md border border-black/10 cursor-pointer" data-testid={`album-card-${album.id}`}>
            <IoMdPhotos className="text-9xl text-primary-blue"/>
            <p>{album.title}</p>
        </div>
    )
}