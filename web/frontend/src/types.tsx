export type BuildInfo = {
  id: number;
  repoId: number;
  createdAt: string;
  buildTime: number;
  buildSize: number;
  deps: string;
};

export type GetUserInfo = {
  id: number;
  name: string;
  depPrefs: string;
  builds: BuildInfo[];
  error?: any;
};
