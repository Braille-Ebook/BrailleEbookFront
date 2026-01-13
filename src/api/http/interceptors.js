// src/api/http/interceptors.js

import { http } from './client';
import { getAuthToken, clearAuthToken } from './tokenStorage';
import { ApiError } from './errors';

export function attachInterceptors() {
  // Request: 토큰 자동 첨부 (토큰 있으면 항상 붙이는 방식 권장)
  http.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response: 에러 표준화
  http.interceptors.response.use(
    (res) => res,
    async (error) => {
      // timeout
      if (error?.code === 'ECONNABORTED') {
        throw new ApiError('요청 시간이 초과되었습니다.', { kind: 'TIMEOUT' });
      }

      // network (서버 응답 자체가 없는 경우가 흔함)
      if (!error?.response) {
        throw new ApiError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', { kind: 'NETWORK' });
      }

      const status = error.response.status;
      const data = error.response.data;

      // 서버 message 우선
      const msg = data?.message || `요청에 실패했습니다. (HTTP ${status})`;

      // 401 처리 정책(현재는 “토큰 제거”까지만; refresh가 필요하면 여기에 확장)
      if (status === 401) {
        // 선택: 자동 로그아웃 정책이면 토큰 제거
        await clearAuthToken();
      }

      throw new ApiError(msg, { kind: 'API', status, body: data });
    }
  );
}