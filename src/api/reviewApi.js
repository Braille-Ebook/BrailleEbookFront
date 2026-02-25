import { http } from './http';

export const getReviews = async ({ bookId }) => {
    const result = await http.get(`/book/${bookId}/review`);
    return result.data;
};
export const postReviews = async ({ bookId, body }) => {
    const result = await http.post(`/book/${bookId}/review`, body);
    return result.data;
};
export const patchReviews = async ({ bookId, reviewId, body }) => {
    const result = await http.patch(`/book/${bookId}/review/${reviewId}`, body);
    return result.data;
};
export const deleteReviews = async ({ bookId, reviewId }) => {
    const result = await http.delete(`/book/${bookId}/review/${reviewId}`);
    return result.data;
};
export const likeReviews = async ({ bookId, reviewId }) => {
    const result = await http.post(`/book/${bookId}/review/${reviewId}/like`);
    return result.data;
};
