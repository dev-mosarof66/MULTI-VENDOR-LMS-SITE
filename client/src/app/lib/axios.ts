import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});
