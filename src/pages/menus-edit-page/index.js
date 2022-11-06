import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import './menus-edit-page.css';

import Gnb from '../../components/gnb';
import MenuEdit from '../../components/menu-edit';

import { isValidMenuParams } from '../../utils/error';
import { useSessionContext } from '../../context/SessionContext';
import { useMenuDataContext } from '../../context/MenuDataContext';

function MenusEditPage() {
  const { menuId } = useParams();
  const { menus } = useMenuDataContext();
  const { accessToken } = useSessionContext();

  useEffect(() => {
    if (!isValidMenuParams(menuId, menus)) {
      alert('유효하지 않은 메뉴 아이디입니다.');
    } else if (!accessToken) {
      alert('접근할 수 없습니다.');
    }
  }, [accessToken, menuId, menus]);

  return (
    <>
      {!accessToken || !isValidMenuParams(menuId, menus) ? (
        <Navigate to={-1} />
      ) : (
        <>
          <Gnb />
          <div className="menus-edit-page-wrapper">
            <MenuEdit />
          </div>
        </>
      )}
    </>
  );
}

export default MenusEditPage;
