import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

// import components
import MenuList from '../menu-list';
import MenuOverview from '../menu-overview';

// import contexts
import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from '../../context/MenuDataContext';

// import types and utils or API functions
import { MenuType } from '../../types/menus';
import { requestMenus, requestSearchedMenus } from '../../api/menus';

const MenuListContainer: React.FC = () => {
  const { storeId } = useParams();

  const [keyword, setKeyword] = useState('');
  const [openDetail, setOpenDetail] = useState(false);

  const { selectedMenu } = useMenuDataContext()!;
  const { dispatchMenus, dispatchSelectedMenu } = useMenuDataActionsContext()!;

  // DESC: 가게 페이지 Overview - open, close 이벤트 핸들러 함수
  const handleOpenOverview = useCallback(
    (item: MenuType) => {
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
  const handleChangeKeyword = _.throttle((e) => {
    setKeyword(e.target.value);
  }, 500);

  useEffect(() => {
    if (!keyword) {
      (async () => {
        const res = await requestMenus(storeId);
        dispatchMenus(res?.data);
      })();
    }
    (async () => {
      const res = await requestSearchedMenus(storeId, keyword);
      dispatchMenus(res?.data);
    })();
  }, [keyword]);

  // DESC: menus fetching
  useEffect(() => {
    (async () => {
      const res = await requestMenus(storeId);
      dispatchMenus(res.data);
    })();
  }, [storeId]);

  useEffect(() => {
    if (selectedMenu) setOpenDetail(true);
  }, [selectedMenu]);

  // DESC: 초기화
  useEffect(() => {
    setOpenDetail(false);
  }, [storeId]);

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
};

export default MenuListContainer;
