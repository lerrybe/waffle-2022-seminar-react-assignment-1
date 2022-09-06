import { useEffect, useState } from "react";

import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";
import ModalWrapper from "../components/modal-wrapper";
import FormItem from "../components/form-item";
import ButtonNormal from "../components/button-normal";

import { dummyArr } from "../data/dummy";

const MenuManagePage = () => {
  const [nextId, setNextId] = useState(dummyArr.length + 1);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuList, setMenuList] = useState(dummyArr);

  const [searchedMenuList, setSearchedMenuList] = useState(dummyArr);
  const [keyword, setKeyword] = useState("");

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
  };

  const handleToggleUpdateModal = () => {
    setUpdateModalToggle((prev) => !prev);
  };

  const handleToggleDeleteModal = () => {
    setDeleteModalToggle((prev) => !prev);
  };

  // 메뉴 생성, 수정, 삭제 이벤트 핸들러 함수
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

    handleToggleDeleteModal();
    handleCloseDetail();
  };

  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <MenuList
          menuItems={searchedMenuList}
          handleOpenDetail={handleOpenDetail}
          keyword={keyword}
          handleChangeKeyword={handleChangeKeyword}
          handleToggleCreateModal={handleToggleCreateModal}
          selectedMenu={selectedMenu}
        />
        {openDetail && (
          <MenuDetail
            handleCloseDetail={handleCloseDetail}
            handleToggleUpdateModal={handleToggleUpdateModal}
            handleToggleDeleteModal={handleToggleDeleteModal}
            selectedMenu={selectedMenu}
          />
        )}
      </div>
      {createModalToggle && (
        <ModalWrapper>
          <span className="modal-title">메뉴 추가</span>
          <FormItem
            label={"이름"}
            placeholder={"맛있는와플"}
            content={newMenuName}
            handleChangeContent={(e) => setNewMenuName(e.target.value)}
          />
          <FormItem
            label={"가격"}
            placeholder={"5,000"}
            content={newMenuPrice}
            handleChangeContent={(e) => setNewMenuPrice(e.target.value)}
          />
          <FormItem
            label={"상품 이미지"}
            placeholder={"https://foo.bar/baz.png"}
            content={newMenuImage}
            handleChangeContent={(e) => setNewMenuImage(e.target.value)}
          />
          <div className="button-wrapper">
            <ButtonNormal
              text={"추가"}
              handleClick={handleCreateMenu}
              bgColor={"#D3FFC3"}
            />
            <ButtonNormal text={"취소"} handleClick={handleToggleCreateModal} />
          </div>
        </ModalWrapper>
      )}
      {updateModalToggle && (
        <ModalWrapper>
          <span className="modal-title">메뉴 수정</span>
          <FormItem
            label={"이름"}
            placeholder={"맛있는와플"}
            content={menuName}
            handleChangeContent={(e) => setMenuName(e.target.value)}
          />
          <FormItem
            label={"가격"}
            placeholder={"5,000"}
            content={menuPrice}
            handleChangeContent={(e) => setMenuPrice(e.target.value)}
          />
          <FormItem
            label={"상품 이미지"}
            placeholder={"https://foo.bar/baz.png"}
            content={menuImage}
            handleChangeContent={(e) => setMenuImage(e.target.value)}
          />
          <div className="button-wrapper">
            <ButtonNormal
              text={"저장"}
              handleClick={handleUpdateMenu}
              bgColor={"#D3FFC3"}
            />
            <ButtonNormal text={"취소"} handleClick={handleToggleUpdateModal} />
          </div>
        </ModalWrapper>
      )}
      {deleteModalToggle && (
        <ModalWrapper>
          <span className="modal-title">메뉴 삭제</span>
          <span className="modal-announcement">
            {"정말로 삭제하시겠습니까?"}
          </span>
          <div className="button-wrapper">
            <ButtonNormal
              text={"삭제"}
              handleClick={handleDeleteMenu}
              bgColor={"#FFCFCF"}
            />
            <ButtonNormal text={"취소"} handleClick={handleToggleDeleteModal} />
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default MenuManagePage;
