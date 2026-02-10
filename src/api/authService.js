import * as authApi from './authApi';
import { setAuthToken, clearAuthToken } from '../http';

// 로그인 응답에서 토큰을 추출하는 함수
function extractToken(loginResponse) {
  return loginResponse?.accessToken || loginResponse?.token || null;
}

export async function join(payload) {
  // [회원가입] API 호출
  return authApi.join(payload);
}

export async function login({ identifier, password }) {
  // [로그인] API 호출
  const data = await authApi.login({ identifier, password });
  const token = extractToken(data);  // 응답에서 토큰 추출
  if (token) await setAuthToken(token);  // 토큰 저장
  return data;  // 로그인 성공 응답 반환
}

export async function logout() {
  // [로그아웃] API 호출
  const data = await authApi.logout();
  await clearAuthToken();  // 토큰 삭제
  return data;  // 로그아웃 성공 응답 반환
}

export const sendEmailCode = authApi.sendEmailCode;  // 이메일 인증코드 발송
export const verifyEmailCode = authApi.verifyEmailCode;  // 이메일 인증코드 확인
export const findIdByEmail = authApi.findIdByEmail;  // 이메일로 아이디 찾기
export const findEmailByUserId = authApi.findEmailByUserId;  // 아이디로 이메일 찾기
export const sendTempPassword = authApi.sendTempPassword;  // 임시 비밀번호 전송
export const resetPassword = authApi.resetPassword;  // 비밀번호 변경
export const getKakaoLoginUrl = authApi.getKakaoLoginUrl;  // 카카오 로그인 URL
export const getKakaoCallbackPath = authApi.getKakaoCallbackPath;  // 카카오 로그인 콜백 경로
