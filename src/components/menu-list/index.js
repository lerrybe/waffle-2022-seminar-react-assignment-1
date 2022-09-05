import "./menu-list.css";

import MenuItems from "../menu-items";
import MenuSearchBar from "../menu-search-bar";

import createIcon from "../../assets/create-icon.svg";

const MenuList = ({ menuItems }) => {
  return (
    <>
      <MenuSearchBar />
      <div className="menu-content-wrapper">
        <div className="menu-category-wrapper">
          <span className="menu-category-id">{"ID"}</span>
          <span className="menu-category-name">{"이름"}</span>
          <span className="menu-category-price">{"가격"}</span>
        </div>
        <MenuItems menuItems={menuItems} />
        <img className="menu-create-icon" src={createIcon} alt="create" />
      </div>
    </>
  );
};

export default MenuList;