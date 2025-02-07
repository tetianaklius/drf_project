import {urls} from "../constants/urls";
import {apiServiceAllowAny} from "./apiService";

export const cityService = {
    getById: async (id) => {
        const response = await apiServiceAllowAny.get(urls.cities.all(+id))
        return response.data;
    }
}