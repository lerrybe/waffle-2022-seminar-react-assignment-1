import { MenuType } from '../types/menus';

export const isValidMenuParams = (id: number, menus: MenuType) => {
  const matchedIdArr = menus.filter((menu) => menu.id === id);

  // DESC: 필터링 된 결과물들은 무조건 MenuType[] 이거나 빈 배열이라고 생각해 타입 단언 해줬습니다.
  if ((matchedIdArr as MenuType[]).length > 0) return true;
  return false;
};
