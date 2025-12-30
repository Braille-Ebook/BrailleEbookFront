import { defaultAxios } from '../axios';

export const signUp = async (data) => {
    return await defaultAxios.post('/auth/join', data);
};
