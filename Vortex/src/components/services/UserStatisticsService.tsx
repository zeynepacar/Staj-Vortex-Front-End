import axios from "axios";

export const getUserStatisticsById = async (userId) => {


    return await axios.get(`https://localhost:7130/UserStatistic/GetUserStatisticByUserId?id=${userId}`)
}