import { http } from './http';

export const getBookById = async (bookId) => {
    const res = await http.get(`/book/${bookId}`);
    return res.data?.data ?? null;
};

export const toggleBookBookmark = async (bookId) => {
    const res = await http.post(`/book/${bookId}/bookmark`);
    return res.data;
};

export const startBook = async (bookId) => {
    const res = await http.post(`/book/${bookId}/start`);
    return res.data;
};

export const getBookProgress = async (bookId) => {
    const res = await http.get(`/book/${bookId}/progress`);
    return res.data?.data ?? null;
};
