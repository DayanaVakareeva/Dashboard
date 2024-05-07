import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, UserCredential, getAuth
} from 'firebase/auth';
import { auth } from '../config/firebase-config.ts';

/**
 * Firebase authentication service.
 *
 * This service provides functions to register, login, and logout a user using Firebase authentication.
 */

/**
 * Registers a new user with the given email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{ user: { uid: string } }>} A promise that resolves to an object containing the user's UID.
 * @throws Will throw an error if the registration fails.
 */
export const registerUser = async (email: string, password: string): Promise<{ user: { uid: string } }> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: { uid: userCredential.user.uid } };
  } catch (error) {
    throw new Error('Error registering user');
  }
};

/**
 * Logs in a user with the given email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<UserCredential>} A promise that resolves to the user's credentials.
 */
export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error('Error logging in user');
  }
};

/**
 * Logs out the current user.
 *
 * @returns {Promise<void>} A promise that resolves when the user has been logged out.
 */
export const logoutUser = async (): Promise <void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw new Error('Error logging out user');
  }
};
