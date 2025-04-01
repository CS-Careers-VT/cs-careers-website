import { auth, functions } from '@config/firebase';
import { httpsCallable } from 'firebase/functions';
import { UserInfo } from 'firebase/auth';

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

export const deleteAdminUser = async (uid: string): Promise<string> => {
  const deleteUserCallable = httpsCallable(functions, 'deleteUser');
  const result = await deleteUserCallable({ uid });
  return result.data as string;
};

/**
 * 
 * @returns 
 */
export const fetchAdminUsers = async (): Promise<UserInfo[]> => {
  const getUsersCallable = httpsCallable(functions, 'listUsers');
  const result = await getUsersCallable();
  return result.data as UserInfo[];
};