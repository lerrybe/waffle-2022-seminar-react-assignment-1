import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { getURL } from '../utils/urls';

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

export const requestOwnerMe = async (accessToken: string | null) => {
  try {
    const res = await axios.get(getURL('/owners/me'), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
