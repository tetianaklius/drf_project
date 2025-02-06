import {urls} from "../constants/urls";
import {apiService} from "./apiService";

export const postService = {
    getAll: async () => {
        const response = await apiService.get(urls.posts.all)
        return response.data;
    },
    create: async (data) => {
        const response = await apiService.post(urls.posts.create, data)
        return response.data
    },
    update: async (id,data) => {
        const response = await apiService.patch(urls.posts.update(+id), data)
        return response.data
    },
    getById: async (id) => {
        const response = await apiService.get(urls.posts.byId(+id));
        return response.data;
    },
    getByUserId: async (id) => {
        const response = await apiService.get(urls.posts.byUserId(+id));
        return response.data;
    },
}
