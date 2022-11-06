import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import './menus-new-page.css';

import Gnb from '../../components/gnb';
import MenuNew from '../../components/menu-new';

import { useSessionContext } from '../../context/SessionContext';

function MenusNewPage() {
  const { accessToken } = useSessionContext();

  useEffect(() => {
    if (!accessToken) {
      alert('접근할 수 없습니다.');
    }
  }, [accessToken]);

  return (
    <>
      {!accessToken ? (
        <Navigate to={-1} />
      ) : (
        <>
          <Gnb />
          <div className="menus-new-page-wrapper">
            <MenuNew />
          </div>
        </>
      )}
    </>
  );
}

export default MenusNewPage;
