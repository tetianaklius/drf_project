import {apiServiceAllowAny, apiServiceRefresh} from "./apiService";
import {urls} from "../constants/urls";


const _accessTokenKey = "access";
const _refreshTokenKey = "refresh";

const refreshService = {
    refresh: async () => {
        const token = authService.getRefreshToken()
        if (token) {
            const {data} = await apiServiceRefresh.post(urls.auth.refresh, {"refresh": token});
            localStorage.setItem(_accessTokenKey, data.access);
            localStorage.setItem(_refreshTokenKey, data.refresh);
            return data;
        }
    }
}

const authService = {
    async register(user) {
        const {data} = await apiServiceAllowAny.post(urls.auth.register, user)
        return data
    },

    async activate(token) {
        const {data} = await apiServiceAllowAny.patch(urls.auth.activate + token)
        return data;
    },

    async login(user) {
        const {data} = await apiServiceAllowAny.post(urls.auth.login, user);
        this.setTokens(data);
    },

    logout() {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    setTokens({refresh, access}) {
        localStorage.setItem(_accessTokenKey, access);
        localStorage.setItem(_refreshTokenKey, refresh);
    },

    getAccessToken() {
        return localStorage.getItem(_accessTokenKey);
    },

    getRefreshToken() {
        return localStorage.getItem(_refreshTokenKey);
    },
};

export {
    authService,
    refreshService,
};
