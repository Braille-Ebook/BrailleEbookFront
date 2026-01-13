import { http } from './http';

/**
 * [1] 회원가입
 */
export async function join(payload) {
  const res = await http.post('/auth/join', payload);
  return res.data;
}

/**
 * [2] 로그인
 */
export async function login(payload) {
  const res = await http.post('/auth/login', payload);
  return res.data;
}

/**
 * [3] 로그아웃 (토큰 자동 첨부)
 */
export async function logout() {
  const res = await http.post('/auth/logout');
  return res.data;
}

/**
 * [4~5] 카카오 로그인/콜백 URL 반환
 */
export const getKakaoLoginUrl = () => '/auth/kakao';
export const getKakaoCallbackPath = () => '/auth/kakao/callback';

/**
 * [6~10] 이메일 관련 API
 */
export async function sendEmailCode(payload) {
  const res = await http.post('/auth/send-code', payload);
  return res.data;
}

export async function verifyEmailCode(payload) {
  const res = await http.post('/auth/verify-code', payload);
  return res.data;
}

export async function findIdByEmail(payload) {
  const res = await http.post('/auth/find-id', payload);
  return res.data;
}

export async function findEmailByUserId(payload) {
  const res = await http.post('/auth/find-email', payload);
  return res.data;
}

export async function sendTempPassword(payload) {
  const res = await http.post('/auth/reset-password/temp', payload);
  return res.data;
}

/**
 * [11] 비밀번호 변경 (토큰 자동 첨부)
 */
export async function resetPassword(payload) {
  const res = await http.patch('/auth/reset-password', payload);
  return res.data;
}