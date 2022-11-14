import './home-page.css';

import Gnb from '../../components/gnb';
import StoreList from '../../components/store-list';

function HomePage() {
  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <StoreList />
      </div>
    </>
  );
}

export default HomePage;
