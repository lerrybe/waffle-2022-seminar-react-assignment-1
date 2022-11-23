import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL } from '../constant/constant';
import { CreateReviewParams, UpdateReviewParams } from '../types/reviews';

export const requestReviews = async (
  menuId: number | null,
  from: string | null,
  count: number | null,
) => {
  try {
    const res = await axios.get(
      from
        ? `${BASE_URL}/reviews/?from=${from}&count=${count}&menu=${menuId}`
        : `${BASE_URL}/reviews/?count=${count}&menu=${menuId}`,
    );
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestReview = async (reviewId?: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews/${reviewId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const requestCreateReview = async (
  review: CreateReviewParams,
  accessToken: string | null,
) => {
  try {
    const res = await axios.post(`${BASE_URL}/reviews`, review, {
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

export const requestUpdateReview = async (
  reviewId: number | null,
  review: UpdateReviewParams,
  accessToken: string | null,
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/reviews/${reviewId}`, review, {
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

export const requestDeleteReview = async (
  reviewId: number | null,
  accessToken: string | null,
) => {
  try {
    const res = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
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
