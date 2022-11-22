import axios from 'axios';
import { toast } from 'react-toastify';
import { getURL } from '../utils/urls';

// import types
import { LoginRequest } from '../types/auth';

export const requestLogin = async ({ username, password }: LoginRequest) => {
  try {
    const res = await axios.post(getURL('/auth/login'), {
      username,
      password,
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data.message);
    }
    return null;
  }
};

export const requestLogout = async (accessToken: string | null) => {
  try {
    await axios.post(getURL('/auth/logout'), null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return true;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data.message);
    }
    return null;
  }
};
