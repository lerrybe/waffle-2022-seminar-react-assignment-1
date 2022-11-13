import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ContentWrapper } from './menus-new-page.styled';

import ErrorPage from '../error-page';
import Gnb from '../../components/gnb';
import MenuNew from '../../components/menu-new';

import { useSessionContext } from '../../context/SessionContext';

const MenusNewPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useSessionContext()!;

  useEffect(() => {
    if (!accessToken) {
      toast.error('접근할 수 없습니다.');
      navigate(-1);
    }
  }, [accessToken]);

  return (
    <>
      {!accessToken ? (
        <ErrorPage />
      ) : (
        <>
          <Gnb />
          <ContentWrapper>
            <MenuNew />
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default MenusNewPage;
