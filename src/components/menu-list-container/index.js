import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MenuList from '../menu-list';
import MenuOverview from '../menu-overview';

import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from '../../context/MenuDataContext';

import { requestMenus } from '../../api/menus';

function MenuListContainer() {
  const { storeId } = useParams();

  const [keyword, setKeyword] = useState('');
  const [openDetail, setOpenDetail] = useState(false);

  const { selectedMenu } = useMenuDataContext();
  const { dispatchMenus, dispatchSelectedMenu } = useMenuDataActionsContext();

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
  const searchMenu = useCallback((keyword) => {
    // 데이터 불러와서 menus에 dispatch
    console.log(keyword);
  }, []);

  // DESC: menus fetching
  useEffect(() => {
    (async () => {
      const res = await requestMenus(storeId);
      dispatchMenus(res.data);
    })();
  }, []);

  useEffect(() => {
    searchMenu(keyword);
  }, [keyword, searchMenu]);

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

export default MenuListContainer;
