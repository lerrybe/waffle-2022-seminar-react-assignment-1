import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ContentWrapper } from './menus-edit-page.styled';

import ErrorPage from '../error-page';
import Gnb from '../../components/gnb';
import MenuEdit from '../../components/menu-edit';

import { isValidMenuParams } from '../../utils/error';
import { useSessionContext } from '../../context/SessionContext';
import { useMenuDataContext } from '../../context/MenuDataContext';

const MenusEditPage: React.FC = () => {
  const { menuId } = useParams();
  const { menus } = useMenuDataContext()!;
  const { accessToken } = useSessionContext()!;

  useEffect(() => {
    // DESC: params로 뽑아온 id -> string / type casting
    if (!isValidMenuParams(Number(menuId), menus)) {
      toast.error('유효하지 않은 메뉴 아이디입니다.');
    } else if (!accessToken) {
      toast.error('접근할 수 없습니다.');
    }
  }, [accessToken, menuId, menus]);

  return (
    <>
      {!accessToken || !isValidMenuParams(Number(menuId), menus) ? (
        <ErrorPage />
      ) : (
        <>
          <Gnb />
          <ContentWrapper>
            <MenuEdit />
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default MenusEditPage;
