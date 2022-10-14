import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./menu-new.css";

import ButtonNormal from "../button-normal";

import {
  checkValidPrice,
  numberToStringNumber,
  stringNumberToNumber,
} from "../../utils/menu/price";
import { checkValidName } from "../../utils/menu/name";

import {
  useMenuDataContext,
  useMenuDataActionsContext,
} from "../../context/MenuDataContext";
import { useSessionContext } from "../../context/SessionContext";

const MenusNewPage = () => {
  const navigate = useNavigate();
  const { menus } = useMenuDataContext();
  const { isLoggedIn } = useSessionContext();
  const { dispatchMenus, dispatchSelectedMenu, dispatchSearchedMenus } =
    useMenuDataActionsContext();

  const [formData, setFormData] = useState({
    id: menus[menus.length - 1].id + 1,
    name: "",
    price: "",
    image: "",
    type: "",
    description: "",
  });

  const handleChangeFormData = useCallback(
    (e) => {
      const target = {
        name: e.target.name,
        value: e.target.value,
      };
      if (target.name === "price") {
        target.value = numberToStringNumber(
          stringNumberToNumber(e.target.value.replace(/[^0-9]/g, ""))
        );
      }
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    },
    [formData]
  );

  const handleSubmit = () => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      formData.name,
      menus,
      formData.id
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      formData.price
    );

    if (!isValidName) {
      alert(nameAnnouncement);
      return;
    } else if (!isValidPrice) {
      alert(priceAnnouncement);
      return;
    }

    const newmenus = [...menus, formData];
    dispatchMenus(newmenus);
    dispatchSelectedMenu(formData);
    dispatchSearchedMenus(newmenus);
    navigate(`/menus/${formData.id}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      alert("접근할 수 없습니다.");
      return;
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={-1} />
      ) : (
        <>
          <div className="menu-new-wrapper">
            <h1 className="menu-new-header">새 메뉴 추가</h1>
            <div className="menu-field-wrapper">
              <label className="menu-field-label">이름</label>
              <input
                className="menu-field-input"
                name="name"
                value={formData.name}
                placeholder={"맛있는 와플"}
                onChange={handleChangeFormData}
              />
            </div>
            <div className="menu-field-wrapper">
              <label className="menu-field-label">종류</label>
              <select
                required
                className="menu-field-input"
                name="type"
                value={formData.type}
                onChange={handleChangeFormData}
                placeholder={"상품의 종류를 선택하세요"}
              >
                <option value="" disabled hidden>
                  상품의 종류를 선택하세요
                </option>
                <option value={"waffle"}>와플</option>
                <option value={"beverage"}>음료</option>
                <option value={"coffee"}>커피</option>
              </select>
            </div>
            <div className="menu-field-wrapper">
              <label className="menu-field-label">가격</label>
              <input
                className="menu-field-input"
                name="price"
                placeholder={"5,000"}
                value={formData.price}
                onChange={handleChangeFormData}
              />
              <span className="menu-field-input-unit">원</span>
            </div>
            <div className="menu-field-wrapper">
              <label className="menu-field-label">상품 이미지</label>
              <input
                className="menu-field-input"
                name="image"
                placeholder={"이미지 주소를 입력해주세요"}
                value={formData.image}
                onChange={handleChangeFormData}
              />
            </div>
            <div className="menu-field-wrapper">
              <label className="menu-field-label">설명</label>
              <textarea
                className="menu-field-textarea"
                name="description"
                value={formData.description}
                onChange={handleChangeFormData}
                placeholder={"상품에 대한 자세한 설명을 입력해주세요"}
              />
            </div>
          </div>

          <div className="menu-new-button-wrapper">
            <ButtonNormal
              text={"추가"}
              bgColor={"#D3FFC3"}
              handleClick={handleSubmit}
            />
            <ButtonNormal
              text={"취소"}
              handleClick={() => navigate("/stores/1")}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MenusNewPage;
