import axios from "axios";

export const getArtistById = async (artistId) => {

    return await axios.get(`https://localhost:7130/Artist/GetById?id=${artistId}`)

}

export const getAllArtists = async () => {
    return await axios.get(`https://localhost:7130/Artist/GetAll`)
}

export const addArtist = async (fullName, about, image) => {

    return await axios.post(
        `https://localhost:7130/Artist/Insert`,
        {
            "fullName": fullName,
            "about": about,
            "image": image
        }



    )
}