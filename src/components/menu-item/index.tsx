// import styles and components
import {
  Item,
  MenuItemId,
  MenuItemType,
  MenuItemName,
  MenuItemPrice,
  MenuItemRating,
  MenuItemRatingText,
} from './menu-item.styled';
import { Rating } from '@mui/material';

// import types
import { MenuType } from '../../types/menus';

// import utils
import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';

interface MenuItem {
  menuItem: MenuType;
  selectedMenu: MenuType | null;
  handleOpenOverview: (menuItem: MenuType) => void;
}

const MenuItem: React.FC<MenuItem> = ({
  menuItem,
  selectedMenu,
  handleOpenOverview,
}: MenuItem) => {
  return (
    <Item
      key={menuItem?.id}
      isSelected={selectedMenu === menuItem}
      onClick={() => handleOpenOverview(menuItem)}
    >
      <MenuItemId>{menuItem?.id}</MenuItemId>
      <MenuItemName>{menuItem?.name}</MenuItemName>
      <MenuItemType>{convertTypeEnToKo(menuItem?.type)}</MenuItemType>
      <MenuItemPrice>
        {toStringNumberWithComma(String(menuItem?.price))}
      </MenuItemPrice>
      <MenuItemRating>
        <Rating
          name="half-rating-read"
          value={
            menuItem?.rating
              ? Number((Number(menuItem.rating) / 2).toFixed(1))
              : 0
          }
          precision={0.5}
          readOnly
        />
        <MenuItemRatingText>
          {menuItem?.rating
            ? Number((Number(menuItem.rating) / 2).toFixed(1))
            : 0}
        </MenuItemRatingText>
      </MenuItemRating>
    </Item>
  );
};

export default MenuItem;
