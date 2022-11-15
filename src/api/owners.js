import axios from 'axios';

import { BASE_URL } from '../constant/constant';

export const requestOwners = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const requestSearchedOwners = async (name) => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/?name=${name}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const requestOwner = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const requestOwnerMe = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/owners/me`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
