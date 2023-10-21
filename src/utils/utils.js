import { API_URL } from "../constants/constants";

export const loadPost = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Ошибка: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export const postOrder = async (body) => {
  const response = await fetch(`${API_URL}orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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