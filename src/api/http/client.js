// src/api/http/client.js

import axios from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT_MS } from './config';

export const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT_MS,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
