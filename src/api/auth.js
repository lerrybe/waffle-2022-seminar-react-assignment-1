import axios from 'axios';
import { toast } from 'react-toastify';

import { getURL } from '../utils/urls';

export const requestLogin = async ({ name, password }) => {
  try {
    const res = await axios.post(getURL('/auth/login'), {
      username: name,
      password,
    });
    return res.data;
  } catch (e) {
    toast.error(e.response.data.message, {
      theme: 'colored',
    });
  }
};

export const requestLogout = async (accessToken) => {
  try {
    await axios.post(getURL('/auth/logout'), null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return true;
  } catch (e) {
    toast.error(e.response.data.message, {
      theme: 'colored',
    });
  }
};
