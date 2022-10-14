import MenuItem from "../menu-item";
import { useMenuDataContext } from "../../context/MenuDataContext";

const MenuItems = ({ handleOpenDetail }) => {
  const { selectedMenu, searchedMenus: menuItems } = useMenuDataContext();

  return (
    <ul>
      {menuItems?.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          selectedMenu={selectedMenu}
          handleOpenDetail={handleOpenDetail}
        />
      ))}
    </ul>
  );
};

export default MenuItems;
