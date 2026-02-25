import { http } from './http';

export const getLastPosition = async ({ bookId }) => {
    const result = await http.get(`/content/${bookId}/last`);
    return result.data;
};
export const postLastPosition = async ({ bookId, position }) => {
    const result = await http.post(`/content/${bookId}/last`, position);
    return result.data;
};
export const postPageBookmark = async ({ bookId, page }) => {
    const result = await http.post(`/content/${bookId}/bookmark?page=${page}`);
    return result.data;
};
export const getPageBookmarks = async ({ bookId }) => {
    const result = await http.get(`/content/${bookId}/bookmark`);
    return result.data;
};
export const deletePageBookmark = async (bookId, page) => {
    const result = await http.delete(
        `/content/${bookId}/bookmark?page=${page}`
    );
    return result.data;
};
export const getPdfPage = async ({ bookId, page }) => {
    const result = await http.get(`/content/${bookId}?page=${page}`);
    return result.data;
};
