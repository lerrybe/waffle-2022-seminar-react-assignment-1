import { useNavigate, useParams } from 'react-router-dom';

import './menu-list.css';
import createIcon from '../../assets/create-icon.svg';

import MenuItems from '../menu-items';
import SearchBar from '../search-bar';

import { loadObjItem } from '../../services/storage';

function MenuList({ keyword, handleOpenOverview, handleChangeKeyword }) {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const user = loadObjItem('user');

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
          <span className="menu-category-rating">평점</span>
        </div>
        <MenuItems handleOpenOverview={handleOpenOverview} />
        {Number(user?.id) === Number(storeId) ? (
          <button onClick={() => navigate('/menus/new')}>
            <img className="menu-create-icon" src={createIcon} alt="create" />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MenuList;
