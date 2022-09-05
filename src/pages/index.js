import { useState } from "react";

import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";

import { dummyArr } from "../data/dummy";

const MenuManagePage = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menu, setMenu] = useState(dummyArr);

  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setSelectedMenu(item);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedMenu(null);
  };

  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <MenuList
          menuItems={menu}
          handleOpenDetail={handleOpenDetail}
          selectedMenu={selectedMenu}
        />
        {openDetail && (
          <MenuDetail
            handleCloseDetail={handleCloseDetail}
            menuItems={menu}
            selectedMenu={selectedMenu}
          />
        )}
      </div>
    </>
  );
};

export default MenuManagePage;
