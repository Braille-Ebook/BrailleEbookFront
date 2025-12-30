// src/api/httpClient.js
// 	•	fetch 공통화
//	•	에러 메시지 표준화(명세서의 message 우선)
//	•	토큰 자동 첨부 (있으면)

import { API_BASE_URL, DEFAULT_TIMEOUT_MS } from './config';
import { getAuthToken } from '../storage/tokenStorage';
import { ApiError } from '../utils/errors/apiError';

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new ApiError('요청 시간이 초과되었습니다.', { kind: 'TIMEOUT' })), ms);
    promise
      .then((res) => { clearTimeout(id); resolve(res); })
      .catch((err) => { clearTimeout(id); reject(err); });
  });
}

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function request(path, { method = 'GET', body, headers = {}, auth = false } = {}) {
  const url = `${API_BASE_URL}${path}`;

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (auth) {
    const token = await getAuthToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await withTimeout(
      fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
      }),
      DEFAULT_TIMEOUT_MS
    );
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', { kind: 'NETWORK' });
  }

  const json = await parseJsonSafe(res);

  if (!res.ok) {
    const msg = json?.message || `요청에 실패했습니다. (HTTP ${res.status})`;
    throw new ApiError(msg, { status: res.status, body: json, kind: 'API' });
  }

  return json;
}