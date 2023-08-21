import axios from "axios";

export const getById = async (countryId) => {


    return await axios.get(`https://localhost:7130/Country/GetById?id=${countryId}`)
}

export const getAllCountries = async () => {
    return await axios.get(`https://localhost:7130/Country/GetAll`)
}

export const addCountry = async (countryName) => {

    return await axios.post(
        `https://localhost:7130/Country/Insert`,
        {
            "countryName": countryName,

        }



    )
}


