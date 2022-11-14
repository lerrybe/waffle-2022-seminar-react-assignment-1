import './menu-item.css';
import { Rating } from '@mui/material';

import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';

function MenuItem({ menuItem, selectedMenu, handleOpenOverview }) {
  return (
    <li
      key={menuItem?.id}
      className={`menu-item-wrapper ${
        selectedMenu === menuItem
          ? 'selected-menu-item'
          : 'not-selected-menu-item'
      }`}
      onClick={() => handleOpenOverview(menuItem)}
    >
      <span className="menu-item-id">{menuItem?.id}</span>
      <span className="menu-item-name">{menuItem?.name}</span>
      <span className="menu-item-type">
        {convertTypeEnToKo(menuItem?.type)}
      </span>
      <span className="menu-item-price">
        {toStringNumberWithComma(String(menuItem?.price))}
      </span>
      <span className="menu-item-rating">
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
        <span className="menu-item-rating-text">
          {menuItem?.rating
            ? Number((Number(menuItem.rating) / 2).toFixed(1))
            : 0}
        </span>
      </span>
    </li>
  );
}

export default MenuItem;
