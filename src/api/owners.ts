import axios from 'axios';
import { BASE_URL } from '../constant/constant';

export const requestOwners = async (name?: string) => {
  try {
    const res = await axios.get(
      name ? `${BASE_URL}/owners/?name=${name}` : `${BASE_URL}/owners/`,
    );
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestOwner = async (id: number | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/${id}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestOwnerMe = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/me`);
    return res.data;
  } catch (e) {
    return null;
  }
};
