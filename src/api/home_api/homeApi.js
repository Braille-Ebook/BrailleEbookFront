// src/api/homeApi.js
import { request } from '../_httpClient';

/*
 * 1) 최근에 읽은 책: GET /home/recent
 *    - 로그인 O: data 배열에 최근 읽은 책들
 *    - 로그인 X: data: [] + message "로그인하지 않은 사용자입니다."
 *    - 토큰이 있으면 자동 첨부되게 (auth: true)로 호출하는 게 안전함
 */
export function getRecentBooks() {
    return request('/home/recent', {
        method: 'GET',
        auth: true, // 토큰 있으면 붙이고, 없으면 서버가 "로그인 안 함"으로 처리
    });
}

/**
 * 2) 추천 책: GET /home/recommend
 *   - 명세에 토큰 여부가 없어서 일단 auth 없이 호출
 *   - 만약 추천이 로그인 기반이면 auth: true로 바꾸면 됨
 */
export function getRecommendBooks() {
    return request('/home/recommend', {
        method: 'GET',
    });
}

/*
 * 3) 인기도서: GET /home/popular
 */
export function getPopularBooks() {
    return request('/home/popular', {
        method: 'GET',
    });
}

/*
 * 4) 신간도서: GET /home/new
 */
export function getNewBooks() {
    return request('/home/new', {
        method: 'GET',
    });
}

/**
 * 5) 장르별 도서: GET /home/genre?genre=장르이름
 *    - httpClient가 params 지원하면 params로 보내는 게 한글 이슈 방지에 좋음.
 */
export function getBooksByGenre({ genre }) {
    return request('/home/genre', {
        method: 'GET',
        params: { genre }, // 장르이름
    });
}
