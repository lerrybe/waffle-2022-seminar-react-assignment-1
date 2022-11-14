import MenuItem from '../menu-item';

import { useMenuDataContext } from '../../context/MenuDataContext';

interface MenuItems {
  handleOpenOverview: () => void;
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
