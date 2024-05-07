import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 * Fetches a user by their username.
 * @param {string} username - The username of the user.
 * @returns {Promise} A promise that resolves to the user's data.
 */
export const getUserByHandle = async (username) => {
  try {
    return await get(ref(db, `users/${username}`));
  } catch (error) {
    console.error(`Failed to get user by handle: ${error}`);
    throw error;
  }
};

/**
 * Creates a new user.
 * @param {string} username - The username of the new user.
 * @param {string} uid - The unique ID of the new user.
 * @param {string} email - The email of the new user.
 * @returns {Promise} A promise that resolves when the user is created.
 */
export const createUser = async (username, uid, email) => {
  try {
    return await set(ref(db, `users/${username}`), { username, uid, email, createdOn: new Date() });
  } catch (error) {
    console.error(`Failed to create user: ${error}`);
    throw error;
  }
};

/**
 * Fetches a user's data by their unique ID.
 * @param {string} uid - The unique ID of the user.
 * @returns {Promise} A promise that resolves to the user's data.
 */
export const getUserData = async (uid) => {
  try {
    return await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  } catch (error) {
    console.error(`Failed to get user data: ${error}`);
    throw error;
  }
};