import "./menus-new-page.css";

import Gnb from "../../components/gnb";
import MenuNew from "../../components/menu-new";

const MenusNewPage = () => {
  return (
    <>
      <Gnb />
      <div className="menus-new-page-wrapper">
        <MenuNew />
      </div>
    </>
  );
};

export default MenusNewPage;
