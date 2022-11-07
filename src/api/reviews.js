import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL } from '../constant/constant';

export const requestReviews = async (menuId, from, count) => {
  try {
    if (!from) {
      const res = await axios.get(
        `${BASE_URL}/reviews/?count=${count}&menu=${menuId}`,
      );
      return res.data;
    }
    const res = await axios.get(
      `${BASE_URL}/reviews/?from=${from}&count=${count}&menu=${menuId}`,
    );
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestReview = async (reviewId) => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews/${reviewId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestCreateReview = async (review, accessToken) => {
  try {
    const res = await axios.post(`${BASE_URL}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    toast.error(e.response.data.message);
    return null;
  }
};

export const requestUpdateReview = async (reviewId, review, accessToken) => {
  try {
    const res = await axios.patch(`${BASE_URL}/reviews/${reviewId}`, review, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    toast.error(e.response.data.message);
    return null;
  }
};

export const requestDeleteReview = async (reviewId, accessToken) => {
  try {
    const res = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    toast.error(e.response.data.message);
    return null;
  }
};
