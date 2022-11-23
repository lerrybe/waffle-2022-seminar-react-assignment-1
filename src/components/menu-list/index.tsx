import React, { useCallback, useState } from 'react';
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
  HeaderWrapper,
  FilterWrapper,
  CategoryFilter,
  RatingFilter,
  Categories,
  RatingAnnounce,
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

  const [type, setType] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);
  const [rating, setRating] = useState<number | null>(3);

  const checkHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isChecked) {
        setIsChecked(false);
        setRating(null);
      } else {
        setIsChecked(true);
        setRating(3);
      }
    },
    [isChecked],
  );

  const handleChangeType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value),
    [],
  );

  return (
    <Wrapper>
      <HeaderWrapper>
        <SearchBar
          label="메뉴 이름 검색: "
          search={searchMenuList}
          rating={rating}
        />
        <FilterWrapper>
          <CategoryFilter value={type} onChange={(e) => handleChangeType(e)}>
            <Categories value={undefined}>ALL</Categories>
            <Categories value="waffle">waffle</Categories>
            <Categories value="beverage">beverage</Categories>
            <Categories value="coffee">coffee</Categories>
            <Categories value="dessert">dessert</Categories>
          </CategoryFilter>
          <RatingAnnounce>별점 3점 이상</RatingAnnounce>
          <RatingFilter
            type="checkbox"
            checked={isChecked}
            onChange={(e) => checkHandler(e)}
          />
        </FilterWrapper>
      </HeaderWrapper>

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
