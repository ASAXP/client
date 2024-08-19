const get = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    throw new Error('fetch failed');
  }
  const data: T = await response.json();
  return data;
};

export const api = {
  get,
};
