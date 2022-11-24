import { Wrapper } from './home-page.styled';

import Gnb from '../../components/gnb';
import StoreList from '../../components/store-list';

const HomePage: React.FC = () => {
  return (
    <>
      <Gnb />
      <Wrapper>
        <StoreList />
      </Wrapper>
    </>
  );
};

export default HomePage;
