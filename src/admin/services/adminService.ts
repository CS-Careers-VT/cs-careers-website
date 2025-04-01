/**
 * Manage users that have access to the admin panel.
 * 
 * Users are registered administrators of the application.
 * Users sign in using Firebase Authentication and are granted access to the admin panel.
 * 
 * Please be careful when creating or deleting users. 
 */

import { auth, functions } from '@config/firebase';
import { httpsCallable } from 'firebase/functions';

export interface CreateAdminUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdBy?: string | null;
}

export interface CreateAdminUserResponse {
  uid: string;
  email: string;
}

export const createAdminUser = async (
  data: CreateAdminUserData
): Promise<CreateAdminUserResponse> => {
  data['createdBy'] = auth.currentUser?.email;
  console.log('data', data);
  const addUserCallable = httpsCallable(functions, 'createAdminUser');
  const result = await addUserCallable(data);
  console.log('result', result);
  return result.data as CreateAdminUserResponse;
};

export interface AdminData {
  uid: string;
  email: string;
  displayName: string;
}

/**
 * List all of the users in Firebase Authentication.
 * 
 * @returns {Promise<AdminData[]>} List of admin users
 */
export const listUsers = async (): Promise<AdminData[]> => {
  const getUsersCallable = httpsCallable(functions, 'listUsers');
  const result = await getUsersCallable();
  return result.data as AdminData[];
};

export const deleteUser = async (uid: string): Promise<string> => {
  console.log('Deleting user with UID:', uid);
  const deleteUserCallable = httpsCallable(functions, 'deleteUser');
  const result = await deleteUserCallable({ uid: uid });
  console.log('Delete user result:', result);
  return result.data as string;
};