import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constant/constant';

// import types
import { CreateMenuParams, UpdateMenuParams } from '../types/menus';

export const requestMenus = async (
  ownerId: number | null,
  keyword?: string | null,
) => {
  try {
    const res = await axios.get(
      keyword
        ? `${BASE_URL}/menus/?owner=${ownerId}&search=${keyword}`
        : `${BASE_URL}/menus/?owner=${ownerId}`,
    );
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestMenu = async (menuId: number | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/menus/${menuId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestCreateMenu = async (
  menu: CreateMenuParams,
  accessToken?: string | null,
) => {
  try {
    const res = await axios.post(`${BASE_URL}/menus`, menu, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data.message);
    }
    return null;
  }
};

export const requestUpdateMenu = async (
  menuId: number | null,
  menu: UpdateMenuParams,
  accessToken?: String | null,
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/menus/${menuId}`, menu, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data.message);
    }
    return null;
  }
};

export const requestDeleteMenu = async (
  menuId: number | null,
  accessToken: String | null,
) => {
  try {
    const res = await axios.delete(`${BASE_URL}/menus/${menuId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data.message);
    }
    return null;
  }
};
