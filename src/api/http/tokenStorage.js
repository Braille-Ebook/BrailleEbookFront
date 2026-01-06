// src/api/tokenStorage.js
// 로그인 응답에 토큰이 명시되지 않았으니 서버에서 토큰을 어디로 주는지에 따라 저장 로직은 조정이 필요
// 필요 패키지: npm i @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'AUTH_TOKEN';

export async function setAuthToken(token) {
  if (!token) return AsyncStorage.removeItem(KEY);
  return AsyncStorage.setItem(KEY, token);
}

export async function getAuthToken() {
  return AsyncStorage.getItem(KEY);
}

export async function clearAuthToken() {
  return AsyncStorage.removeItem(KEY);
}