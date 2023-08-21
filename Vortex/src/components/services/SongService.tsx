import axios from "axios";

export const getSongById = async (songId) => {

    return await axios.get(`https://localhost:7130/Song/GetById?id=${songId}`)

}

export const getSongByGenre = async (genreId) => {
    return await axios.get(`https://localhost:7130/Song/GetAllByGenreId?genreId=${genreId}`)
}

export const getAllSongs = async () => {
    return await axios.get(`https://localhost:7130/Song/GetAll`)
}

export const getSongsByAlbum = async (albumId) => {
    return await axios.get(`https://localhost:7130/Song/GetAllByAlbumId?albumId=${albumId}`)
}

export const deleteSongById = async (songId) => {
    return await axios.post(`https://localhost:7130/Song/DeleteById?id=${songId}`)
}


export const addSong = async (isrc, title, genreId, artistId, albumId, image, duration, availableMarkets) => {

    return await axios.post(
        `https://localhost:7130/Song/Insert`,
        {
            "isrc": isrc,
            "title": title,
            "genreId": genreId,
            "artistId": artistId,
            "albumId": albumId,
            "image": image,
            "duration": duration,
            "availableMarkets": availableMarkets
        }



    )
}