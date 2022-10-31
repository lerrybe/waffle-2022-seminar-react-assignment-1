import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import "./menus-detail-page.css";

import Gnb from "../../components/gnb";
import MenuDetail from "../../components/menu-detail";
import MenuReview from "../../components/menu-review";

import { isValidMenuParams } from "../../utils/error";
import { useMenuDataContext } from "../../context/MenuDataContext";

const MenusDetailPage = () => {
  const { menuId } = useParams();
  const { menus } = useMenuDataContext();

  useEffect(() => {
    // DESC: menuId에 해당하는 메뉴가 존재하지 않는 경우
    if (!isValidMenuParams(menuId, menus)) {
      alert("유효하지 않은 메뉴 아이디입니다.");
      return;
    }
  }, [menuId, menus]);

  return (
    <>
      {!isValidMenuParams(menuId, menus) ? (
        <Navigate to={-1} />
      ) : (
        <>
          <Gnb />
          <div className="menu-detail-wrapper">
            <MenuDetail />
            <MenuReview />
          </div>
        </>
      )}
    </>
  );
};

export default MenusDetailPage;
