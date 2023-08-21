import axios from "axios";

export const getAllPlaylist = async () => {

    return await axios.get(`https://localhost:7130/Playlist/GetAll`)


}

export const deletePlaylist = async (playlistId) => {
    return await axios.post(`https://localhost:7130/Playlist/DeleteById?id=${playlistId}`)
}

export const addPlaylist = async (userId, title) => {

    return await axios.post(
        `https://localhost:7130/Playlist/Insert`,
        {
            "userId": userId,
            "title": title
        }



    )
}

export const getPlaylistByUser = async (userId) => {
    return await axios.get(`https://localhost:7130/Playlist/GetByUserId?id=${userId}`)
}