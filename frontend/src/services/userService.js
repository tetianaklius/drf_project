import React from 'react';
import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const userService = {
    getAll: async () => {
        const response = await apiService.get(urls.users.all)
        return response.data;
    }
};

export {userService};