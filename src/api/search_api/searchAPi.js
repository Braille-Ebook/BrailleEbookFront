// src/api/searchApi.js
import { request } from './httpClient';
import { API_BASE_URL } from './config';

/**
 * 1) 책/저자 검색
 *   GET /search/books?q={q}
 *
 * 2) 다음 페이지
 *   GET /search/books?q={q}&page={page}
 *
 * 3) 서버가 주는 nextUrl 그대로 호출
 *   nextUrl: "/search/books?q=%EA%B3%BC%ED%95%99&page=2"
 */

/** 기본 검색 (+페이지 옵션) */
export function searchBooks({ q, page }) {
  return request('/search/books', {
    method: 'GET',
    params: {
      q,
      ...(page ? { page } : {}),
    },
  });
}

/**
 * nextUrl 그대로 호출
 * - nextUrl이 "/search/books?..." 면 그대로 request에 넣으면 됨
 * - nextUrl이 "http://..." 처럼 절대 URL이면, baseURL을 제거하고 path만 남겨서 호출
 */
export function searchBooksByNextUrl({ nextUrl }) {
  if (!nextUrl) throw new Error('nextUrl is required');

  // 절대 URL로 오면(baseURL 포함) -> path만 추출
  const normalizedBase = API_BASE_URL?.replace(/\/$/, '') ?? '';
  const url = nextUrl.startsWith('http')
    ? nextUrl.replace(normalizedBase, '')
    : nextUrl;

  return request(url, { method: 'GET' });
}
