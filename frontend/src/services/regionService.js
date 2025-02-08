import {urls} from "../constants/urls";
import {apiServiceAllowAny} from "./apiService";


export const regionService = {
    getAll: async () => {
        const response = await apiServiceAllowAny.get(urls.regions.all)
        return response.data;
    }
};
