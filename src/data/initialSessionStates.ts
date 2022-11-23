import {
  SessionDispatches,
  SessionState,
} from '../types/context/session-states';

// about context states
export const initialUser: SessionState = {
  user: null,
  accessToken: null,
};

// about dispatch states
export const initialUserActions: SessionDispatches = {
  login() {
    throw new Error('SessionContext not provided');
  },
  logout() {
    throw new Error('SessionContext not provided');
  },
  refresh() {
    throw new Error('SessionContext not provided');
  },
};
