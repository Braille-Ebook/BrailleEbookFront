// src/api/authApi.js
import { request } from '../_httpClient';

/**
 * [1] 회원가입
 * POST /auth/join
 * body: { userId, email, nick, password }
 */
export function join({ userId, email, nick, password }) {
    return request('/auth/join', {
        method: 'POST',
        body: { userId, email, nick, password },
    });
}

/**
 * [2] 로그인
 * POST /auth/login
 * body: { identifier, password }
 */
export function login({ identifier, password }) {
    return request('/auth/login', {
        method: 'POST',
        body: { identifier, password },
    });
}

/**
 * [3] 로그아웃 (토큰 필요)
 * POST /auth/logout
 */
export function logout() {
    return request('/auth/logout', {
        method: 'POST',
        auth: true,
    });
}

/**
 * [4] 카카오 로그인 (GET /auth/kakao)
 * RN에서는 보통 웹뷰/딥링크로 열어야 함. 여기서는 URL만 반환하도록 둠.
 */
export function getKakaoLoginUrl() {
    return '/auth/kakao';
}

/**
 * [5] 카카오 콜백 처리 (GET /auth/kakao/callback)
 * RN에서는 보통 웹뷰/딥링크로 열어야 함. 여기서는 URL만 반환하도록 둠.
 */
export function getKakaoCallbackPath() {
    return '/auth/kakao/callback';
}

/**
 * [6] 이메일 인증코드 발송
 */
export function sendEmailCode({ email }) {
    return request('/auth/send-code', {
        method: 'POST',
        body: { email },
    });
}

/**
 * [7] 이메일 인증코드 확인
 */
export function verifyEmailCode({ email, code }) {
    return request('/auth/verify-code', {
        method: 'POST',
        body: { email, code },
    });
}

/**
 * [8] 이메일로 아이디 찾기
 */
export function findIdByEmail({ email }) {
    return request('/auth/find-id', {
        method: 'POST',
        body: { email },
    });
}

/**
 * [9] 아이디로 이메일 찾기
 */
export function findEmailByUserId({ userId }) {
    return request('/auth/find-email', {
        method: 'POST',
        body: { userId },
    });
}

/**
 * [10] 임시 비밀번호 전송
 */
export function sendTempPassword({ email }) {
    return request('/auth/reset-password/temp', {
        method: 'POST',
        body: { email },
    });
}

/**
 * [11] 비밀번호 변경 (토큰 필요)
 */
export function resetPassword({ currentPassword, newPassword }) {
    return request('/auth/reset-password', {
        method: 'PATCH',
        body: { currentPassword, newPassword },
        auth: true,
    });
}
