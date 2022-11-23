import { useParams } from 'react-router-dom';

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
