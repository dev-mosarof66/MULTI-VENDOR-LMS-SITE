import axios from "axios";

const URI = 'https://codemy-vgz4.onrender.com';
console.log(URI)
export const axiosInstance = axios.create({
    baseURL: `${URI}/api/v1`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});
