import { http } from './http';

export const getLibraryInfo = async () => {
    const result = await http.get('/library');
    return result.data;
};
