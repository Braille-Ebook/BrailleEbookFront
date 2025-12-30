import axios from 'axios';

const defaultAxios = axios.create({
    baseURL: 'http://3.39.231.229:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authAxios = axios.create({
    baseURL: 'http://3.39.231.229:3000/',
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
    },
});
authAxios.interceptors.request.use(
    (config) => {
        /*
        accessToken꺼내서 headers.Authorization의 Bearer에 넣어주기
        const accessToken = ''
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        */
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { defaultAxios, authAxios };
