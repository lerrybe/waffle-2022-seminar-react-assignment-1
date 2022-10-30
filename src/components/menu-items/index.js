import MenuItem from '../menu-item';
import { useMenuDataContext } from '../../context/MenuDataContext';

function MenuItems({ handleOpenOverview }) {
  const { selectedMenu, searchedMenus: menuItems } = useMenuDataContext();

  return (
    <ul>
      {menuItems?.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          selectedMenu={selectedMenu}
          handleOpenOverview={handleOpenOverview}
        />
      ))}
    </ul>
  );
}

export default MenuItems;
