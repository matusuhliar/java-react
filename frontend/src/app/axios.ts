import axios, {AxiosHeaders, AxiosInstance} from "axios";
import {formDataForObj} from "../api/utils";

const TOKEN = 'jwtToken'
const REFRESH_TOKEN = 'jwtRefreshToken'

export const isTokenSet = () => {
    return !!localStorage.getItem(TOKEN);
}
export const setToken = (token: string,refreshToken: string) => {
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
}

let service:AxiosInstance | null = null;

const baseConfig = {
    baseURL: 'http://localhost:8080',
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
    }
};

export const axiosClient = () => {
    
    if(service !== null){
        return service;
    }
    
    service = axios.create(baseConfig)
    service.interceptors.request.use(
        config => {
            const accessToken = localStorage.getItem(TOKEN) || "";
            if (accessToken) {
                (config.headers as AxiosHeaders).set('Authorization', "Bearer " + accessToken);
            }
            return config;
        },
        error => {
            Promise.reject(error.response || error.message);
        }
    );

    service.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response.status === 401) {

                let originalRequest = error.config;
                let refreshToken = localStorage.getItem(REFRESH_TOKEN) || "";
                if (
                    refreshToken &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    return axios
                        .post(`/authenticate-refresh.json`, formDataForObj({
                            refreshToken: refreshToken
                        }),{
                            baseURL: 'http://localhost:8080',
                            timeout: 60000,
                            headers: {
                                'Access-Control-Allow-Origin':'*',
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        .then(res => {
                            if (res.status === 200) {
                                setToken(res.data.token,res.data.refreshToken);
                                originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;
                                return axios(originalRequest);
                            }
                        })
                        .catch(() => {
                            setToken("","");
                            window.location.reload();
                        });
                }
                return Promise.reject(error.response || error.message);
            }
        })

    return service;
}

