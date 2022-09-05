import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";

import { menu } from "../data/dummy";

const MenuManagePage = () => {
  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <MenuList menuItems={menu} />
        <MenuDetail />
      </div>
    </>
  );
};

export default MenuManagePage;
