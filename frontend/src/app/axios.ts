import axios, {AxiosHeaders} from "axios";

export const getToken = () => {
    return sessionStorage.getItem('jwtToken') || "";
}

export const setToken = (token: string) => {
    const jwtToken = token;
    sessionStorage.setItem('jwtToken', jwtToken)
}

export const axiosClient = () => {
    const service = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 60000,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    })
    service.interceptors.request.use(
        config => {
            const accessToken = getToken();
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
                setToken("");
                window.location.reload()
            }
            return Promise.reject(error.response || error.message);
        })

    return service;
}

