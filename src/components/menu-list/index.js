import { useNavigate } from 'react-router-dom';

import './menu-list.css';
import createIcon from '../../assets/create-icon.svg';

import MenuItems from '../menu-items';
import SearchBar from '../search-bar';

import { useSessionContext } from '../../context/SessionContext';

function MenuList({ keyword, handleOpenOverview, handleChangeKeyword }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSessionContext();

  return (
    <div className="menu-outer-wrapper">
      <SearchBar
        keyword={keyword}
        label="메뉴 이름 검색: "
        handleChangeKeyword={handleChangeKeyword}
      />
      <div className="menu-content-wrapper">
        <div className="menu-category-wrapper">
          <span className="menu-category-id">ID</span>
          <span className="menu-category-name">이름</span>
          <span className="menu-category-type">종류</span>
          <span className="menu-category-price">가격</span>
        </div>
        <MenuItems handleOpenOverview={handleOpenOverview} />
        {isLoggedIn && (
          <button onClick={() => navigate('/menus/new')}>
            <img className="menu-create-icon" src={createIcon} alt="create" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MenuList;
