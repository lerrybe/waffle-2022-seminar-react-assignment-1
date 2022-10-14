import "./home-page.css";

import Gnb from "../../components/gnb";
import ShopList from "../../components/shop-list";

const HomePage = () => {
  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <ShopList />
      </div>
    </>
  );
};

export default HomePage;
