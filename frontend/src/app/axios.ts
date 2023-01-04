import axios from "axios";

export const getToken = () => {
    return sessionStorage.getItem('jwtToken') || "";
}

export const setToken = (token: string) => {
    const jwtToken = "Bearer " + token;
    sessionStorage.setItem('jwtToken', jwtToken)
}

export const axiosClient = () => {
    const token = getToken();
    if (token !== "") {
        return axios.create({
            timeout: 5000,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
    } else {
        return axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

