import { MenuType } from '../menus';

export interface MenuState {
  selectedMenu: MenuType | null;
  menus: MenuType[] | null;
}

export interface MenuDispatches {
  dispatchMenus: (newMenus: MenuType[] | null) => void;
  dispatchSelectedMenu: (newMenu: MenuType | null) => void;
}
