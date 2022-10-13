import { createContext, useContext, useState } from "react";
import { initialMenus } from "../data/initialStates";

const MenuDataContext = createContext(initialMenus);

const MenuDataProvider = ({ children }) => {
  const [menus] = useState(initialMenus);

  return (
    <MenuDataContext.Provider value={menus}>
      {children}
    </MenuDataContext.Provider>
  );
};
export const useMenuDataContext = () => useContext(MenuDataContext);

export default MenuDataProvider;
