import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./menu-detail.css";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import arrowBackIcon from "../../assets/arrow-back-icon.svg";

import { convertTypeEnToKo } from "../../utils/menu/type";
import { numberToStringNumber } from "../../utils/menu/price";

import { useSessionContext } from "../../context/SessionContext";

const MenuDetail = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSessionContext();

  const [menu] = useState({
    id: 1,
    name: "초코와플",
    price: 7000,
    image: "",
    type: "waffle",
    description: "이 와플에는 슬픈 전설이 있습니다.",
  });

  return (
    <div className="menu-info-outer-wrapper">
      <div className="go-back-stores-wrapper">
        <button className="go-back-stores-button" onClick={() => navigate(-1)}>
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
            <span className="detail-name">{menu.name}</span>
            <span className="detail-type">{convertTypeEnToKo(menu.type)}</span>
            <span className="detail-price">
              {numberToStringNumber(menu.price)}원
            </span>
            <span className="detail-description">{menu.description}</span>
          </>
        )}

        {isLoggedIn && (
          <div className="interaction-wrapper">
            <button
              className="icon-wrapper"
              onClick={() => console.log("수정하기")}
            >
              <img alt="update" src={updateIcon} />
            </button>
            <button
              className="icon-wrapper"
              onClick={() => console.log("삭제하기")}
            >
              <img alt="delete" src={deleteIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetail;
