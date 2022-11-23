import { LoginRequest, Owner } from '../auth';

export interface SessionState {
  user?: Owner | null;
  accessToken?: string | null;
}

export interface SessionDispatches {
  login: ({ username, password }: LoginRequest) => Promise<void>;
  logout: (accessToken: string) => Promise<void>;
  refresh: () => Promise<void>;
}
