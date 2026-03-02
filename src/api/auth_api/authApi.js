import { http } from '../http';

/**
 * [1] 회원가입
 * POST /auth/join
 * body: { userId, email, nick, password }
 */
export function join({ userId, email, nick, password }) {
  return http.post('/auth/join', { userId, email, nick, password }).then((res) => res.data);
}

/**
 * [2] 로그인
 * POST /auth/login
 * body: { identifier, password }
 */
export function login({ identifier, password }) {
  return http.post('/auth/login', { identifier, password }).then((res) => res.data);
}

/**
 * [3] 로그아웃 (토큰 필요)
 * POST /auth/logout
 */
export function logout() {
  return http.post('/auth/logout').then((res) => res.data);
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
  return http.post('/auth/send-code', { email }).then((res) => res.data);
}

/**
 * [7] 이메일 인증코드 확인
 */
export function verifyEmailCode({ email, code }) {
  return http.post('/auth/verify-code', { email, code }).then((res) => res.data);
}

/**
 * [8] 이메일로 아이디 찾기
 */
export function findIdByEmail({ email }) {
  return http.post('/auth/find-id', { email }).then((res) => res.data);
}

/**
 * [9] 아이디로 이메일 찾기
 */
export function findEmailByUserId({ userId }) {
  return http.post('/auth/find-email', { userId }).then((res) => res.data);
}

/**
 * [10] 임시 비밀번호 전송
 */
export function sendTempPassword({ email }) {
  return http.post('/auth/reset-password/temp', { email }).then((res) => res.data);
}

/**
 * [11] 비밀번호 변경 (토큰 필요)
 */
export function resetPassword({ currentPassword, newPassword }) {
  return http.patch('/auth/reset-password', { currentPassword, newPassword }).then((res) => res.data);
}
