export const isValidMenuParams = (id, menus) => {
  const findedId = menus.filter((menu) => Number(menu.id) === Number(id));
  if (findedId.length > 0) return true;
  return false;
};
