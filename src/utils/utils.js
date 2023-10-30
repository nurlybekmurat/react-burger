import { API_URL } from '../constants/constants';

export const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
}

export const loadPost = async (url) => {
  const response = await fetch(url);
  return await checkResponse(response);
}

export const registerUser = async (name, email, password) => {
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

export const recoverPasswordHelper = async (email) => {
  const response = await fetch(`${API_URL}password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email
    })
  });
  return await checkResponse(response);
}

export const resetPasswordHelper = async (pass, token) => {
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


export const loginUser = async (email, password) => {
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

export const getUser = async (token) => {
  const response = await fetch(`${API_URL}auth/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return await checkResponse(response);
}

const refreshToken = (token) => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (
      err.message === 'jwt expired' || err.message === 'jwt malformed' || err.message === 'Token is invalid' || err.message === 'invalid token'
      ) {
      const refreshData = await refreshToken(getCookie('refreshToken'));
      await checkResponse(refreshData)
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

export const postOrder = async (body, token) => {
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

export function setCookie(name, value, age) {
  if (value === null) {
    return document.cookie = `${name}=${'value'}; path=/; max-age=${age}`
  } if (name === 'token') {
    const authToken = value.split('Bearer ')[1];
    document.cookie = `${name}=${authToken}; path=/`
  } if (name === 'refreshToken') {
    document.cookie = `${name}=${value}; path=/`
  }
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, -1);
}