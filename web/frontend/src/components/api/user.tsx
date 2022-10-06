import axios from 'axios';
import { GetUserInfo } from 'frontend/src/types';

export const getUserInfoApi = async (
  userId: number
): Promise<GetUserInfo[]> => {
  try {
    const response = await axios.get(`webAPI/user/${userId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const deleteUserRepoApi = async () => {};
