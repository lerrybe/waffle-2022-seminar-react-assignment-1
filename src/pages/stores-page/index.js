import { useEffect, useState } from "react";

import "./stores-page.css";

import Gnb from "../../components/gnb";
import MenuList from "../../components/menu-list";
import MenuOverview from "../../components/menu-overview";
import ModalCreateMenu from "../../components/modal-create-menu";
import ModalUpdateMenu from "../../components/modal-update-menu";
import ModalDeleteMenu from "../../components/modal-delete-menu";

import { checkValidName } from "../../utils/menu/name";
import {
  checkValidPrice,
  numberToStringNumber,
  stringNumberToNumber,
} from "../../utils/menu/price";

import { initialMenus } from "../../data/initialStates";

const StoresPage = () => {
  const [menuList, setMenuList] = useState(initialMenus);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [searchedMenuList, setSearchedMenuList] = useState(initialMenus);

  const [openedModal, setOpenedModal] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const [modalAnimation, setModalAnimation] = useState({
    create: false,
    update: false,
    delete: false,
  });

  const [menuToBeUpdated, setMenuToBeUpdated] = useState({
    id: selectedMenu ? selectedMenu.id : initialMenus.length + 1,
    name: "",
    price: "",
    image: "",
  });
  const [menuToBeCreated, setMenuToBeCreated] = useState({
    id: initialMenus.length + 1,
    name: "",
    price: "",
    image: "",
  });

  // 1️⃣ 상세보기 open, close 이벤트 핸들러 함수
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setSelectedMenu(item);
    setMenuToBeUpdated({
      id: item.id,
      name: item.name,
      price: numberToStringNumber(item.price),
      image: item.image,
    });
  };
  const handleCloseOverview = () => {
    setOpenDetail(false);
    setSelectedMenu(null);
  };

  // 2️⃣ 검색어 변화 감지 이벤트 핸들러 함수
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // 3️⃣ 키워드로 메뉴 찾는 함수
  const searchMenu = (keyword, menuList) => {
    if (keyword === "") {
      setSearchedMenuList(menuList);
    } else {
      setSearchedMenuList(
        menuList.filter((item) => item.name.includes(keyword))
      );
    }
  };
  useEffect(() => {
    searchMenu(keyword, menuList);
  }, [keyword, menuList]);

  // 4️⃣ 모달 열고 닫는 이벤트 핸들러 함수 (create, update, delete)
  const handleToggleCreateModal = () => {
    setModalAnimation({
      ...modalAnimation,
      create: !modalAnimation.create,
    });

    const newOpenedModal = {
      ...openedModal,
      create: !openedModal.create,
    };
    if (openedModal.create) {
      // 애니메이션 적용을 위해 0.3초 delay 후 unmount
      setTimeout(() => {
        setOpenedModal(newOpenedModal);
      }, 300);
    } else {
      setOpenedModal(newOpenedModal);
      setMenuToBeCreated({
        ...menuToBeCreated,
        name: "",
        price: "",
        image: "",
      });
    }
  };
  const handleToggleUpdateModal = () => {
    setModalAnimation({
      ...modalAnimation,
      update: !modalAnimation.update,
    });

    const newOpenedModal = {
      ...openedModal,
      update: !openedModal.update,
    };
    if (!openedModal.update && selectedMenu) {
      setOpenedModal(newOpenedModal);
      setMenuToBeUpdated({
        id: selectedMenu.id,
        name: selectedMenu.name,
        price: numberToStringNumber(selectedMenu.price),
        image: selectedMenu.image,
      });
    } else if (openedModal.update) {
      // 애니메이션 적용을 위해 0.3초 delay 후 unmount
      setTimeout(() => {
        setOpenedModal(newOpenedModal);
      }, 300);
    }
  };
  const handleToggleDeleteModal = () => {
    setModalAnimation({
      ...modalAnimation,
      delete: !modalAnimation.delete,
    });

    const newOpenedModal = {
      ...openedModal,
      delete: !openedModal.delete,
    };
    if (openedModal.delete) {
      // 애니메이션 적용을 위해 0.3초 delay 후 unmount
      setTimeout(() => {
        setOpenedModal(newOpenedModal);
      }, 300);
    } else {
      setOpenedModal(newOpenedModal);
    }
  };

  // 5️⃣ 메뉴 입력 텍스트 감지 이벤트 핸들러 함수
  const handleChangeNewMenuName = (e) => {
    setMenuToBeCreated({
      ...menuToBeCreated,
      name: e.target.value,
    });
  };
  const handleChangeNewMenuPrice = (e) => {
    setMenuToBeCreated({
      ...menuToBeCreated,
      price: numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      ),
    });
  };
  const handleChangeNewMenuImage = (e) => {
    setMenuToBeCreated({
      ...menuToBeCreated,
      image: e.target.value,
    });
  };
  const handleChangeMenuName = (e) => {
    setMenuToBeUpdated({
      ...menuToBeUpdated,
      name: e.target.value,
    });
  };
  const handleChangeMenuPrice = (e) => {
    setMenuToBeUpdated({
      ...menuToBeUpdated,
      price: numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      ),
    });
  };
  const handleChangeMenuImage = (e) => {
    setMenuToBeUpdated({
      ...menuToBeUpdated,
      image: e.target.value,
    });
  };

  // 6️⃣ 메뉴 생성, 수정, 삭제 등록 이벤트 핸들러 함수
  const handleCreateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      menuToBeCreated.name,
      menuList,
      menuToBeCreated.id
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      menuToBeCreated.price
    );

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const newMenuList = [...menuList, menuToBeCreated];
    setMenuList(newMenuList);
    setSearchedMenuList(newMenuList);

    handleToggleCreateModal();
    handleOpenDetail(menuToBeCreated);

    setMenuToBeCreated({
      id: menuToBeCreated.id + 1,
      name: "",
      price: "",
      image: "",
    });
  };
  const handleUpdateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      menuToBeUpdated.name,
      menuList,
      selectedMenu.id
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      menuToBeUpdated.price
    );

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const updatedMenuList = menuList.map((item) =>
      selectedMenu.id === item.id ? menuToBeUpdated : item
    );
    setMenuList(updatedMenuList);
    setSearchedMenuList(updatedMenuList);

    handleToggleUpdateModal();
    handleOpenDetail(menuToBeUpdated);
  };
  const handleDeleteMenu = () => {
    const newMenuList = menuList.filter((menu) => menu.id !== selectedMenu.id);
    setMenuList(newMenuList);
    setSearchedMenuList(newMenuList);

    handleCloseOverview();
    handleToggleDeleteModal();
  };

  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <MenuList
          keyword={keyword}
          selectedMenu={selectedMenu}
          menuItems={searchedMenuList}
          handleOpenDetail={handleOpenDetail}
          handleChangeKeyword={handleChangeKeyword}
          handleToggleCreateModal={handleToggleCreateModal}
        />
        {openDetail && (
          <MenuOverview
            selectedMenu={selectedMenu}
            handleCloseOverview={handleCloseOverview}
            handleToggleUpdateModal={handleToggleUpdateModal}
            handleToggleDeleteModal={handleToggleDeleteModal}
          />
        )}
      </div>

      {openedModal.create && (
        <ModalCreateMenu
          newMenu={menuToBeCreated}
          handleCreateMenu={handleCreateMenu}
          createModalToggle={modalAnimation.create}
          handleToggleCreateModal={handleToggleCreateModal}
          handleChangeNewMenuName={handleChangeNewMenuName}
          handleChangeNewMenuPrice={handleChangeNewMenuPrice}
          handleChangeNewMenuImage={handleChangeNewMenuImage}
        />
      )}
      {openedModal.update && (
        <ModalUpdateMenu
          menu={menuToBeUpdated}
          handleUpdateMenu={handleUpdateMenu}
          updateModalToggle={modalAnimation.update}
          handleChangeMenuName={handleChangeMenuName}
          handleChangeMenuPrice={handleChangeMenuPrice}
          handleChangeMenuImage={handleChangeMenuImage}
          handleToggleUpdateModal={handleToggleUpdateModal}
        />
      )}
      {openedModal.delete && (
        <ModalDeleteMenu
          handleDeleteMenu={handleDeleteMenu}
          deleteModalToggle={modalAnimation.delete}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </>
  );
};

export default StoresPage;
