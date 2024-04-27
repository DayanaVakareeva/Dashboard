import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase-confog';



export const registerUser = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = (): Promise <void> => {
  return signOut(auth);
};
