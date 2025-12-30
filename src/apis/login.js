import { defaultAxios } from '../axios';

export const signUp = async (data) => {
    return await defaultAxios.post('/auth/join', data);
};
export const resetPW = async (data) => {
    return await defaultAxios.post('/auth/reset-password/temp', data);
};
