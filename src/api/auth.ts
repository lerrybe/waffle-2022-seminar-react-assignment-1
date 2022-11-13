import axios from 'axios';
import { toast } from 'react-toastify';
import { getURL } from '../utils/urls';

// import types
import { LoginRequest, LoginResponse } from '../types/auth';

export const requestLogin = async ({ username, password }: LoginRequest) => {
  try {
    const res = await axios.post(getURL('/auth/login'), {
      username,
      password,
    });
    return res.data;
    // QUESTION: error type not using any
  } catch (e: any) {
    toast.error(e.response.data.message, {
      theme: 'colored',
    });
    return null;
  }
};

export const requestLogout = async (accessToken: string) => {
  try {
    await axios.post(getURL('/auth/logout'), null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return true;
    // QUESTION: error type not using any
  } catch (e: any) {
    toast.error(e.response.data.message, {
      theme: 'colored',
    });
    return false;
  }
};
