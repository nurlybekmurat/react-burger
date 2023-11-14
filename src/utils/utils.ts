import { API_URL } from '../constants/constants';
import { TElement } from './types';

type TRefreshData = {
  success: boolean,
  accessToken: string,
  refreshToken: string
}

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
}

export const loadPost = async (url: string) => {
  const response = await fetch(url);
  return await checkResponse(response);
}

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    })
  });
  return await checkResponse(response);
}

export const recoverPasswordHelper = async (email: string) => {
  const response = await fetch(`${API_URL}password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email
    })
  });
  return await checkResponse(response);
}

export const resetPasswordHelper = async (pass: string, token: string) => {
  const response = await fetch(`${API_URL}password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "password": pass,
      "token": token
    })
  });
  return await checkResponse(response);
}


export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'email': email,
      'password': password,
    })
  });
  return await checkResponse(response);
}

export const getUser = async (token: string) => {
  const response = await fetch(`${API_URL}auth/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return await checkResponse(response);
}

const refreshToken = (token: string) => {
  return fetch(`${API_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'token': `${token}`,
    })
  })
}

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if ( 
      (err as { message: string }).message === 'jwt expired' || 
      (err as { message: string }).message === 'jwt malformed' || 
      (err as { message: string }).message === 'Token is invalid' || 
      (err as { message: string }).message === 'invalid token'
      ) {
      const refreshData = await refreshToken(getCookie('refreshToken')!);
      await checkResponse<TRefreshData>(refreshData)
        .then((refreshData) => {
          options.headers.Authorization = refreshData.accessToken
          setCookie('token', refreshData.accessToken);
          setCookie('refreshToken', refreshData.refreshToken)
        })
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
        return Promise.reject(err);
    }
  }
}

export const postOrder = async (body: TElement[], token: string) => {
  const response = await fetch(`${API_URL}orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ingredients: body
    })
  });
  if (!response.ok) {
    const message = `Ошибка: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export function setCookie(name: string, value: string | null, age?: number) {
  if (value === null) {
    return document.cookie = `${name}=${'value'}; path=/; max-age=${age}`
  } if (name === 'token') {
    const authToken = value.split('Bearer ')[1];
    document.cookie = `${name}=${authToken}; path=/`
  } if (name === 'refreshToken') {
    document.cookie = `${name}=${value}; path=/`
  }
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, -1);
}