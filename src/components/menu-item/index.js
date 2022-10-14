import "./menu-item.css";

import { convertTypeEnToKo } from "../../utils/menu/type";
import { numberToStringNumber } from "../../utils/menu/price";

const MenuItem = ({ menuItem, selectedMenu, handleOpenDetail }) => {
  const { id, name, type, price } = menuItem;

  return (
    <li
      className={`menu-item-wrapper ${
        selectedMenu === menuItem
          ? "selected-menu-item"
          : "not-selected-menu-item"
      }`}
      onClick={() => handleOpenDetail(menuItem)}
    >
      <span className="menu-item-id">{id}</span>
      <span className="menu-item-name">{name}</span>
      <span className="menu-item-type">{convertTypeEnToKo(type)}</span>
      <span className="menu-item-price">{numberToStringNumber(price)}</span>
    </li>
  );
};

export default MenuItem;
