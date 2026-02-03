// src/api/config.js

import { API_BASE_URL as ENV_API_BASE_URL } from '@env';

export const API_BASE_URL = ENV_API_BASE_URL; // 환경 변수에서 API_BASE_URL을 가져옴
export const DEFAULT_TIMEOUT_MS = 15000;