import {apiService, apiServiceAllowAny} from "./apiService";
import {urls} from "../constants/urls";


const userService = {
    create: async (user) => {
        const {data} = await apiServiceAllowAny.post(urls.users.create, user)
        return data
    },
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
    },

    update: async (id, data) => {
        try {
            const response = await apiService.patch(urls.users.byId(+id), data)
            return response.data;
        } catch (err) {
            return err.response
        }
    },
    my_profile: async (params) => {
        try {
            const response = await apiService.get(urls.users.my_profile)
            return response.data;
        } catch (err) {
            return err.response
        }
    }
};

export {userService};
