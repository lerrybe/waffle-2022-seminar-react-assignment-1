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
import { Owner } from '../../types/auth';
import { MenuType } from '../../types/menus';

// import util functions
import { loadObjItem } from '../../services/storage';

// import contexts
import { useSessionContext } from '../../context/SessionContext';

interface MenuList {
  searchMenuList: (keyword: string | null) => void;
  handleOpenOverview: (item: MenuType) => void;
}

const MenuList: React.FC<MenuList> = ({
  searchMenuList,
  handleOpenOverview,
}: MenuList) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { accessToken } = useSessionContext()!;
  const user: Owner | null = loadObjItem('user');

  return (
    <Wrapper>
      <SearchBar label="메뉴 이름 검색: " search={searchMenuList} />
      <ContentWrapper>
        <CategoryWrapper>
          <CategoryID>ID</CategoryID>
          <CategoryName>이름</CategoryName>
          <CategoryType>종류</CategoryType>
          <CategoryPrice>가격</CategoryPrice>
          <CategoryRating>평점</CategoryRating>
        </CategoryWrapper>
        <MenuItems handleOpenOverview={handleOpenOverview} />
        {Number(user?.id) === Number(storeId) && accessToken ? (
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
