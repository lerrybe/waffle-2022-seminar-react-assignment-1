import { useNavigate } from "react-router-dom";

import "./menu-overview.css";

import closeIcon from "../../assets/close-icon.svg";

import ButtonNormal from "../button-normal";

import { convertTypeEnToKo } from "../../utils/menu/type";
import { numberToStringNumber } from "../../utils/menu/price";
import { useMenuDataContext } from "../../context/MenuDataContext";

const MenuOverview = ({ handleCloseOverview }) => {
  const navigate = useNavigate();
  const { selectedMenu } = useMenuDataContext();

  return (
    <div className="menu-overview-wrapper">
      <img
        className="close-icon"
        alt="close"
        src={closeIcon}
        onClick={handleCloseOverview}
      />
      <div className="menu-overview-content-wrapper">
        {selectedMenu?.image ? (
          <img
            className="overview-img"
            alt="대표 이미지가 없습니다."
            src={selectedMenu.image}
          />
        ) : (
          <div className="overview-img">대표 이미지가 없습니다.</div>
        )}
        {selectedMenu && (
          <>
            <span className="overview-name">{selectedMenu.name}</span>
            <span className="overview-type">
              {convertTypeEnToKo(selectedMenu.type)}
            </span>
            <span className="overview-price">
              {numberToStringNumber(selectedMenu.price)}원
            </span>
          </>
        )}

        <ButtonNormal
          text={"자세히"}
          handleClick={() => navigate(`/menus/${selectedMenu?.id}`)}
        />
      </div>
    </div>
  );
};

export default MenuOverview;