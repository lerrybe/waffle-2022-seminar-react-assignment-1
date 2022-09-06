import { useEffect, useState } from "react";

import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";
import ModalCreateMenu from "../components/modal-create-menu";
import ModalUpdateMenu from "../components/modal-update-menu";
import ModalDeleteMenu from "../components/modal-delete-menu";

import { dummyArr } from "../data/dummy";

const MenuManagePage = () => {
  const [menuList, setMenuList] = useState(dummyArr);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [nextId, setNextId] = useState(dummyArr.length + 1);

  const [keyword, setKeyword] = useState("");
  const [searchedMenuList, setSearchedMenuList] = useState(dummyArr);

  const [createModalToggle, setCreateModalToggle] = useState(false);
  const [updateModalToggle, setUpdateModalToggle] = useState(false);
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);

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
    setMenuPrice(item.price);
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
    setCreateModalToggle((prev) => !prev);

    if (!createModalToggle) {
      setNewMenuName("");
      setNewMenuPrice("");
      setNewMenuImage("");
    }
  };

  const handleToggleUpdateModal = () => {
    setUpdateModalToggle((prev) => !prev);

    if (!updateModalToggle && selectedMenu) {
      setMenuName(selectedMenu.name);
      setMenuPrice(selectedMenu.price);
      setMenuImage(selectedMenu.image);
    }
  };

  const handleToggleDeleteModal = () => {
    setDeleteModalToggle((prev) => !prev);
  };

  // 메뉴 입력 텍스트 감지 이벤트 핸들러 함수
  const handleChangeNewMenuName = (e) => {
    e.preventDefault();
    setNewMenuName(e.target.value);
  };

  const handleChangeNewMenuPrice = (e) => {
    e.preventDefault();
    setNewMenuPrice(e.target.value);
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
    setMenuPrice(e.target.value);
  };

  const handleChangeMenuImage = (e) => {
    e.preventDefault();
    setMenuImage(e.target.value);
  };

  // 메뉴 생성, 수정, 삭제 등록 이벤트 핸들러 함수
  const handleCreateMenu = () => {
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
    const updatedMenu = {
      id: selectedMenu.id,
      name: menuName,
      price: menuPrice,
      image: menuImage,
    };

    const updatedMenuList = menuList.map((item) =>
      selectedMenu.name === item.name ? updatedMenu : item
    );
    setMenuList(updatedMenuList);
    setSearchedMenuList(updatedMenuList);

    handleToggleUpdateModal();
    handleOpenDetail(updatedMenu);
  };

  const handleDeleteMenu = () => {
    const newMenuList = menuList.filter(
      (menu) => menu.name !== selectedMenu.name
    );
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

      {createModalToggle && (
        <ModalCreateMenu
          newMenuName={newMenuName}
          newMenuPrice={newMenuPrice}
          newMenuImage={newMenuImage}
          handleCreateMenu={handleCreateMenu}
          handleToggleCreateModal={handleToggleCreateModal}
          handleChangeNewMenuName={handleChangeNewMenuName}
          handleChangeNewMenuPrice={handleChangeNewMenuPrice}
          handleChangeNewMenuImage={handleChangeNewMenuImage}
        />
      )}
      {updateModalToggle && (
        <ModalUpdateMenu
          menuName={menuName}
          menuPrice={menuPrice}
          menuImage={menuImage}
          handleUpdateMenu={handleUpdateMenu}
          handleChangeMenuName={handleChangeMenuName}
          handleChangeMenuPrice={handleChangeMenuPrice}
          handleChangeMenuImage={handleChangeMenuImage}
          handleToggleUpdateModal={handleToggleUpdateModal}
        />
      )}
      {deleteModalToggle && (
        <ModalDeleteMenu
          handleDeleteMenu={handleDeleteMenu}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </>
  );
};

export default MenuManagePage;
