import { createContext, useContext, useState } from 'react';
import {
  State,
  Dispatches,
  initialMenuData,
  initialMenuDataActions,
} from '../data/initialMenuDataStates';
import { MenuType } from '../types/menus';

const MenuDataContext = createContext<State | null>(initialMenuData);
const MenuDataActionsContext = createContext<Dispatches | null>(
  initialMenuDataActions,
);

interface MenuDataProvider {
  children: React.ReactNode;
}

function MenuDataProvider({ children }: MenuDataProvider) {
  const [menus, setMenus] = useState<MenuType[] | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);

  const dispatchMenus = (newMenus: MenuType[] | null): void => {
    setMenus(newMenus);
  };

  const dispatchSelectedMenu = (newMenu: MenuType | null): void => {
    setSelectedMenu(newMenu);
  };

  return (
    <MenuDataActionsContext.Provider
      value={{
        dispatchMenus,
        dispatchSelectedMenu,
      }}
    >
      <MenuDataContext.Provider value={{ menus, selectedMenu }}>
        {children}
      </MenuDataContext.Provider>
    </MenuDataActionsContext.Provider>
  );
}
export const useMenuDataContext = () => useContext(MenuDataContext);
export const useMenuDataActionsContext = () =>
  useContext(MenuDataActionsContext);

export default MenuDataProvider;
