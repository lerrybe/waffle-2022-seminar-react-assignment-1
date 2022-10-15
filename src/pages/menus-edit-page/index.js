import "./menus-edit-page.css";

import Gnb from "../../components/gnb";
import MenuEdit from "../../components/menu-edit";

const MenusEditPage = () => {
  return (
    <>
      <Gnb />
      <div className="menus-edit-page-wrapper">
        <MenuEdit />
      </div>
    </>
  );
};

export default MenusEditPage;
