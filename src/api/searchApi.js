import { http } from './http';

/**
 * [1] 책/저자 검색
 * GET /search/books?q={검색어}&page={page}
 */
export async function searchBooks(query, page = 1) {
  if (!query) throw new Error('검색어가 필요합니다.');
  const res = await http.get('/search/books', {
    params: { q: query, page },
  });
  return (
    res.data?.data ?? {
      items: [],
      pagination: {
        total: 0,
        page,
        limit: 20,
        hasNext: false,
        nextPage: null,
        nextUrl: null,
      },
    }
  );
}

/**
 * [2] 다음 페이지 (nextUrl 그대로 호출)
 */
export async function searchBooksByNextUrl(nextUrl) {
  if (!nextUrl) throw new Error('nextUrl이 필요합니다.');
  const res = await http.get(nextUrl);
  return res.data?.data ?? { items: [], pagination: null };
}
