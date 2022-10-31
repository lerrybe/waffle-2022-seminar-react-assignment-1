import { useState } from 'react';

import './menu-item.css';

import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';

function MenuItem({ menuItem, selectedMenu, handleOpenOverview }) {
  const { id, name, type, price } = menuItem;

  // TODO: res 정보로 바꾸기
  const [starRating] = useState(3);

  return (
    <li
      className={`menu-item-wrapper ${selectedMenu === menuItem ? 'selected-menu-item' : 'not-selected-menu-item'}`}
      onClick={() => handleOpenOverview(menuItem)}
    >
      <span className="menu-item-id">{id}</span>
      <span className="menu-item-name">{name}</span>
      <span className="menu-item-type">{convertTypeEnToKo(type)}</span>
      <span className="menu-item-price">{toStringNumberWithComma(price)}</span>
      <span className="menu-item-rating">
        {'★'.repeat(starRating) + '☆'.repeat(5 - starRating)}
        <span className="menu-item-rating-text">{starRating}</span>
      </span>
    </li>
  );
}

export default MenuItem;
