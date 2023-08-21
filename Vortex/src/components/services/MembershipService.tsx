import axios from "axios";

export const getMembershipByUser = async (userId) => {


    return await axios.get(`https://localhost:7130/Membership/GetByUserId?userId=${userId}`)
}

export const getMembershipType = async (membershipTypeId) => {
    return await axios.get(`https://localhost:7130/MembershipType/GetById?id=${membershipTypeId}`)
}

export const getAllMembership = async () => {


    return await axios.get(`https://localhost:7130/MembershipType/GetAll`)
}