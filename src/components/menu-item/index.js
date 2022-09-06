import "./menu-item.css";

import { numberToCommaString } from "../../utils/numberToCommaString";

const MenuItem = ({ menuItem, selectedMenu, handleOpenDetail }) => {
  const { id, name, price } = menuItem;
  return (
    <li
      className="menu-item-wrapper"
      style={{
        background: selectedMenu === menuItem ? "#ffd2d2" : "#fff",
      }}
      onClick={() => handleOpenDetail(menuItem)}
    >
      <span className="menu-item-id">{id}</span>
      <span className="menu-item-name">{name}</span>
      <span className="menu-item-price">{numberToCommaString(price)}</span>
    </li>
  );
};

export default MenuItem;
