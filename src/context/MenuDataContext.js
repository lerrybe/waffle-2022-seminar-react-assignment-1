import { createContext, useContext, useMemo, useState } from 'react';
import {
  initialMenus,
  initialSelectedMenu,
  initialSearchedMenus,
  initialMenuDataActions,
} from '../data/initialMenuDataStates';

const MenuDataContext = createContext({
  initialMenus,
  initialSelectedMenu,
  initialSearchedMenus,
});
const MenuDataActionsContext = createContext(initialMenuDataActions);

function MenuDataProvider({ children }) {
  const [menus, setMenus] = useState(initialMenus);
  const [selectedMenu, setSelectedMenu] = useState(initialSelectedMenu);
  const [searchedMenus, setSearchedMenus] = useState(initialSearchedMenus);
  const actions = useMemo(
    () => ({
      dispatchMenus(newMenus) {
        setMenus(newMenus);
      },
      dispatchSelectedMenu(newMenu) {
        setSelectedMenu(newMenu);
      },
      dispatchSearchedMenus(newMenus) {
        setSearchedMenus(newMenus);
      },
    }),
    [],
  );

  return (
    <MenuDataActionsContext.Provider value={actions}>
      <MenuDataContext.Provider value={{ menus, selectedMenu, searchedMenus }}>{children}</MenuDataContext.Provider>
    </MenuDataActionsContext.Provider>
  );
}
export const useMenuDataContext = () => useContext(MenuDataContext);
export const useMenuDataActionsContext = () => useContext(MenuDataActionsContext);

export default MenuDataProvider;
