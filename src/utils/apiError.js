// src/utils/apiError.js

export class ApiError extends Error {
  constructor(message, { status = null, body = null, kind = 'API' } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
    this.kind = kind; // 'API' | 'NETWORK' | 'TIMEOUT'
  }
}