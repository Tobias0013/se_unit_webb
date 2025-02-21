import axios from 'axios';

/** All needed user data. DON*T FORGET TO ADJUST TO MATCH BACKEND!!!! */
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  // Can be added anything else we're gonna use: email? avatar? country of residence?
}

/** Fetch current logged-in user session */
export async function fetchCurrentUser(): Promise<IUser> {
  try {
    const response = await axios.get('/api/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user information.');
  }
}
