import axios from "axios";
import {baseURL} from "../constants/urls";

export const apiService = axios.create({baseURL})
export const apiServiceAllowAny = axios.create({baseURL})


apiService.interceptors.request.use(req => {
    const token = localStorage.getItem("access");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})
