import { ContentWrapper } from './menus-new-page.styled';

import ErrorPage from '../error-page';
import Gnb from '../../components/gnb';
import MenuNew from '../../components/menu-new';

import { useSessionContext } from '../../context/SessionContext';

const MenusNewPage: React.FC = () => {
  const { accessToken } = useSessionContext()!;

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
