import axios from 'axios';
import {
  AllDependenciesBuilds,
  DepPrefsResponse,
  GetUserInfo,
} from 'frontend/src/types';

export const getUserInfoApi = async (): Promise<GetUserInfo[]> => {
  try {
    const response = await axios.get(`webAPI/user`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const getUserDeps = async (): Promise<
  [DepPrefsResponse, AllDependenciesBuilds[]]
> => {
  try {
    const response = await axios.get(`webAPI/userDeps`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const deleteUserRepoApi = async () => {};
