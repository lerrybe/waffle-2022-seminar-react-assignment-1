import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './menu-detail.css';
import updateIcon from '../../assets/update-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import arrowBackIcon from '../../assets/arrow-back-icon.svg';

import ModalDelete from '../modal-delete-menu';

import { loadObjItem } from '../../services/storage';
import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';
import { requestDeleteMenu, requestMenu } from '../../api/menus';

import { useSessionContext } from '../../context/SessionContext';
import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from '../../context/MenuDataContext';

function MenuDetail() {
  const user = loadObjItem('user');
  const { owner } = loadObjItem('owner');

  const { menuId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSessionContext();
  const { menus, selectedMenu } = useMenuDataContext();
  const { dispatchMenus, dispatchSelectedMenu } = useMenuDataActionsContext();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await requestMenu(menuId);
      if (res) {
        dispatchSelectedMenu(res);
      } else {
        navigate(-1);
      }
    })();
  }, []);

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
    (async () => {
      await requestDeleteMenu(menuId, accessToken);
    })();

    dispatchSelectedMenu(null);

    // DESC: 모달 닫고 이전 페이지로 리다이렉트
    handleToggleDeleteModal();
    navigate(-1);
  }, [
    dispatchMenus,
    dispatchSelectedMenu,
    handleToggleDeleteModal,
    selectedMenu?.id,
    menus,
    navigate,
  ]);

  return (
    <div className="menu-info-outer-wrapper">
      <div className="go-back-stores-wrapper">
        <button className="go-back-stores-button" onClick={() => navigate(-1)}>
          <img alt="goback" src={arrowBackIcon} />
          메뉴 목록
        </button>
      </div>
      <div className="menu-info-wrapper">
        {selectedMenu?.image ? (
          <img
            className="detail-img"
            alt="대표 이미지가 없습니다."
            src={selectedMenu.image}
          />
        ) : (
          <div className="detail-img">대표 이미지가 없습니다.</div>
        )}
        {selectedMenu && (
          <>
            <span className="detail-name">{selectedMenu?.name}</span>
            <span className="detail-type">
              {convertTypeEnToKo(selectedMenu?.type)}
            </span>
            <span className="detail-price">
              {toStringNumberWithComma(selectedMenu?.price)}원
            </span>
            <span className="detail-description">
              {selectedMenu?.description}
            </span>
          </>
        )}

        {Number(user?.id) === Number(owner?.id) ? (
          <div className="interaction-wrapper">
            <button
              className="icon-wrapper"
              onClick={() => navigate(`/menus/${selectedMenu?.id}/edit`)}
            >
              <img alt="update" src={updateIcon} />
            </button>
            <button className="icon-wrapper" onClick={handleToggleDeleteModal}>
              <img alt="delete" src={deleteIcon} />
            </button>
          </div>
        ) : (
          <></>
        )}

        {isModalOpened && (
          <ModalDelete
            title="메뉴 삭제"
            deleteModalToggle={modalAnimation}
            handleDelete={handleDeleteMenu}
            handleToggleDeleteModal={handleToggleDeleteModal}
          />
        )}
      </div>
    </div>
  );
}

export default MenuDetail;
