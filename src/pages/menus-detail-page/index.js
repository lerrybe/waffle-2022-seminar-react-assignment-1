import "./menus-detail-page.css";

import Gnb from "../../components/gnb";
import MenuDetail from "../../components/menu-detail";
import MenuReview from "../../components/menu-review";

const MenusDetailPage = () => {
  return (
    <>
      <Gnb />
      <div className="menu-detail-wrapper">
        <MenuDetail />
        <MenuReview />
      </div>
    </>
  );
};

export default MenusDetailPage;
