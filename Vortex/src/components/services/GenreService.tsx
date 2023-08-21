import axios from "axios";

export const getGenreById = async (genreId) => {

    return await axios.get(`https://localhost:7130/Genre/GetById?id=${genreId}`)

}

export const getAllGenres = async () => {

    return await axios.get(`https://localhost:7130/Genre/GetAll`)

}

export const addGenre = async (title) => {

    return await axios.post(
        `https://localhost:7130/Genre/Insert`,
        {
            "title": title,

        }



    )
}