export interface BuildInfo {
  id: number;
  repoId: number;
  createdAt: string;
  buildTime: number;
  buildSize: number;
  deps: string;
}

export interface User {
  username: string;
  id: number;
}

export type GetUserInfo = {
  id: number;
  name: string;
  depPrefs: string;
  builds: BuildInfo[];
  error?: any;
};

export type AllDependenciesBuilds = {
  name: string;
  builds: Pick<BuildInfo, 'repoId' | 'deps'>[];
};

export type TrackedDependencies = {
  name: string;
  version: string;
};
