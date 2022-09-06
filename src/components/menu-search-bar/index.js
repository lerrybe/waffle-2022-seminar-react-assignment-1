import "./menu-search-bar.css";
import searchImg from "../../assets/search-icon.svg";

const MenuSearchBar = ({ keyword, handleChangeKeyword }) => {
  return (
    <div className="menu-search-wrapper">
      <span className="menu-search-label">{"이름 검색:"}</span>
      <input
        className="menu-search-input"
        placeholder={"검색어 입력"}
        value={keyword}
        onChange={(e) => handleChangeKeyword(e)}
      />
      <img className="menu-search-icon" alt="search" src={searchImg} />
    </div>
  );
};

export default MenuSearchBar;
