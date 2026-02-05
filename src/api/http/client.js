import axios from 'axios';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  adapter: 'xhr',
});
