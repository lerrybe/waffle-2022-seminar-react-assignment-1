import { BASE_URL } from '../constant/constant';

export const getURL = (endPoint: string) =>
  process.env.NODE_ENV === 'development' ? endPoint : `${BASE_URL}${endPoint}`;
