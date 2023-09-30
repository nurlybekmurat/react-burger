export const loadPost = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Ошибка: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}
