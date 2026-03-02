// src/api/authValidators.js

export function validateJoin({ userId, email, nick, password, checkPw }) {
  if (!userId?.trim()) return '아이디는 필수 입력 항목입니다.';
  if (!email?.trim()) return '이메일은 필수 입력 항목입니다.';
  if (!nick?.trim()) return '닉네임은 필수 입력 항목입니다.';
  if (!password) return '비밀번호는 필수 입력 항목입니다.';
  if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
  if (password !== checkPw) return '비밀번호가 일치하지 않습니다.';
  return null;
}

export function validateLogin({ identifier, password }) {
  if (!identifier?.trim()) return '아이디(이메일 또는 아이디)를 입력해주세요.';
  if (!password) return '비밀번호를 입력해주세요.';
  return null;
}

export function validateEmailOnly(email) {
  if (!email?.trim()) return '이메일을 올바르게 입력해주세요.';
  return null;
}