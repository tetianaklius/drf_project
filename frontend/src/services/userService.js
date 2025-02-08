import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const userService = {
    getAll: async () => {
        const response = await apiService.get(urls.users.all)
        return response.data;
    },
    search: async (params) => {
        try {
            const response = await apiService.get(urls.users.search(params))
            return response.data;
        } catch (err) {
            return err.response
        }
    }
};

export {userService};
