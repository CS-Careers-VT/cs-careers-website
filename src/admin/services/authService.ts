import { auth } from '@config/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth';

/**
 * Triggers a password reset email for the given email address using Firebase Auth.
 * @param email - The email address of the user requesting a password reset.
 * @returns A Promise that resolves if the email was sent successfully.
*/
export const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
};


/**
 * Authenticates a user using their email and password via Firebase Auth.
 * @param email - The email address of the user attempting to log in.
 * @param password - The password associated with the provided email address.
 * @returns A Promise that resolves to a Firebase User object upon successful authentication.
 * @throws An error if the authentication fails (e.g., invalid credentials).
 */
export const emailLogin = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}