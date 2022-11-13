import { LoginRequest, Owner } from '../types/auth';

// about context states
export interface State {
  user?: Owner | null;
  accessToken?: string | null;
}

export const initialUser: State = {
  user: null,
  accessToken: null,
};

// about dispatch states
export interface Dispatches {
  login: ({ username, password }: LoginRequest) => Promise<void>;
  logout: (accessToken: string) => Promise<void>;
}

export const initialUserActions: Dispatches = {
  login() {
    throw new Error('SessionContext not provided');
  },
  logout() {
    throw new Error('SessionContext not provided');
  },
};
