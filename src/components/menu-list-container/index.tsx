import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { requestMenus } from '../../api/menus';

const MenuListContainer: React.FC = () => {
  const { storeId } = useParams();
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

  // DESC: 메뉴 검색 함수
  const searchMenuList = useCallback((keyword: string | null) => {
    if (keyword?.trim()) {
      (async () => {
        const res = await requestMenus(
          Number(storeId) === NaN ? null : Number(storeId),
          keyword,
        );
        dispatchMenus(res?.data);
      })();
    } else {
      (async () => {
        const res = await requestMenus(
          Number(storeId) === NaN ? null : Number(storeId),
        );
        dispatchMenus(res?.data);
      })();
    }
  }, []);

  // DESC: Initial menus fetching
  useEffect(() => {
    (async () => {
      const res = await requestMenus(
        Number(storeId) === NaN ? null : Number(storeId),
      );
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
        searchMenuList={searchMenuList}
        handleOpenOverview={handleOpenOverview}
      />
      {openDetail && <MenuOverview handleCloseOverview={handleCloseOverview} />}
    </>
  );
};

export default MenuListContainer;
