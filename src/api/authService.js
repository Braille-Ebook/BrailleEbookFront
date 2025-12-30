// src/api/authService.js

import * as authApi from '../api/authApi';
import { setAuthToken, clearAuthToken } from '../storage/tokenStorage';

/**
 * 서버 로그인 응답에 토큰이 명시되어 있지 않습니다.
 * 만약 서버가 { accessToken: "..."} 또는 { token: "..."} 형태로 준다면 아래에서 저장하면 됩니다.
 */
function extractToken(loginResponse) {
  return loginResponse?.accessToken || loginResponse?.token || null;
}

export async function join(payload) {
  return authApi.join(payload);
}

export async function login({ identifier, password }) {
  const res = await authApi.login({ identifier, password });
  const token = extractToken(res);
  if (token) await setAuthToken(token);
  return res;
}

export async function logout() {
  const res = await authApi.logout();
  await clearAuthToken();
  return res;
}

export async function findIdByEmail({ email }) {
  return authApi.findIdByEmail({ email });
}

export async function sendTempPassword({ email }) {
  return authApi.sendTempPassword({ email });
}

// 필요 기능들 그대로 노출
export const sendEmailCode = authApi.sendEmailCode;
export const verifyEmailCode = authApi.verifyEmailCode;
export const findEmailByUserId = authApi.findEmailByUserId;
export const resetPassword = authApi.resetPassword;
export const getKakaoLoginUrl = authApi.getKakaoLoginUrl;
export const getKakaoCallbackPath = authApi.getKakaoCallbackPath;