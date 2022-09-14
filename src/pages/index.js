import { useEffect, useState } from "react";

import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";
import ModalCreateMenu from "../components/modal-create-menu";
import ModalUpdateMenu from "../components/modal-update-menu";
import ModalDeleteMenu from "../components/modal-delete-menu";

import { checkValidName } from "../utils/name";
import {
  checkValidPrice,
  numberToStringNumber,
  stringNumberToNumber,
} from "../utils/price";

import { dummyArr } from "../data/dummy";

const MenuManagePage = () => {
  const [menuList, setMenuList] = useState(dummyArr);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [searchedMenuList, setSearchedMenuList] = useState(dummyArr);

  const [toggleModal, setToggleModal] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const [modalAnimation, setModalAnimation] = useState({
    create: false,
    update: false,
    delete: false,
  });

  const [menu, setMenu] = useState({
    id: selectedMenu ? selectedMenu.id : dummyArr.length + 1,
    name: "",
    price: "",
    image: "",
  });
  const [newMenu, setNewMenu] = useState({
    id: dummyArr.length + 1,
    name: "",
    price: "",
    image: "",
  });

  // 1️⃣ 상세보기 open, close 이벤트 핸들러 함수
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setSelectedMenu(item);
    setMenu({
      id: item.id,
      name: item.name,
      price: numberToStringNumber(item.price),
      image: item.image,
    });
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedMenu(null);
  };

  // 2️⃣ 검색어 변화 감지 이벤트 핸들러 함수
  const handleChangeKeyword = (e) => {
    e.preventDefault();
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

    const newToggleModal = {
      ...toggleModal,
      create: !toggleModal.create,
    };
    if (toggleModal.create) {
      setTimeout(() => {
        setToggleModal(newToggleModal);
      }, 300);
    } else {
      setToggleModal(newToggleModal);
      setNewMenu({
        ...newMenu,
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

    const newToggleModal = {
      ...toggleModal,
      update: !toggleModal.update,
    };
    if (!toggleModal.update && selectedMenu) {
      setToggleModal(newToggleModal);
      setMenu({
        id: selectedMenu.id,
        name: selectedMenu.name,
        price: numberToStringNumber(selectedMenu.price),
        image: selectedMenu.image,
      });
    } else if (toggleModal.update) {
      setTimeout(() => {
        setToggleModal(newToggleModal);
      }, 300);
    }
  };
  const handleToggleDeleteModal = () => {
    setModalAnimation({
      ...modalAnimation,
      delete: !modalAnimation.delete,
    });

    const newToggleModal = {
      ...toggleModal,
      delete: !toggleModal.delete,
    };
    if (toggleModal.delete) {
      setTimeout(() => {
        setToggleModal(newToggleModal);
      }, 300);
    } else {
      setToggleModal(newToggleModal);
    }
  };

  // 5️⃣ 메뉴 입력 텍스트 감지 이벤트 핸들러 함수
  const handleChangeNewMenuName = (e) => {
    e.preventDefault();
    setNewMenu({
      ...newMenu,
      name: e.target.value,
    });
  };
  const handleChangeNewMenuPrice = (e) => {
    e.preventDefault();
    setNewMenu({
      ...newMenu,
      price: numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      ),
    });
  };
  const handleChangeNewMenuImage = (e) => {
    e.preventDefault();
    setNewMenu({
      ...newMenu,
      image: e.target.value,
    });
  };
  const handleChangeMenuName = (e) => {
    e.preventDefault();
    setMenu({
      ...menu,
      name: e.target.value,
    });
  };
  const handleChangeMenuPrice = (e) => {
    e.preventDefault();
    setMenu({
      ...menu,
      price: numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      ),
    });
  };
  const handleChangeMenuImage = (e) => {
    e.preventDefault();
    setMenu({
      ...menu,
      image: e.target.value,
    });
  };

  // 6️⃣ 메뉴 생성, 수정, 삭제 등록 이벤트 핸들러 함수
  const handleCreateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      newMenu.name,
      menuList,
      newMenu.id
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      newMenu.price
    );

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const newMenuList = [...menuList, newMenu];
    setMenuList(newMenuList);
    setSearchedMenuList(newMenuList);

    handleToggleCreateModal();
    handleOpenDetail(newMenu);

    setNewMenu({
      id: newMenu.id + 1,
      name: "",
      price: "",
      image: "",
    });
  };
  const handleUpdateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      menu.name,
      menuList,
      selectedMenu.id
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      menu.price
    );

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const updatedMenuList = menuList.map((item) =>
      selectedMenu.id === item.id ? menu : item
    );
    setMenuList(updatedMenuList);
    setSearchedMenuList(updatedMenuList);

    handleToggleUpdateModal();
    handleOpenDetail(menu);
  };
  const handleDeleteMenu = () => {
    const newMenuList = menuList.filter((menu) => menu.id !== selectedMenu.id);
    setMenuList(newMenuList);
    setSearchedMenuList(newMenuList);

    handleCloseDetail();
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
          <MenuDetail
            selectedMenu={selectedMenu}
            handleCloseDetail={handleCloseDetail}
            handleToggleUpdateModal={handleToggleUpdateModal}
            handleToggleDeleteModal={handleToggleDeleteModal}
          />
        )}
      </div>

      {toggleModal.create && (
        <ModalCreateMenu
          newMenu={newMenu}
          handleCreateMenu={handleCreateMenu}
          createModalToggle={modalAnimation.create}
          handleToggleCreateModal={handleToggleCreateModal}
          handleChangeNewMenuName={handleChangeNewMenuName}
          handleChangeNewMenuPrice={handleChangeNewMenuPrice}
          handleChangeNewMenuImage={handleChangeNewMenuImage}
        />
      )}
      {toggleModal.update && (
        <ModalUpdateMenu
          menu={menu}
          handleUpdateMenu={handleUpdateMenu}
          updateModalToggle={modalAnimation.update}
          handleChangeMenuName={handleChangeMenuName}
          handleChangeMenuPrice={handleChangeMenuPrice}
          handleChangeMenuImage={handleChangeMenuImage}
          handleToggleUpdateModal={handleToggleUpdateModal}
        />
      )}
      {toggleModal.delete && (
        <ModalDeleteMenu
          handleDeleteMenu={handleDeleteMenu}
          deleteModalToggle={modalAnimation.delete}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </>
  );
};

export default MenuManagePage;
