import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MenuItem from '../menu-item';

import {
  useMenuDataActionsContext,
  useMenuDataContext,
} from '../../context/MenuDataContext';

import { requestMenus } from '../../api/menus';

function MenuItems({ handleOpenOverview }) {
  const { storeId } = useParams();

  const [menuItems, setMenuItems] = useState();

  const { selectedMenu } = useMenuDataContext();
  const { dispatchMenus } = useMenuDataActionsContext();

  useEffect(() => {
    (async () => {
      const res = await requestMenus(storeId);
      dispatchMenus(res.data);
      setMenuItems(res.data);
    })();
  }, [storeId]);

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
