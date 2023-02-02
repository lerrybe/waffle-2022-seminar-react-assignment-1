import { MenuDispatches, MenuState } from '../types/context/menu-data-states';

// about context states
export const initialMenuData: MenuState = {
  selectedMenu: null,
  menus: null,
};

// about dispatch states
export const initialMenuDataActions: MenuDispatches = {
  dispatchMenus() {
    throw new Error('MenuDataContext not provided');
  },
  dispatchSelectedMenu() {
    throw new Error('MenuDataContext not provided');
  },
};
