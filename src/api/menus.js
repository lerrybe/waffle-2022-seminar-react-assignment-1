import axios from 'axios';
import { BASE_URL } from '../constant/constant';

export const requestMenus = async (ownerId) => {
  try {
    const res = await axios.get(`${BASE_URL}/menus/?owner=${ownerId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
