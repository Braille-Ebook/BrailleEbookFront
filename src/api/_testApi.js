import { http } from './http';

export async function testApiPing() {
  const res = await http.get('/');
  console.log('[API TEST SUCCESS]', res.status, res.data);
  return res.data;
}

import { testApiPing } from '@/api/testApi';

useEffect(() => {
  testApiPing().catch((e) => {
    console.log('[API TEST ERROR]', e);
  });
}, []);
