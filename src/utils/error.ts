import { MenuType } from '../types/menus';

export const isValidMenuParams = (id: number, menus: MenuType[] | null) => {
  const matchedIdArr = menus?.filter((menu) => menu.id === id);

  if (matchedIdArr) {
    if (matchedIdArr.length > 0) return true;
  }
  return false;
};
