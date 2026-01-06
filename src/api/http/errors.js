// src/api/http/errors.js

export class ApiError extends Error {
  constructor(message, { kind = 'UNKNOWN', status, body } = {}) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;     // 'NETWORK' | 'TIMEOUT' | 'API' | 'UNKNOWN'
    this.status = status; // HTTP status
    this.body = body;     // server error payload
  }
}