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
}

export type GetUserInfo = {
  id: number;
  name: string;
  depPrefs: string;
  builds: BuildInfo[];
  error?: any;
};
