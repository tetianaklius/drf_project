import {apiService, apiServiceAllowAny} from "./apiService";
import {urls} from "../constants/urls";


export const postLabelService = {
    getAll: async () => {
        const response = await apiService.get(urls.post_label.all)
        return response.data;
    }
}