import * as authApi from './authApi';
import { http, setAuthToken, clearAuthToken } from './http';
import { API_BASE_URL } from './http/config';

// 로그인 응답 내 토큰 필드명 변동 가능성 대응
function extractToken(loginResponse) {
    return loginResponse?.accessToken || loginResponse?.token || null;
}

export const KAKAO_REDIRECT_URI = 'brailleebookfront://auth/kakao/callback';
export const KAKAO_SERVER_CALLBACK_URI = buildAbsoluteUrl(
    authApi.getKakaoCallbackPath()
);

function buildAbsoluteUrl(path) {
    return `${API_BASE_URL}${path}`;
}

function getUrlParams(url) {
    const [withoutHash, hash = ''] = url.split('#');
    const [, query = ''] = withoutHash.split('?');
    const queryParams = new URLSearchParams(query);
    const hashParams = new URLSearchParams(hash);

    return {
        get(key) {
            return queryParams.get(key) || hashParams.get(key);
        },
    };
}

export async function join(payload) {
    //await logout();
    return authApi.join(payload);
}

export async function login(payload) {
    //await logout();
    const data = await authApi.login(payload);
    const token = extractToken(data);
    if (token) await setAuthToken(token);
    return data;
}

export async function logout() {
    const data = await authApi.logout();
    await clearAuthToken();
    return data;
}

export function buildKakaoLoginUrl(redirectUri = null) {
    const kakaoLoginUrl = buildAbsoluteUrl(authApi.getKakaoLoginUrl());

    if (!redirectUri) {
        return kakaoLoginUrl;
    }

    return `${kakaoLoginUrl}?redirect_uri=${encodeURIComponent(redirectUri)}`;
}

export function parseKakaoCallback(url) {
    if (!url || !url.startsWith(KAKAO_REDIRECT_URI)) {
        return null;
    }

    const params = getUrlParams(url);
    const code = params.get('code');
    const state = params.get('state');
    const token =
        params.get('accessToken') ||
        params.get('token') ||
        params.get('authToken');
    const error =
        params.get('error_description') ||
        params.get('error') ||
        params.get('message');

    return { code, state, token, error };
}

export async function completeSocialLogin(token) {
    if (!token) return false;
    await setAuthToken(token);
    return true;
}

export async function completeKakaoLoginFromCode({ code, state } = {}) {
    if (!code) return null;

    const res = await http.get(authApi.getKakaoCallbackPath(), {
        params: {
            code,
            state,
            // Kakao REST API redirect_uri must match the server callback URI
            // that was used when requesting the authorization code.
            redirect_uri: KAKAO_SERVER_CALLBACK_URI,
        },
    });
    const data = res.data;
    const token = extractToken(data);

    if (token) {
        await setAuthToken(token);
    }

    return data;
}

// 그대로 노출
export const sendEmailCode = authApi.sendEmailCode;
export const verifyEmailCode = authApi.verifyEmailCode;
export const findIdByEmail = authApi.findIdByEmail;
export const findEmailByUserId = authApi.findEmailByUserId;
export const sendTempPassword = authApi.sendTempPassword;
export const resetPassword = authApi.resetPassword;
export const getKakaoCallbackPath = authApi.getKakaoCallbackPath;
