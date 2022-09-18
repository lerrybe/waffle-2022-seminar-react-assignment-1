import "./menu-list.css";

import MenuItems from "../menu-items";
import MenuSearchBar from "../menu-search-bar";

import createIcon from "../../assets/create-icon.svg";

const MenuList = ({
  keyword,
  menuItems,
  selectedMenu,
  handleOpenDetail,
  handleChangeKeyword,
  handleToggleCreateModal,
}) => {
  return (
    <div className="menu-outer-wrapper">
      <MenuSearchBar
        keyword={keyword}
        handleChangeKeyword={handleChangeKeyword}
      />
      <div className="menu-content-wrapper">
        <div className="menu-category-wrapper">
          <span className="menu-category-id">ID</span>
          <span className="menu-category-name">이름</span>
          <span className="menu-category-price">가격</span>
        </div>
        <MenuItems
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          handleOpenDetail={handleOpenDetail}
        />
        <button>
          <img
            className="menu-create-icon"
            src={createIcon}
            alt="create"
            onClick={handleToggleCreateModal}
          />
        </button>
      </div>
    </div>
  );
};

export default MenuList;
