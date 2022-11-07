import MenuItem from '../menu-item';

import { useMenuDataContext } from '../../context/MenuDataContext';

function MenuItems({ handleOpenOverview }) {
  const { menus, selectedMenu } = useMenuDataContext();

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
}

export default MenuItems;
