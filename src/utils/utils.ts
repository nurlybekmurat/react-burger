import { API_URL } from '../constants/constants';
import { TElementIngredient } from './types';

type TRefreshData = {
  success: boolean,
  accessToken: string,
  refreshToken: string
}

export const getIngredientImages = (ingredients: Array<TElementIngredient>, ids: Array<string>) => {
  const urls: Array<TElementIngredient> = [];
  ingredients.forEach(item => {
    if (ids.includes(item._id)) {
      urls.push(item)
    }
  })
  return urls;
}

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
}

export const request = (endpoint: RequestInfo, options: RequestInit) => {
  return fetch(`${API_URL}${endpoint}`, options).then(res => checkResponse(res))
}

export const getUser = async (token: string) => {
  return await request('auth/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
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