// src/api/httpClient.js
import { http } from './http';

export async function request(path, options = {}) {
  const {
    method = 'GET',
    body,
    params,
    headers,
    // auth는 지금 인터셉터에서 자동으로 토큰 붙이니까,
    // 옵션으로 받아도 사실상 필요 없음 (호환용으로만 둠)
    auth,
  } = options;

  const res = await http.request({
    url: path,
    method,
    data: body,
    params,          // *********** genre 같은 query string 지원
    headers,
  });

  return res.data;
}
