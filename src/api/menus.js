import axios from 'axios';

import { BASE_URL } from '../constant/constant';

export const requestMenus = async (ownerId) => {
  try {
    const res = await axios.get(`${BASE_URL}/menus/?owner=${ownerId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestSearchedMenus = async (ownerId, keyword) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/menus/?owner=${ownerId}&search=${keyword}`,
    );
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestMenu = async (menuId) => {
  try {
    const res = await axios.get(`${BASE_URL}/menus/${menuId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestCreateMenu = async (menu, accessToken) => {
  try {
    const res = await axios.post(`${BASE_URL}/menus`, menu, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestUpdateMenu = async (menuId, menu, accessToken) => {
  try {
    const res = await axios.patch(`${BASE_URL}/menus/${menuId}`, menu, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestDeleteMenu = async (menuId, accessToken) => {
  try {
    const res = await axios.delete(`${BASE_URL}/menus/${menuId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
