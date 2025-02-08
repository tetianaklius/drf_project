import axios from "axios";

import {baseURL} from "../constants/urls";


const apiServiceAllowAny = axios.create({baseURL})
const apiService = axios.create({baseURL})
const apiServiceRefresh = axios.create({baseURL})

apiService.interceptors.request.use(
    (req) => {
        const accessToken = localStorage.getItem("access");

        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {
    apiService,
    apiServiceAllowAny,
    apiServiceRefresh,
}
