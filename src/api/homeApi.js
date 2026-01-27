import { http } from './http';

/**
 * [1] 최근에 읽은 책
 * GET /home/recent
 * (로그인 여부 관계없이 요청 가능)
 */
export async function getRecentBooks() {
  const res = await http.get('/home/recent');
  return res.data;
}

/**
 * [2] 추천 도서 (로그인 필요)
 * GET /home/recommend
 */
export async function getRecommendedBooks() {
  const res = await http.get('/home/recommend');
  return res.data;
}

/**
 * [3] 인기 도서
 * GET /home/popular
 */
export async function getPopularBooks() {
  const res = await http.get('/home/popular');
  return res.data;
}

/**
 * [4] 신간 도서
 * GET /home/new
 */
export async function getNewBooks() {
  const res = await http.get('/home/new');
  return res.data;
}

/**
 * [5] 장르별 도서
 * GET /home/genre?genre={장르이름}
 */
export async function getBooksByGenre(genre) {
  if (!genre) throw new Error('장르 이름이 필요합니다.');
  const res = await http.get('/home/genre', { params: { genre } });
  return res.data;
}