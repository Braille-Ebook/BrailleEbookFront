import * as authApi from './authApi';
import { setAuthToken, clearAuthToken } from './http';

// 로그인 응답 내 토큰 필드명 변동 가능성 대응
function extractToken(loginResponse) {
  return loginResponse?.accessToken || loginResponse?.token || null;
}

export async function join(payload) {
  return authApi.join(payload);
}

export async function login(payload) {
  const data = await authApi.login(payload);
  const token = extractToken(data);
  if (token) await setAuthToken(token);
  return data;
}

export async function logout() {
  const data = await authApi.logout();
  await clearAuthToken();
  return data;
}

// 그대로 노출
export const sendEmailCode = authApi.sendEmailCode;
export const verifyEmailCode = authApi.verifyEmailCode;
export const findIdByEmail = authApi.findIdByEmail;
export const findEmailByUserId = authApi.findEmailByUserId;
export const sendTempPassword = authApi.sendTempPassword;
export const resetPassword = authApi.resetPassword;
export const getKakaoLoginUrl = authApi.getKakaoLoginUrl;
export const getKakaoCallbackPath = authApi.getKakaoCallbackPath;