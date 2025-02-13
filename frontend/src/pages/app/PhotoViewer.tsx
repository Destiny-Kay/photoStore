import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import apiClient from "../../lib/apiClient"
import { Photo } from "../../types/types"
import { toast } from "sonner"
import { BsArrowLeft } from "react-icons/bs"
import { LuPen } from "react-icons/lu"

export default function PhotoViewer(){
    const params = useParams<{photoId: string}>()
    const navigate = useNavigate()
    const [photoDetails, setPhotoDetails] = useState<Partial<Photo>>({})
    const [editable, setEditable] = useState(false)
    const photoNameRef = useRef<HTMLInputElement | null>(null)
    const [photoTitle, setPhotoTitle] = useState("")
    // TODO: fetch the photo
    useEffect(()=>{
        const fetchPhoto = () =>{
            apiClient.get(`/photos/${params.photoId}`)
            .then(res => {
                if (res.status === 200) {
                    setPhotoDetails(res.data)
                }
            })
            .catch(err => {
                console.error(err)
                toast.error("An error occurred while getting your photo")
            })
        }

        fetchPhoto()
    }, [params.photoId])

    const handleSetEditable = () => {
        setEditable(true)
        // NOte: this Does not work
        photoNameRef.current?.focus()
    }

    const handlePhotoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setPhotoTitle(value)
    }

    const handleChangePhotoTitle = () => {
        if (photoTitle.length < 4) {
            return toast.message("Please input a valid photo Title name. Name must be greater than 4 characters")
        }
        if (photoTitle === photoDetails.title) {
            setEditable(false)
            return toast.message("The title has not changed")
        }
        apiClient.patch(`photos/${params.photoId}`, {title: photoTitle})
        .then(res => {
            if (res.status === 200) {
                setPhotoDetails({...photoDetails, title: photoTitle})
                setEditable(false)
                toast.success("Photo title changed successfully")
            }
        })
        .catch(err => {
            console.error(err)
            toast.error("An error occured while changing the Title. Please try again later")
            setEditable(false)
            return
        })
    }

    return(
        <div className="bg-black/90 h-screen text-white p-4 flex flex-col items-center">
            <div className="w-full">
                <BsArrowLeft onClick={() => navigate(-1)} className="text-2xl cursor-pointer"/>
            </div>
            <div className="flex">
                {
                    editable ?
                    <div className="flex flex-col gap-4 md:flex-row">
                        <input onChange={handlePhotoTitleChange} defaultValue={photoDetails.title} ref={photoNameRef} className="text-white focus:outline-none border-b-2"/>
                        <div className="flex gap-2">
                            <button onClick={handleChangePhotoTitle} className="bg-white text-black border-2 px-4 py-2 rounded-2xl cursor-pointer transition-all ease-in-out duration-200">Change name</button>
                            <button onClick={() => setEditable(false)} className="bg-black text-white border-2 px-4 py-2 rounded-2xl cursor-pointer transition-all ease-in-out duration-200">Cancel</button>
                        </div>
                    </div>
                    :
                    <div className="flex gap-4">
                        <p>{photoDetails.title}</p>
                        <LuPen onClick={handleSetEditable} className="cursor-pointer" data-testid="EditPhotoIcon"/>
                    </div>
                }
            </div>
            <img src={photoDetails.image} alt={photoDetails.title} className="mt-10 max-h-[80%]"></img>
        </div>
    )
}