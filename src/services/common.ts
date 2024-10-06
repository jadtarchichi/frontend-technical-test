import { getCookie } from "../helpers/cookies";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Not Found');
  }
}

export function checkStatus(response: Response) {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 404) {
    throw new NotFoundError();
  }
  return response;
}

/**
 * Centralize the api calls to set the token in the headers
 * @param url 
 * @param optionsRequest 
 * @returns 
 */
export async function apiCall(url: string, optionsRequest?: RequestInit) {
  const token = getCookie("token");

  const options = {
    ...optionsRequest,
    headers: {
      ...optionsRequest?.headers,
      'Authorization': `Bearer ${token}`
    },
  }

  return await fetch(BASE_URL + url, options).then(res => checkStatus(res).json())
}
