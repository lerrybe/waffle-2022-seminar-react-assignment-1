export const initialUser = {
  user: null,
  username: null,
  isLoggedIn: false,
  accessToken: null,
};

export const initialUserActions = {
  login() {
    throw new Error('SessionContext not provided');
  },
  logout() {
    throw new Error('SessionContext not provided');
  },
};
