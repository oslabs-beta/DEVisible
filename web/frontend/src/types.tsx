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
