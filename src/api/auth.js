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

export const requestLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {});
  } catch (err) {
    console.log(err);
  }
};
