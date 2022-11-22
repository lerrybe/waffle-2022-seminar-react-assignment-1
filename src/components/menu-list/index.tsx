import { useNavigate, useParams } from 'react-router-dom';

// import styles and assets
import {
  Wrapper,
  CategoryID,
  CategoryName,
  CategoryType,
  CategoryPrice,
  CategoryRating,
  CategoryWrapper,
  ContentWrapper,
  CreateMenuIcon,
} from './menu-list.styled';
import createIcon from '../../assets/create-icon.svg';

// import components
import MenuItems from '../menu-items';
import SearchBar from '../search-bar';

// import types
import { MenuType } from '../../types/menus';

// import util functions
import { loadObjItem } from '../../services/storage';

interface MenuList {
  keyword: string;
  handleOpenOverview: (item: MenuType) => void;
  handleChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuList: React.FC<MenuList> = ({
  keyword,
  handleOpenOverview,
  handleChangeKeyword,
}: MenuList) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const user = loadObjItem('user');

  return (
    <Wrapper>
      <SearchBar
        keyword={keyword}
        label="메뉴 이름 검색: "
        handleChangeKeyword={handleChangeKeyword}
      />
      <ContentWrapper>
        <CategoryWrapper>
          <CategoryID>ID</CategoryID>
          <CategoryName>이름</CategoryName>
          <CategoryType>종류</CategoryType>
          <CategoryPrice>가격</CategoryPrice>
          <CategoryRating>평점</CategoryRating>
        </CategoryWrapper>
        <MenuItems handleOpenOverview={handleOpenOverview} />
        {Number(user?.id) === Number(storeId) ? (
          <button onClick={() => navigate('/menus/new')}>
            <CreateMenuIcon src={createIcon} alt="create" />
          </button>
        ) : (
          <></>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default MenuList;
