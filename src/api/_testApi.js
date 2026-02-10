import { http } from './http';

// [1] API 테스트
export async function testApiPing() {
  try {
    const res = await http.get('/'); // 루트 엔드포인트로 간단한 요청
    console.log('[API TEST SUCCESS]', res.status, res.data);
    return res.data;
  } catch (error) {
    console.error('[API TEST ERROR]', error);
    throw error;
  }
}
