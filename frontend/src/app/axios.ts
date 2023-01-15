import axios, {AxiosHeaders, AxiosInstance} from "axios";

const TOKEN = 'jwtToken'
const REFRESH_TOKEN = 'jwtRefreshToken'

export const isTokenSet = () => {
    return !!localStorage.getItem(TOKEN);
}
export const setToken = (token: string,refreshToken: string) => {
    const jwtToken = token;
    localStorage.setItem(TOKEN, jwtToken)
    localStorage.setItem(REFRESH_TOKEN, jwtToken)
}

let service:AxiosInstance | null = null;

export const axiosClient = () => {
    
    if(service !== null){
        return service;
    }
    
    service = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 60000,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    })
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
                        .post(`/authenticate-refresh.json`, {
                            refreshToken: refreshToken
                        })
                        .then(res => {
                            if (res.status === 200) {
                                setToken(res.data.data.token,res.data.data.refreshToken);
                                originalRequest.headers['Authorization'] = `Bearer ${res.data.data.token}`;
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

