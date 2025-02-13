export type User = {
    id: string,
    name: string,
    num_albums: number,
    email: string
}

export type Album = {
    id: string,
    user_id: string,
    title: string,
    created_at: string
}

export type Photo = {
    id: string,
    album: string,
    title: string,
    image: string
}

export type UserData = {
    profile_photo: string,
    name: string
}