import axios from 'axios';
import { BASE_URL } from '../constant/constant';

export const requestOwners = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const requestOwner = async (id) => {
  try {
    await axios.get(`${BASE_URL}/owners/${id}`);
  } catch (err) {
    console.log(err);
  }
};
