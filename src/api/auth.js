import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { clearAll } from '../services/storage';

export const requestLogin = async ({ id, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      username: id,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const requestLogout = () => {
  clearAll();
};
