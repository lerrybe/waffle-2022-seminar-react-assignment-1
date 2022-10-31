import axios from 'axios';
import { BASE_URL } from '../constant/constant';

export const requestLogin = async ({ name, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      username: name,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// BUG: fix logout 401
export const requestLogout = async (accessToken) => {
  try {
    await axios.post(process.env.NODE_ENV === 'development' ? '/auth/logout' : `${BASE_URL}/auth/logout`, null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
