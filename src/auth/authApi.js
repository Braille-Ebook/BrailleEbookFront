// src/api/auth/authApi.js

import { http } from '../http';

// [1] 회원가입
export async function join(payload) {
  const res = await http.post('/auth/join', payload);
  return res.data;
}

// [2] 로그인
export async function login(payload) {
  const res = await http.post('/auth/login', payload);
  return res.data;
}

// [3] 로그아웃 (토큰 자동 첨부)
export async function logout() {
  const res = await http.post('/auth/logout');
  return res.data;
}

// [4] 카카오 로그인 URL(그대로 유지)
export function getKakaoLoginUrl() {
  return '/auth/kakao';
}

export function getKakaoCallbackPath() {
  return '/auth/kakao/callback';
}

// [6] 이메일 인증코드 발송
export async function sendEmailCode(payload) {
  const res = await http.post('/auth/send-code', payload);
  return res.data;
}

// [7] 이메일 인증코드 확인
export async function verifyEmailCode(payload) {
  const res = await http.post('/auth/verify-code', payload);
  return res.data;
}

// [8] 이메일로 아이디 찾기
export async function findIdByEmail(payload) {
  const res = await http.post('/auth/find-id', payload);
  return res.data;
}

// [9] 아이디로 이메일 찾기
export async function findEmailByUserId(payload) {
  const res = await http.post('/auth/find-email', payload);
  return res.data;
}

// [10] 임시 비밀번호 전송
export async function sendTempPassword(payload) {
  const res = await http.post('/auth/reset-password/temp', payload);
  return res.data;
}

// [11] 비밀번호 변경
export async function resetPassword(payload) {
  const res = await http.patch('/auth/reset-password', payload);
  return res.data;
}