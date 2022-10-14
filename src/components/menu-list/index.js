import "./menu-list.css";

import MenuItems from "../menu-items";
import SearchBar from "../search-bar";

import createIcon from "../../assets/create-icon.svg";
import { useSessionContext } from "../../context/SessionContext";

const MenuList = ({
  keyword,
  menuItems,
  selectedMenu,
  handleOpenDetail,
  handleChangeKeyword,
  handleToggleCreateModal,
}) => {
  const { isLoggedIn } = useSessionContext();

  return (
    <div className="menu-outer-wrapper">
      <SearchBar
        keyword={keyword}
        label={"메뉴 이름 검색: "}
        handleChangeKeyword={handleChangeKeyword}
      />
      <div className="menu-content-wrapper">
        <div className="menu-category-wrapper">
          <span className="menu-category-id">ID</span>
          <span className="menu-category-name">이름</span>
          <span className="menu-category-type">종류</span>
          <span className="menu-category-price">가격</span>
        </div>
        <MenuItems
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          handleOpenDetail={handleOpenDetail}
        />
        {isLoggedIn && (
          <button>
            <img
              className="menu-create-icon"
              src={createIcon}
              alt="create"
              onClick={handleToggleCreateModal}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
