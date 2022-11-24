import MenuItem from '../menu-item';

import { MenuType } from '../../types/menus';
import { useMenuDataContext } from '../../context/MenuDataContext';

interface MenuItems {
  handleOpenOverview: (item: MenuType) => void;
}

const MenuItems: React.FC<MenuItems> = ({ handleOpenOverview }: MenuItems) => {
  const { menus, selectedMenu } = useMenuDataContext()!;

  return (
    <ul>
      {menus?.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          selectedMenu={selectedMenu}
          handleOpenOverview={handleOpenOverview}
        />
      ))}
    </ul>
  );
};

export default MenuItems;
