import axios from "axios";

export const getSystemStatistic = async () => {

    return await axios.get(`https://localhost:7130/AdminPanel/GetSystemStatistic`)

}

export const getTotalIncome = async () => {

    return await axios.get(`https://localhost:7130/AdminPanel/GetTotalIncome`)

}

export const getProfitOrLoss = async () => {

    return await axios.get(`https://localhost:7130/AdminPanel/CalculateProfitAndLoss`)

}

