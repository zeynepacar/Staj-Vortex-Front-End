import axios from "axios";

export const getAlbumById = async (albumId) => {

    return await axios.get(`https://localhost:7130/Album/GetById?id=${albumId}`)

}

export const getAlbumsByArtist = async (artistId) => {

    return await axios.get(`https://localhost:7130/Album/GetAllByArtistId?artistId=${artistId}`)
}

export const getAllAlbums = async () => {
    return await axios.get(`https://localhost:7130/Album/GetAll`)
}

export const deleteAlbumById = async (albumId) => {
    return await axios.post(`https://localhost:7130/Album/DeleteById?id=${albumId}`)
}

export const addAlbum = async (artistId, title, image) => {
    return await axios.post(
        `https://localhost:7130/Album/Insert`,
        {
            "artistId": artistId,
            "title": title,
            "image": image
        }



    )
}