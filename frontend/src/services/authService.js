import {apiService, apiServiceAllowAny} from "./apiService";
import {urls} from "../constants/urls";

const _accessTokenKey = 'access';
const _refreshTokenKey = 'refresh';

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
        this._setTokens(data);
    },


    logout() {
        this.deleteTokens()
    },

    async refresh() {
        const token = this.getRefreshToken()
        if (token) {
            const {data} = await apiServiceAllowAny.post(urls.auth.refresh, {'refresh': token});
            this._setTokens(data);
        }
    },

    _setTokens({refresh, access}) {
        localStorage.setItem(_accessTokenKey, access);
        localStorage.setItem(_refreshTokenKey, refresh);
    },

    _getAccessToken() {
        return localStorage.getItem(_accessTokenKey);
    },

    getRefreshToken() {
        return localStorage.getItem(_refreshTokenKey);
    },

    deleteTokens() {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    getSocketToken() {
        return apiService.get(urls.auth.socket)
    },

}

export {
    authService
}