import {urls} from "../constants/urls";
import {apiServiceAllowAny} from "./apiService";


export const cityService = {
    getByRegionId: async (id) => {
        const response = await apiServiceAllowAny.get(urls.cities.byRegion(+id))
        return response.data;
    },
    getAll: async () => {
        const response = await apiServiceAllowAny.get(urls.cities.all)
        return response.data;
    }
};
