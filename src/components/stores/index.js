import { useCallback, useEffect, useState } from 'react';

import MenuList from '../menu-list';
import MenuOverview from '../menu-overview';

import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from '../../context/MenuDataContext';

function Stores() {
  const [keyword, setKeyword] = useState('');
  const [openDetail, setOpenDetail] = useState(false);

  const { menus, selectedMenu } = useMenuDataContext();
  const { dispatchSelectedMenu, dispatchSearchedMenus } = useMenuDataActionsContext();

  // DESC: 가게 페이지 Overview - open, close 이벤트 핸들러 함수
  const handleOpenOverview = useCallback(
    (item) => {
      setOpenDetail(true);
      dispatchSelectedMenu(item);
    },
    [dispatchSelectedMenu],
  );

  const handleCloseOverview = useCallback(() => {
    setOpenDetail(false);
    dispatchSelectedMenu(null);
  }, [dispatchSelectedMenu]);

  // DESC: 검색어 변화 감지 이벤트 핸들러 함수
  const handleChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  // DESC: 키워드로 메뉴 찾는 함수
  const searchMenu = useCallback(
    (keyword, menus) => {
      if (keyword === '') {
        dispatchSearchedMenus(menus);
      } else {
        dispatchSearchedMenus(
          menus.filter((item) => item.name.includes(keyword)),
        );
      }
    },
    [dispatchSearchedMenus],
  );

  useEffect(() => {
    searchMenu(keyword, menus);
  }, [keyword, menus, searchMenu]);

  useEffect(() => {
    if (selectedMenu) setOpenDetail(true);
  }, [selectedMenu]);

  return (
    <>
      <MenuList
        keyword={keyword}
        handleOpenOverview={handleOpenOverview}
        handleChangeKeyword={handleChangeKeyword}
      />
      {openDetail && <MenuOverview handleCloseOverview={handleCloseOverview} />}
    </>
  );
}

export default Stores;
