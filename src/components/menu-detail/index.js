import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./menu-detail.css";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import arrowBackIcon from "../../assets/arrow-back-icon.svg";

import ModalDeleteMenu from "../modal-delete-menu";

import { convertTypeEnToKo } from "../../utils/menu/type";
import { toStringNumberWithComma } from "../../utils/menu/price";

import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from "../../context/MenuDataContext";
import { useSessionContext } from "../../context/SessionContext";

const MenuDetail = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSessionContext();
  const { menus, selectedMenu: menu } = useMenuDataContext();
  const { dispatchMenus, dispatchSelectedMenu, dispatchSearchedMenus } =
    useMenuDataActionsContext();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  const handleToggleDeleteModal = useCallback(() => {
    setModalAnimation((prev) => !prev);

    if (modalAnimation) {
      // DESC: 모달 unmount시 애니메이션 적용을 위해 0.3초 delay 후 unmount
      setTimeout(() => {
        setIsModalOpened((prev) => !prev);
      }, 300);
    } else {
      setIsModalOpened((prev) => !prev);
    }
  }, [modalAnimation]);

  const handleDeleteMenu = useCallback(() => {
    const newMenus = menus.filter((targetMenu) => targetMenu.id !== menu.id);
    dispatchMenus(newMenus);
    dispatchSelectedMenu(null);
    dispatchSearchedMenus(newMenus);

    // DESC: 모달 닫고 /stores/1로 리다이렉트
    handleToggleDeleteModal();
    navigate("/stores/1");
  }, [
    dispatchMenus,
    dispatchSearchedMenus,
    dispatchSelectedMenu,
    handleToggleDeleteModal,
    menu?.id,
    menus,
    navigate,
  ]);

  return (
    <div className="menu-info-outer-wrapper">
      <div className="go-back-stores-wrapper">
        <button
          className="go-back-stores-button"
          onClick={() => navigate("/stores/1")}
        >
          <img alt="goback" src={arrowBackIcon} />
          메뉴 목록
        </button>
      </div>
      <div className="menu-info-wrapper">
        {menu?.image ? (
          <img
            className="detail-img"
            alt="대표 이미지가 없습니다."
            src={menu.image}
          />
        ) : (
          <div className="detail-img">대표 이미지가 없습니다.</div>
        )}
        {menu && (
          <>
            <span className="detail-name">{menu?.name}</span>
            <span className="detail-type">{convertTypeEnToKo(menu?.type)}</span>
            <span className="detail-price">
              {toStringNumberWithComma(menu?.price)}원
            </span>
            <span className="detail-description">{menu?.description}</span>
          </>
        )}

        {isLoggedIn && (
          <div className="interaction-wrapper">
            <button
              className="icon-wrapper"
              onClick={() => navigate(`/menus/${menu?.id}/edit`)}
            >
              <img alt="update" src={updateIcon} />
            </button>
            <button className="icon-wrapper" onClick={handleToggleDeleteModal}>
              <img alt="delete" src={deleteIcon} />
            </button>
          </div>
        )}

        {isModalOpened && (
          <ModalDeleteMenu
            deleteModalToggle={modalAnimation}
            handleDeleteMenu={handleDeleteMenu}
            handleToggleDeleteModal={handleToggleDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default MenuDetail;
