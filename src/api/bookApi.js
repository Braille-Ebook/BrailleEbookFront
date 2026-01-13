// src/api/bookApi.js
import apiClient from './apiClient';

// 최근에 읽은 책
export const getRecentBooks = async () => {
  const res = await apiClient.get('/home/recent');
  return res.data.data;
};

// 추천 책 (토큰 필요)
export const getRecommendBooks = async () => {
  const res = await apiClient.get('/home/recommend');
  return res.data.data;
};

// 인기 도서
export const getPopularBooks = async () => {
  const res = await apiClient.get('/home/popular');
  return res.data.data;
};

// 신간 도서 
export const getNewBooks = async () => {
  const res = await apiClient.get('/home/new');
  return res.data.data;
};

// // 장르별 도서 
// export const getgenreBooks = async () => {
//   const res = await apiClient.get('/home/genre?gerne=장르이름');
//   return res.data.data;
// };