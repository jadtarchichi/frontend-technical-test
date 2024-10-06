import { apiCall, BASE_URL, checkStatus } from "../common";
import { GetUserByIdResponse, LoginResponse } from "../types/user"

/**
 * Authenticate the user with the given credentials
 * @param username 
 * @param password 
 * @returns 
 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  return await fetch(`${BASE_URL}/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  }).then(res => checkStatus(res).json())
}

/**
* Get a user by their id
* @param token 
* @param id 
* @returns 
*/
export async function getUserById(id: string): Promise<GetUserByIdResponse> {
  return await apiCall(`/users/${id}`)
}