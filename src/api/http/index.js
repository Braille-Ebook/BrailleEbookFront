// src/api/http/index.js

import { http } from './client';
import { attachInterceptors } from './interceptors';

attachInterceptors();

export { http };
export * from './tokenStorage';
export * from './errors';