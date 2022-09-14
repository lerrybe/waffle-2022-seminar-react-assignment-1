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
  const [nextId, setNextId] = useState(dummyArr.length + 1);

  const [keyword, setKeyword] = useState("");
  const [searchedMenuList, setSearchedMenuList] = useState(dummyArr);

  const [toggleModal, setToggleModal] = useState({
    create: false,
    update: false,
    delete: false,
  });

  const [createModalAnimation, setCreateModalAnimation] = useState(false);
  const [updateModalAnimation, setUpdateModalAnimation] = useState(false);
  const [deleteModalAnimation, setDeleteModalAnimation] = useState(false);

  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuImage, setMenuImage] = useState("");

  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");
  const [newMenuImage, setNewMenuImage] = useState("");

  // 상세보기 open, close 이벤트 핸들러 함수
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setSelectedMenu(item);
    setMenuName(item.name);
    setMenuPrice(numberToStringNumber(item.price));
    setMenuImage(item.image);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedMenu(null);
  };

  // 검색어 변화 감지 이벤트 핸들러 함수
  const handleChangeKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  // 키워드로 메뉴 찾는 함수
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

  // 모달 열고 닫는 이벤트 핸들러 함수
  const handleToggleCreateModal = () => {
    setCreateModalAnimation((prev) => !prev);
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
      setNewMenuName("");
      setNewMenuPrice("");
      setNewMenuImage("");
    }
  };

  const handleToggleUpdateModal = () => {
    const newToggleModal = {
      ...toggleModal,
      update: !toggleModal.update,
    };
    setUpdateModalAnimation((prev) => !prev);
    if (!toggleModal.update && selectedMenu) {
      setToggleModal(newToggleModal);
      setMenuName(selectedMenu.name);
      setMenuPrice(numberToStringNumber(selectedMenu.price));
      setMenuImage(selectedMenu.image);
    } else if (toggleModal.update) {
      setTimeout(() => {
        setToggleModal(newToggleModal);
      }, 300);
    }
  };

  const handleToggleDeleteModal = () => {
    setDeleteModalAnimation((prev) => !prev);
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

  // 메뉴 입력 텍스트 감지 이벤트 핸들러 함수
  const handleChangeNewMenuName = (e) => {
    e.preventDefault();
    setNewMenuName(e.target.value);
  };

  const handleChangeNewMenuPrice = (e) => {
    e.preventDefault();
    setNewMenuPrice(
      numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      )
    );
  };

  const handleChangeNewMenuImage = (e) => {
    e.preventDefault();
    setNewMenuImage(e.target.value);
  };

  const handleChangeMenuName = (e) => {
    e.preventDefault();
    setMenuName(e.target.value);
  };

  const handleChangeMenuPrice = (e) => {
    e.preventDefault();
    setMenuPrice(
      numberToStringNumber(
        stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
      )
    );
  };

  const handleChangeMenuImage = (e) => {
    e.preventDefault();
    setMenuImage(e.target.value);
  };

  // 메뉴 생성, 수정, 삭제 등록 이벤트 핸들러 함수
  const handleCreateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      newMenuName,
      menuList,
      nextId
    );
    const { isValidPrice, announcement: priceAnnouncement } =
      checkValidPrice(newMenuPrice);

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const newMenu = {
      id: nextId,
      name: newMenuName,
      price: newMenuPrice,
      image: newMenuImage,
    };
    const newMenuList = [...menuList, newMenu];

    setNextId(nextId + 1);
    setMenuList(newMenuList);
    setSearchedMenuList(newMenuList);

    handleToggleCreateModal();
    handleOpenDetail(newMenu);

    setNewMenuName("");
    setNewMenuPrice("");
    setNewMenuImage("");
  };

  const handleUpdateMenu = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      menuName,
      menuList,
      selectedMenu.id
    );
    const { isValidPrice, announcement: priceAnnouncement } =
      checkValidPrice(menuPrice);

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const updatedMenu = {
      id: selectedMenu.id,
      name: menuName,
      price: menuPrice,
      image: menuImage,
    };

    const updatedMenuList = menuList.map((item) =>
      selectedMenu.id === item.id ? updatedMenu : item
    );
    setMenuList(updatedMenuList);
    setSearchedMenuList(updatedMenuList);

    handleToggleUpdateModal();
    handleOpenDetail(updatedMenu);
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
          newMenuName={newMenuName}
          newMenuPrice={newMenuPrice}
          newMenuImage={newMenuImage}
          handleCreateMenu={handleCreateMenu}
          createModalToggle={createModalAnimation}
          handleToggleCreateModal={handleToggleCreateModal}
          handleChangeNewMenuName={handleChangeNewMenuName}
          handleChangeNewMenuPrice={handleChangeNewMenuPrice}
          handleChangeNewMenuImage={handleChangeNewMenuImage}
        />
      )}
      {toggleModal.update && (
        <ModalUpdateMenu
          menuName={menuName}
          menuPrice={menuPrice}
          menuImage={menuImage}
          handleUpdateMenu={handleUpdateMenu}
          updateModalToggle={updateModalAnimation}
          handleChangeMenuName={handleChangeMenuName}
          handleChangeMenuPrice={handleChangeMenuPrice}
          handleChangeMenuImage={handleChangeMenuImage}
          handleToggleUpdateModal={handleToggleUpdateModal}
        />
      )}
      {toggleModal.delete && (
        <ModalDeleteMenu
          handleDeleteMenu={handleDeleteMenu}
          deleteModalToggle={deleteModalAnimation}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </>
  );
};

export default MenuManagePage;
