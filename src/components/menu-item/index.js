import "./menu-item.css";

import { numberToStringNumber } from "../../utils/price";

const MenuItem = ({ menuItem, selectedMenu, handleOpenDetail }) => {
  const { id, name, price } = menuItem;
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
      <span className="menu-item-price">{numberToStringNumber(price)}</span>
    </li>
  );
};

export default MenuItem;
