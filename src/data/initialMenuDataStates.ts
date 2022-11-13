import { MenuType } from '../types/menus';

// about context states
export interface State {
  selectedMenu?: MenuType | null;
  menus?: MenuType[] | null;
}

export const initialMenuData: State = {
  selectedMenu: null,
  menus: null,
};

// about dispatch states
export interface Dispatches {
  dispatchMenus: (newMenus: MenuType[] | null) => void;
  dispatchSelectedMenu: (newMenu: MenuType | null) => void;
}

export const initialMenuDataActions: Dispatches = {
  dispatchMenus() {
    throw new Error('MenuDataContext not provided');
  },
  dispatchSelectedMenu() {
    throw new Error('MenuDataContext not provided');
  },
};
