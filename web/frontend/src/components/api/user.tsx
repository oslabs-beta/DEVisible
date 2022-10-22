import axios from 'axios';
import {
  AddedTrackedDependency,
  AllDependenciesBuilds,
  GetUserInfo,
} from 'frontend/src/types';

/**
 * function to fetch user specific build information
 * @returns A promise that resolves to an AxiosResponse object
 * @example
 * Example response:
 * ```
 *  response.data = [{builds: [{buildinfo1},{buildinfo2},{buildinfo3}], id: 1, name: "repName1"},{builds: [{buildinfo1},{buildinfo2},{buildinfo3}], id: 2, name: "repName2"}}]
 * ```
 */
export const getUserInfoApi = async (): Promise<GetUserInfo[]> => {
  try {
    const response = await axios.get(`webAPI/user`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

/**
 * function to fetch user specfic dependencies and repositories list
 * @returns A promise that resolves to an AxiosResponse object
 * @example
 * Example response:
 * ```
 *  response.data = ["[{"name":"dotenv","version":"16.0.2"},{"name":"express","version":"4.18.1"}}]", [{{id: 1, name: 'repoName', builds: Array(3)}}] ]
 * ```
 */
export const getUserDeps = async (): Promise<
  [string, AllDependenciesBuilds[]]
> => {
  try {
    const response = await axios.get(`webAPI/userDeps`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
//  TODO add TS for promise type

/**
 * function to let user set dependencies to track
 * @param depPrefs - {@link AddedTrackedDependency}
 * @returns A promise that resolves to an Axios Response Object
 * @example
 * Example response:
 * ```
 * response.data = 'Dependency preferences updated'
 * ```
 */
export const postUserDepPrefs = async (
  depPrefs: AddedTrackedDependency[]
): Promise<string> => {
  try {
    const response = await axios.post(`webAPI/userDeps`, {
      depPrefs,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const deleteUserRepoApi = async () => {};
