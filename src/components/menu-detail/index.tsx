import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import styles
import {
  Img,
  MenuName,
  MenuType,
  MenuPrice,
  IconButton,
  CRUDWrapper,
  GoBackButton,
  OuterWrapper,
  GoBackWrapper,
  NonThumnailImg,
  MenuDescription,
  MenuInfoWrapper,
} from './menu-detail.styled';
import updateIcon from '../../assets/update-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import arrowBackIcon from '../../assets/arrow-back-icon.svg';

// import components
import ModalDelete from '../modal-delete';

// import utils and API functions
import { loadObjItem } from '../../services/storage';
import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';
import { requestDeleteMenu, requestMenu } from '../../api/menus';

// import contexts
import { useSessionContext } from '../../context/SessionContext';
import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from '../../context/MenuDataContext';

const MenuDetail: React.FC = () => {
  const user = loadObjItem('user');
  const { owner } = loadObjItem('owner');

  const { menuId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSessionContext()!;
  const { menus, selectedMenu } = useMenuDataContext()!;
  const { dispatchSelectedMenu } = useMenuDataActionsContext()!;

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
    dispatchSelectedMenu,
    handleToggleDeleteModal,
    selectedMenu?.id,
    menus,
    navigate,
  ]);

  return (
    <OuterWrapper>
      <GoBackWrapper>
        <GoBackButton onClick={() => navigate(-1)}>
          <img alt="goback" src={arrowBackIcon} />
          메뉴 목록
        </GoBackButton>
      </GoBackWrapper>

      <MenuInfoWrapper>
        {selectedMenu?.image ? (
          <Img alt="대표 이미지가 없습니다." src={selectedMenu.image} />
        ) : (
          <NonThumnailImg>대표 이미지가 없습니다.</NonThumnailImg>
        )}
        {selectedMenu && (
          <>
            <MenuName>{selectedMenu?.name}</MenuName>
            <MenuType>{convertTypeEnToKo(selectedMenu?.type)}</MenuType>
            <MenuPrice>
              {toStringNumberWithComma(String(selectedMenu?.price))}원
            </MenuPrice>
            <MenuDescription>{selectedMenu?.description}</MenuDescription>
          </>
        )}

        {Number(user?.id) === Number(owner?.id) ? (
          <CRUDWrapper>
            <IconButton
              onClick={() => navigate(`/menus/${selectedMenu?.id}/edit`)}
            >
              <img alt="update" src={updateIcon} />
            </IconButton>
            <IconButton onClick={handleToggleDeleteModal}>
              <img alt="delete" src={deleteIcon} />
            </IconButton>
          </CRUDWrapper>
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
      </MenuInfoWrapper>
    </OuterWrapper>
  );
};

export default MenuDetail;
