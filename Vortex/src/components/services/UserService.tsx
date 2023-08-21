import axios from "axios";

export const updatePassword = async (userId, oldPassword, newPassword, newPasswordRepeat) => {
    return await axios.put(
        `https://localhost:7130/User/UpdatePassword`,
        {
            "id": userId,
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "newPasswordRepeat": newPasswordRepeat
        }



    )
}

export const signIn = async (loginCredential, password) => {


    return await axios.post(
        `https://localhost:7130/User/LogIn`,
        {
            "loginCredential": loginCredential,
            "password": password
        }
    )

}

export const getAllUsers = async () => {

    return await axios.get(`https://localhost:7130/User/GetAllActiveUsers`)


}



export const getFreeUsers = async () => {

    return await axios.get(`https://localhost:7130/User/GetAllFreeUsers`)


}

export const getPremiumUsers = async () => {

    return await axios.get(`https://localhost:7130/User/GetAllPremiumUsers`)


}

export const getStudentUsers = async () => {

    return await axios.get(`https://localhost:7130/User/GetAllStudentUsers`)


}

export const getUserById = async (userId) => {


    return await axios.get(`https://localhost:7130/User/GetById?id=${userId}`)
}

export const deleteUserById = async (userId) => {
    return await axios.post(`https://localhost:7130/User/DeleteById?id=${userId}`)
}

export const addUser = async (userName, email, password, image, countryId) => {

    return await axios.post(
        `https://localhost:7130/User/Insert`,
        {
            "userName": userName,
            "email": email,
            "password": password,
            "image": image,
            "countryId": countryId
        }



    )
}