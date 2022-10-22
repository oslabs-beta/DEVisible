/**
 * @typeParam id - number that is a unique identifier for the build
 * @typeParam repoId - number that corresponds to the connected repository
 * @typeParam createdAt - string that indicates time of build creation
 * @typeParam buildTime - number that indicates time it takes to build the app
 * @typeParam buildSize - number that indicates the size of the bundle
 * @typeParam deps - string that contains all the dependencies of the build
 */
export interface BuildInfo {
  id: number;
  repoId: number;
  createdAt: string;
  buildTime: number;
  buildSize: number;
  deps: string;
}

/**
 * @typeParam username - string that contains username
 * @typeParam id - number that contains the user's id number
 */
export interface User {
  username: string;
  id: number;
}

/**
 * @typeParam id - number that corresponds to the specific user's id
 * @typeParam name - string that indicates user's username
 * @typeParam depPrefs - string that contains dependencies whose versions the user chooses to keep track of
 * @typeParam builds - corresponds to the {@link BuildInfo} interface
 * @typeParam error - corresponds to error response object
 */
export type GetUserInfo = {
  id: number;
  name: string;
  depPrefs: string;
  builds: BuildInfo[];
  error?: any;
};

/**
 * @typeParam name - string that indicates the name of the repository
 * @typeParam builds - an array consisting of {@link BuildInfo.repoId | repoId} and {@link BuildInfo.deps | deps}
 * @typeParam id - number that corresponds to the {@link BuildInfo.id | build's id}
 */
export type AllDependenciesBuilds = {
  name: string;
  builds: Pick<BuildInfo, 'repoId' | 'deps'>[];
  id: number;
};

/**
 * @typeParam name - string that indicates dependency name
 * @typeParam version - string that indicates the version of the dependency
 */
export type TrackedDependencies = {
  name: string;
  version: string;
};

/**
 * @typeParam key - key value pair of strings that indicates the dependency added
 */
export type AddedTrackedDependency = {
  [key: string]: string;
};

/**
 * @typeParam key - key value pair where the value is an array of strings of out of spec dependencies
 */
export type OutOfSpecRepos = {
  [key: string]: string[];
};

/**
 * @typeParam status - a boolean value which indicates whether a dependency is out of spec or not
 * @typeParam depsOutOfSpec - an array of strings which contains the dependencies out of spec
 */
export type OutOfSpecDeps = {
  status: boolean;
  depsOutOfSpec: string[];
};
