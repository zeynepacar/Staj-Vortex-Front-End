import axios from "axios";

export const getLikedSongByUserId = async (userId) => {

    return await axios.get(`https://localhost:7130/LikedSongs/GetAllByUserId?userId=${userId}`)

}