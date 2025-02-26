import API from './connection';
import { MOCK } from './../config';
import { 
    mockRegister, 
    mockLogin, 
    mockUserDetails, 
    mockUsers, 
    mockDeleteUser 
} from './__mocks__/authMock';

/**
 * Registers a new user.
 * 
 * @param username - The username of the new user.
 * @param password - The password of the new user.
 * @param admin - Whether the new user has admin privileges.
 * @returns A promise that resolves to the response of the registration request.
 */
export async function register(username: string, password: string, admin: boolean) {
    if (MOCK) {
        return Promise.resolve({ data: mockRegister });
    }
    return await API.post('/auth/register', {
        username,
        password,
        admin
    });
}

/**
 * Authenticates a user.
 * 
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to the response of the login request.
 */
export async function login(username: string, password: string) {
    if (MOCK) {
        return Promise.resolve({ data: mockLogin });
    }
    return await API.post('/auth/login', {
        username,
        password
    });
}

/**
 * Retrieves the details of a user.
 * 
 * @param userId - The ID of the user.
 * @param token - The authorization token.
 * @returns A promise that resolves to the response of the get user details request.
 */
export async function getUserDetails(userId: number, token: string) {
    if (MOCK) {
        return Promise.resolve({ data: mockUserDetails });
    }
    return await API.get(`/users/${userId}`, {
        headers: {
            Authorization: token
        }
    });
}

/**
 * Retrieves a list of all users. Requires admin privileges.
 * 
 * @param token - The authorization token.
 * @returns A promise that resolves to the response of the get all users request.
 */
export async function getAllUsers(token: string) {
    if (MOCK) {
        return Promise.resolve({ data: mockUsers });
    }
    return await API.get('/users', {
        headers: {
            Authorization: token
        }
    });
}

/**
 * Deletes a user. Requires admin privileges.
 * 
 * @param userId - The ID of the user to delete.
 * @param token - The authorization token.
 * @returns A promise that resolves to the response of the delete user request.
 */
export async function deleteUser(userId: number, token: string) {
    if (MOCK) {
        return Promise.resolve({ data: mockDeleteUser });
    }
    return await API.delete(`/users/${userId}`, {
        headers: {
            Authorization: token
        }
    });
}
