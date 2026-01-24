import { http } from './http';

export const getMypageInfo = async () => {
    const result = await http.get('/mypage/info');
    return result.data;
};
export const getMypageReviews = async () => {
    const result = await http.get('/mypage/reviews');
    return result.data;
};
export const getMypageBooks = async () => {
    const result = await http.get('/mypage/books');
    return result.data;
};
