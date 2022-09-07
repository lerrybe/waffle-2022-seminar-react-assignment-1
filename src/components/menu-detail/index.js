import "./menu-detail.css";

import closeIcon from "../../assets/close-icon.svg";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

import { numberToStringNumber } from "../../utils/price";

const MenuDetail = ({
  selectedMenu,
  handleCloseDetail,
  handleToggleUpdateModal,
  handleToggleDeleteModal,
}) => {
  return (
    <div className="menu-detail-wrapper">
      <img
        className="close-icon"
        alt="close"
        src={closeIcon}
        onClick={handleCloseDetail}
      />
      <div className="menu-detail-content-wrapper">
        {selectedMenu && selectedMenu.image ? (
          <img
            className="detail-img"
            alt="대표 이미지가 없습니다."
            src={selectedMenu.image}
          />
        ) : (
          <div className="detail-img">{"대표 이미지가 없습니다."}</div>
        )}
        {selectedMenu && (
          <>
            <span className="detail-name">{selectedMenu.name}</span>
            <span className="detail-price">
              {numberToStringNumber(selectedMenu.price)}원
            </span>
          </>
        )}

        <div className="method-wrapper">
          <img
            className="update-icon"
            alt="update"
            src={updateIcon}
            onClick={handleToggleUpdateModal}
          />
          <img
            className="delete-icon"
            alt="delete"
            src={deleteIcon}
            onClick={handleToggleDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
