import axios from "axios";

export const getAllByPlaylistId = async (playlistId) => {

    return await axios.get(`https://localhost:7130/PlaylistSong/GetAllByPlaylistId?playlistId=${playlistId}`)

}

export const deletePlaylistSong = async (playlistSongId) => {
    return await axios.post(`https://localhost:7130/PlaylistSong/DeleteById?id=${playlistSongId}`)
}

export const addSongToPlaylist = async (playlistId, songId) => {

    return await axios.post(
        `https://localhost:7130/PlaylistSong/Insert`,
        {
            "playlistId": playlistId,
            "songId": songId
        }



    )
}